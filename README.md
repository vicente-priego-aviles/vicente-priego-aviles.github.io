# vicente-priego-aviles.github.io

Mi web personal: https://vicente-priego-aviles.github.io (español) · https://vicente-priego-aviles.github.io/en/ (inglés).

Hecha con [Astro](https://astro.build/), sin JavaScript de terceros ni analítica. Se publica en GitHub Pages con una GitHub Action en cada push a `main`.

## Estructura
| Ruta | Qué hay |
|---|---|
| `src/content/proyectos/<es\|en>/` | una ficha por proyecto y por idioma |
| `src/i18n/textos.ts` | textos de la interfaz y rutas traducidas |
| `src/vistas/`, `src/pages/` | páginas (las de `pages/` solo eligen idioma) |
| `diagramas/` | especificaciones de los diagramas; los SVG están en `public/diagramas/` |
| `scripts/` | comprobaciones previas a publicar |

## Comandos
```bash
nvm use                       # Node de .nvmrc
npm ci
npm run dev                   # http://localhost:4321
npm run build
node scripts/comprobar-dist.mjs dist   # pares es/en, enlaces, rutas reservadas, sin recursos de terceros
```

Las rutas `/meta-harness/` y `/bartop-arcade/` pertenecen a las webs de esos repositorios: esta web no debe crearlas.

## Licencia
El código está bajo licencia MIT (ver `LICENSE`). Los textos, el CV y los diagramas son © Vicente Priego Avilés, todos los derechos reservados. Tipografías IBM Plex y Excalifont bajo SIL OFL 1.1 (ver `public/licencias/`).
