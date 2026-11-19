# PANAQA — Sitio web oficial

Sitio de la banda peruana de nu metal PANAQA: **https://www.panaqa.com**

Diseño "Señal perdida": el sitio funciona como una cinta VHS / televisor CRT donde cada sección es un canal.

## Páginas

| Página | Contenido |
|---|---|
| `index.html` | Portada: Caso Omiso (CH 01), Discografía (CH 02), En vivo (CH 03), La Yapita (CH 04), Fechas (CH 05), Teletienda (CH 06), La banda (CH 07), La Resistencia (CH 08), Archivo de cintas (CH 09) |
| `merch.html` | Catálogo completo de la Teletienda |
| `letras.html` | Letras en formato teletexto |
| `casoomiso.html` | Linktree de Caso Omiso (`/casoomiso`) |
| `admin/` | Panel de administración (ver [ADMIN.md](ADMIN.md)) |

## Archivos

- `v2.css` — estilos de todo el sitio
- `v2.js` — efectos de TV, menú, idiomas (ES / EN / 中文), fechas y teletienda de la portada
- `merch-v2.js` — catálogo y carrito de `merch.html`
- `archivo.js` — estante VHS y televisor del Archivo (CH 09)
- `letras-v2.js` + `letras-data.js` — página de letras y sus textos
- `data/*.json` — **contenido editable desde el panel**: fechas, productos, archivo de cintas y ajustes
- `assets/` — imágenes y videos (`assets/merch/` para fotos subidas desde el panel)

## Editar contenido

Fechas, productos, precios y número de WhatsApp se editan en **https://www.panaqa.com/admin**. Instrucciones completas en [ADMIN.md](ADMIN.md).

## Publicar

El sitio está en **Netlify** y se publica solo con cada push a la rama `main` de GitHub.

## Contacto

- **Email:** contacto@panaqa.com
- **WhatsApp:** +51 907 918 581
- **Instagram:** [@panaqa_peru](https://instagram.com/panaqa_peru)

© 2026 PANAQA
