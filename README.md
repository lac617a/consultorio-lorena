# OrtoGuía

Guía visual e interactiva para pacientes de ortodoncia. Sin registro, desde un código QR.

- Producto: [PRD.md](PRD.md)
- Hoja de ruta: [roadmap.md](roadmap.md)
- Guía para desarrollar: [CLAUDE.md](CLAUDE.md)
- Contenido clínico con fuentes: [docs/content-research.md](docs/content-research.md)

## Desarrollo

Requisitos: Node 22 o superior y pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abre http://localhost:3000.

| Comando                             | Qué hace                                                       |
| ----------------------------------- | -------------------------------------------------------------- |
| `pnpm dev`                          | Servidor de desarrollo (Velite en modo watch)                  |
| `pnpm build`                        | Valida el contenido con Velite y genera el build de producción |
| `pnpm lint` / `pnpm lint:fix`       | ESLint, incluido el orden de imports                           |
| `pnpm format` / `pnpm format:check` | Prettier                                                       |
| `pnpm typecheck`                    | TypeScript                                                     |

Los hooks de Git (Husky) se instalan con `pnpm install`: formato y lint en cada commit, formato de mensaje con commitlint y tipos antes de cada push.
