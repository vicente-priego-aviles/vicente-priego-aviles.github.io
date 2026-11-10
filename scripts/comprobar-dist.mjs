#!/usr/bin/env node
// Comprueba la web generada en dist/ antes de publicarla:
//  - rutas reservadas para otras webs del dominio (/meta-harness/, /bartop-arcade/) ausentes;
//  - cada página tiene su par en el otro idioma y el selector de idioma (y hreflang) lleva a ese par;
//  - están todas las páginas esperadas (una ficha por archivo de src/content/proyectos/<idioma>/);
//  - el tema claro/oscuro: script en línea en <head> y CSS con prefers-color-scheme;
//  - <html lang> correcto según la ruta;
//  - todo enlace o recurso interno existe;
//  - ningún recurso (script, estilo, fuente, imagen) se carga desde otro dominio, tampoco desde <style> o style= en línea.
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
  let limpia;
  try {
    limpia = decodeURI(url.split(/[?#]/)[0]);
  } catch {
    return false;
  }
  const ruta = join(DIST, limpia);
  if (limpia.endsWith("/")) return existsSync(join(ruta, "index.html"));
  // Con trailingSlash "always", un enlace a una carpeta sin barra final es un error
  return (existsSync(ruta) && statSync(ruta).isFile()) || existsSync(`${ruta}.html`);
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

  // CA1: el selector de idioma y el hreflang alternativo llevan exactamente al par
  const otro = idioma === "es" ? "en" : "es";
  const selector = new RegExp(`<a\\b[^>]*\\shreflang="${otro}"[^>]*>`).exec(texto)?.[0];
  const hrefSelector = selector && /\shref="([^"]+)"/.exec(selector)?.[1];
  if (hrefSelector !== par) errores.push(`${url}: el selector de idioma lleva a ${hrefSelector ?? "(no hay)"}, se esperaba ${par}`);
  const alterna = new RegExp(`<link[^>]*rel="alternate"[^>]*hreflang="${otro}"[^>]*href="([^"]+)"`).exec(texto)?.[1];
  if (alterna !== SITIO + par) errores.push(`${url}: hreflang="${otro}" apunta a ${alterna ?? "(no hay)"}, se esperaba ${SITIO + par}`);

  // CA5: el tema se fija antes de pintar (script en línea dentro de <head>)
  const head = /<head>([\s\S]*?)<\/head>/.exec(texto)?.[1] ?? "";
  if (!/<script>[^<]*localStorage\.getItem\("tema"\)/.test(head)) errores.push(`${url}: falta el script del tema en <head>`);
}

// Páginas esperadas: las fijas y una ficha por archivo de contenido
const fijas = ["/", "/proyectos/", "/cv/", "/contacto/", "/en/", "/en/projects/", "/en/cv/", "/en/contact/", "/404.html"];
for (const u of fijas) if (!existe(u)) errores.push(`falta la página ${u}`);
for (const [idioma, base] of [["es", "/proyectos/"], ["en", "/en/projects/"]]) {
  const carpeta = join("src", "content", "proyectos", idioma);
  if (!existsSync(carpeta)) continue;
  for (const md of readdirSync(carpeta).filter((n) => n.endsWith(".md"))) {
    const u = `${base}${md.replace(/\.md$/, "")}/`;
    if (!existe(u)) errores.push(`falta la ficha ${u}`);
  }
}

for (const archivo of html) {
  const url = aUrl(archivo);
  const texto = readFileSync(archivo, "utf8");
  // Enlaces y recursos internos
  for (const [, atributo, valor] of texto.matchAll(/\s(href|src|srcset|poster|data)="([^"]+)"/g)) {
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
  // CSS en línea (<style> y style=): url() o @import a otro dominio
  const enLinea = [...texto.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g), ...texto.matchAll(/\sstyle="([^"]*)"/g)].map((m) => m[1]);
  for (const css of enLinea) {
    for (const [m] of css.matchAll(/(url\(\s*["']?|@import\s+["'])(https?:)?\/\/[^)"';]+/g)) errores.push(`${url}: CSS en línea con recurso de terceros ${m}`);
  }
  // JS en línea (<script> sin src): ninguna URL absoluta a otro dominio
  for (const [, js] of texto.matchAll(/<script\b(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
    for (const [m] of js.matchAll(/["'`](https?:)?\/\/[a-z0-9.-]+\.[a-z]{2,}[^"'`]*["'`]/gi)) {
      if (!m.includes(new URL(SITIO).host)) errores.push(`${url}: script en línea con URL a otro dominio ${m.slice(0, 80)}`);
    }
  }
  if (/\ssrcset="[^"]*(https?:)?\/\/[^/\s]/.test(texto)) errores.push(`${url}: srcset con recurso de terceros`);
}
const ASTRO = join(DIST, "_astro");
const css = existsSync(ASTRO) ? readdirSync(ASTRO).filter((n) => n.endsWith(".css")) : [];
if (css.length === 0) errores.push("no hay CSS en dist/_astro/");
let conTemaOscuro = false;
for (const nombre of css) {
  const texto = readFileSync(join(ASTRO, nombre), "utf8");
  if (/prefers-color-scheme:\s*dark/.test(texto)) conTemaOscuro = true;
  for (const [m] of texto.matchAll(/(url\(\s*["']?|@import\s+["'])(https?:)?\/\/[^)"';]+/g)) errores.push(`_astro/${nombre}: ${m}`);
}
if (css.length && !conTemaOscuro) errores.push("el CSS no tiene el bloque prefers-color-scheme: dark");
for (const nombre of existsSync(ASTRO) ? readdirSync(ASTRO).filter((n) => n.endsWith(".js")) : []) {
  const texto = readFileSync(join(ASTRO, nombre), "utf8");
  // Cualquier cadena con una URL absoluta en el JS propio es sospechosa (aquí solo hay el conmutador de tema)
  for (const [m] of texto.matchAll(/["'`](https?:)?\/\/[a-z0-9.-]+\.[a-z]{2,}[^"'`]*["'`]/gi)) {
    if (!m.includes(new URL(SITIO).host)) errores.push(`_astro/${nombre}: URL a otro dominio ${m.slice(0, 80)}`);
  }
}
if (html.length === 0) errores.push("dist/ no tiene páginas");

for (const e of errores) console.log(`✖ ${e}`);
console.log(`${html.length} páginas revisadas · errores: ${errores.length}`);
process.exit(errores.length ? 1 : 0);
