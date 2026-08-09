# hebamme-iana.ch

Website of Iana Vorushyna, Hebamme BSc (midwife), Rüschlikon ZH — postpartum
care, breastfeeding support and birth preparation in the Zimmerberg region.

## Structure

Static site, no build step. Push to `main` → GitHub Pages deploys.

| Path             | Content                              |
|------------------|--------------------------------------|
| `index.html`     | German (source of truth)             |
| `en/index.html`  | English                              |
| `uk/index.html`  | Ukrainian                            |
| `ru/index.html`  | Russian                              |
| `css/style.css`  | shared stylesheet                    |
| `js/lang.js`     | language switcher memory + first-visit suggestion banner |
| `fonts/`, `img/` | self-hosted assets                   |

## Editing content

Edit the German page first, then apply the same change to the three
translations — all four files share the same structure section by section.

## Local preview

    python3 -m http.server 8000

Then open http://localhost:8000 (language pages: /en/, /uk/, /ru/).
