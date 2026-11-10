#!/usr/bin/env python3
"""Comprueba que perfil/ y web/ no llevan datos privados antes de publicarlos.

Adaptado de la comprobación de meta-harness/tools/publicar.py.

Uso:
  python3 -I tools/comprobar-privacidad.py [--versionados] [--lista RUTA] CARPETA [CARPETA …]

  --saltar-ausentes  una carpeta que no existe se salta (sin la opción, sale con código 2)
  --versionados   revisa solo los archivos que git versiona en cada carpeta (lo que sube un push);
                  sin la opción revisa todo menos .git/, node_modules/ y .astro/
  --lista RUTA    lista de textos prohibidos; por defecto, la variable PRIVACIDAD_LISTA (contenido)
                  o tools/privacidad.lista. Sin lista no se comprueba nada y sale con código 2.

Formato de la lista (privada, nunca en un repo público): un texto por línea, sin distinguir mayúsculas;
«#» empieza un comentario; las líneas que empiezan por «!» son textos permitidos (se quitan de cada línea
antes de buscar), por ejemplo el correo de contacto aprobado.

Qué se comprueba (sale con código 1 si hay hallazgos):
- los textos prohibidos de la lista (si empiezan o acaban en cifra, no cuentan pegados a otras cifras);
- direcciones de correo que no sean noreply, example o permitidas con «!»;
- rutas de carpetas personales (/home/<usuario>, /Users/<usuario>, C:\\Users\\<usuario>);
- enlaces simbólicos y archivos de más de 2 MB;
- el texto de los PDF (con pdftotext; si no está instalado, el PDF cuenta como hallazgo).
"""
import os
import pathlib
import re
import shutil
import subprocess
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
LISTA_POR_DEFECTO = RAIZ / "tools" / "privacidad.lista"
IGNORAR = {".git", "node_modules", ".astro"}
CORREO = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]*\w")
CORREOS_VALIDOS = re.compile(r"^noreply@|@example\.(com|org|net)$|@users\.noreply\.github\.com$")
# «paquete@1.2.3» no es un correo: versión de npm
VERSION = re.compile(r"@\d+(\.\d+)*$")
RUTA_PERSONAL = re.compile(r"/home/(?!<|usuario|runner)\w+|/Users/(?!<|usuario|runner)\w+|C:\\\\?Users\\\\?(?!<|usuario)\w+")
MAX_BYTES = 2 * 1024 * 1024


def patron(texto):
    """Texto literal; si empieza o acaba en cifra, no puede estar pegado a otras cifras
    (así un código postal no coincide dentro de una coordenada de un SVG)."""
    p = re.escape(texto)
    if texto[0].isdigit():
        p = r"(?<!\d)" + p
    if texto[-1].isdigit():
        p = p + r"(?!\d)"
    return p


def cargar_lista(ruta):
    if ruta:
        texto = pathlib.Path(ruta).read_text(encoding="utf-8")
    elif os.environ.get("PRIVACIDAD_LISTA", "").strip():
        texto = os.environ["PRIVACIDAD_LISTA"]
    elif LISTA_POR_DEFECTO.exists():
        texto = LISTA_POR_DEFECTO.read_text(encoding="utf-8")
    else:
        print(f"✖ Falta la lista de textos prohibidos ({LISTA_POR_DEFECTO} o variable PRIVACIDAD_LISTA).")
        sys.exit(2)
    lineas = [l.strip() for l in texto.splitlines()]
    lineas = [l for l in lineas if l and not l.startswith("#")]
    prohibidos = [re.compile(patron(l), re.I) for l in lineas if not l.startswith("!")]
    permitidos = [re.compile(re.escape(l[1:]), re.I) for l in lineas if l.startswith("!")]
    if not prohibidos:
        print("✖ La lista no tiene ningún texto prohibido.")
        sys.exit(2)
    return prohibidos, permitidos


def archivos(carpeta, versionados):
    if versionados:
        salida = subprocess.run(["git", "-C", str(carpeta), "ls-files", "-z"], capture_output=True, check=True)
        for rel in filter(None, salida.stdout.decode("utf-8").split("\0")):
            yield carpeta / rel
        return
    for ruta in sorted(carpeta.rglob("*")):
        if not IGNORAR.intersection(ruta.relative_to(carpeta).parts):
            yield ruta


def texto_de(ruta, hallazgos, rel):
    if ruta.suffix.lower() == ".pdf":
        if not shutil.which("pdftotext"):
            hallazgos.append(f"{rel}: PDF sin revisar (instala pdftotext, de poppler-utils)")
            return None
        return subprocess.run(["pdftotext", "-q", str(ruta), "-"], capture_output=True, text=True).stdout
    try:
        return ruta.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return None  # binario (imágenes, fuentes)


def comprobar(carpeta, prohibidos, permitidos, versionados):
    hallazgos = []
    for ruta in archivos(carpeta, versionados):
        rel = f"{carpeta.name}/{ruta.relative_to(carpeta).as_posix()}"
        if ruta.is_symlink():
            hallazgos.append(f"{rel}: enlace simbólico")
            continue
        if not ruta.is_file():
            continue
        if ruta.stat().st_size > MAX_BYTES:
            hallazgos.append(f"{rel}: pesa más de 2 MB")
        texto = texto_de(ruta, hallazgos, rel)
        if texto is None:
            continue
        for n, linea in enumerate(texto.splitlines(), 1):
            for p in permitidos:
                linea = p.sub("", linea)
            for p in prohibidos:
                if p.search(linea):
                    hallazgos.append(f"{rel}:{n}: texto prohibido de la lista")  # no se repite el texto privado
            for m in CORREO.finditer(linea):
                if not CORREOS_VALIDOS.search(m.group(0)) and not VERSION.search(m.group(0)):
                    hallazgos.append(f"{rel}:{n}: correo «{m.group(0)}»")
            m = RUTA_PERSONAL.search(linea)
            if m:
                hallazgos.append(f"{rel}:{n}: ruta personal «{m.group(0)}»")
    return hallazgos


def main():
    args, versionados, saltar, lista = sys.argv[1:], False, False, None
    if "--versionados" in args:
        args.remove("--versionados")
        versionados = True
    if "--saltar-ausentes" in args:
        args.remove("--saltar-ausentes")
        saltar = True
    if "--lista" in args:
        i = args.index("--lista")
        if i + 1 >= len(args):
            sys.exit("--lista necesita una ruta")
        lista = args[i + 1]
        del args[i:i + 2]
    if not args or any(a.startswith("--") for a in args):
        sys.exit(__doc__)
    prohibidos, permitidos = cargar_lista(lista)
    hallazgos = []
    for a in args:
        carpeta = pathlib.Path(a).resolve()
        if not carpeta.is_dir():
            if saltar:
                print(f"· {a}: no existe, se salta")
                continue
            print(f"✖ {a}: no existe (nada que comprobar no es lo mismo que nada encontrado)")
            sys.exit(2)
        hallazgos += comprobar(carpeta, prohibidos, permitidos, versionados)
    for h in hallazgos:
        print(h)
    print(f"Hallazgos: {len(hallazgos)}")
    sys.exit(1 if hallazgos else 0)


if __name__ == "__main__":
    main()
