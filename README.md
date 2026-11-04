# edier.me

Sitio web personal y hoja de vida de **Edier Andrés Villaneda Navarro**, Senior Software Developer.
Está publicado en https://edier.me/, en español e inglés.

## Stack

- Angular 21: componentes standalone, signals, sin zone.js y `httpResource`.
- Bootstrap 5.3, AOS y Font Awesome, a partir de la plantilla [MyResume](https://bootstrapmade.com/free-html-bootstrap-template-my-resume/) de BootstrapMade.
- Vitest para pruebas, ESLint y Prettier para calidad de código.

## Desarrollo

Requiere Node.js 20.19 o superior.

```bash
npm install
npm start            # http://localhost:4200
npm run build        # genera dist/browser
npm run test:ci      # pruebas
npm run lint         # ESLint
npm run format       # Prettier
```

## Contenido

Todo el contenido está en dos archivos, uno por idioma:

- `firebase-data/es.json`: español, el idioma por defecto.
- `firebase-data/en.json`: inglés.

Al cambiar un texto, hay que hacerlo en los dos archivos y mantener la misma estructura: hay una prueba que falla si no coinciden. Si se usa un ícono nuevo en `facts`, `services` o `hero.social`, también hay que registrarlo en `src/app/icons.ts`.

## Despliegue

Cada push a `master` publica `dist/browser` en tres lugares:

- **Firebase Hosting**, desde `.github/workflows/firebase-hosting-merge.yml`.
- **GitHub Pages**, desde `.github/workflows/deploy-gh-pages.yml`.
- **Cloudflare Workers**, con la configuración de `wrangler.jsonc`. Cada PR recibe además su propia URL de vista previa.
