#!/usr/bin/env node
// Comprueba la web generada en dist/ antes de publicarla:
//  - rutas reservadas para otras webs del dominio (/meta-harness/, /bartop-arcade/) ausentes;
//  - cada página tiene su par en el otro idioma;
//  - <html lang> correcto según la ruta;
//  - todo enlace o recurso interno existe;
//  - ningún recurso (script, estilo, fuente, imagen) se carga desde otro dominio.
// Uso: node scripts/comprobar-dist.mjs [dist]
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const DIST = process.argv[2] ?? "dist";
const SITIO = "https://vicente-priego-aviles.github.io";
const RESERVADAS = ["meta-harness", "bartop-arcade"];
// Pares de rutas es ↔ en (prefijos traducidos)
const PARES = [
  ["/proyectos/", "/en/projects/"],
  ["/contacto/", "/en/contact/"],
  ["/cv/", "/en/cv/"],
  ["/", "/en/"],
];

const errores = [];
const html = [];
(function recorrer(dir) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) recorrer(ruta);
    else if (nombre.endsWith(".html")) html.push(ruta);
  }
})(DIST);

for (const r of RESERVADAS) {
  if (existsSync(join(DIST, r))) errores.push(`ruta reservada presente: /${r}/`);
}

const aUrl = (archivo) => "/" + relative(DIST, archivo).split(sep).join("/").replace(/index\.html$/, "");
const existe = (url) => {
  const limpia = decodeURI(url.split(/[?#]/)[0]);
  const ruta = join(DIST, limpia);
  if (limpia.endsWith("/")) return existsSync(join(ruta, "index.html"));
  return existsSync(ruta) || existsSync(`${ruta}.html`);
};
const parDe = (url) => {
  const enIngles = url.startsWith("/en/");
  for (const [es, en] of PARES) {
    const [desde, hacia] = enIngles ? [en, es] : [es, en];
    if (url.startsWith(desde)) return hacia + url.slice(desde.length);
  }
  return null;
};

for (const archivo of html) {
  const url = aUrl(archivo);
  const texto = readFileSync(archivo, "utf8");
  if (url === "/404.html") continue;

  const idioma = url.startsWith("/en/") ? "en" : "es";
  const lang = /<html[^>]*\slang="([^"]+)"/.exec(texto)?.[1];
  if (lang !== idioma) errores.push(`${url}: <html lang="${lang}">, se esperaba "${idioma}"`);

  const par = parDe(url);
  if (!par || !existe(par)) errores.push(`${url}: falta la página equivalente (${par ?? "sin regla"})`);
}

for (const archivo of html) {
  const url = aUrl(archivo);
  const texto = readFileSync(archivo, "utf8");
  // Enlaces y recursos internos
  for (const [, atributo, valor] of texto.matchAll(/\s(href|src)="([^"]+)"/g)) {
    let destino = valor;
    if (destino.startsWith(SITIO)) destino = destino.slice(SITIO.length) || "/";
    if (!destino.startsWith("/") || destino.startsWith("//")) continue;
    if (RESERVADAS.some((r) => destino.startsWith(`/${r}/`))) continue; // otras webs del dominio
    if (!existe(destino)) errores.push(`${url}: ${atributo}="${valor}" no existe en dist/`);
  }
  // Recursos de terceros: solo se permiten enlaces <a> y <link rel="canonical|alternate">
  for (const [etiqueta] of texto.matchAll(/<(script|link|img|iframe|source|video|audio)\b[^>]*>/g)) {
    const ext = /\s(?:src|href)="(https?:)?\/\/([^/"]+)/.exec(etiqueta);
    if (!ext || ext[2] === new URL(SITIO).host) continue;
    if (/^<link\b/.test(etiqueta) && /\srel="(canonical|alternate)"/.test(etiqueta)) continue;
    errores.push(`${url}: recurso de terceros ${etiqueta.slice(0, 120)}`);
  }
}
for (const css of readdirSync(join(DIST, "_astro")).filter((n) => n.endsWith(".css"))) {
  const texto = readFileSync(join(DIST, "_astro", css), "utf8");
  for (const [m] of texto.matchAll(/url\((["']?)(https?:)?\/\/[^)]+\)/g)) errores.push(`_astro/${css}: ${m}`);
}

for (const e of errores) console.log(`✖ ${e}`);
console.log(`${html.length} páginas revisadas · errores: ${errores.length}`);
process.exit(errores.length ? 1 : 0);
