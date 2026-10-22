# Estimo – frontend

React-frontend til **Estimo**, et værktøj til at estimere projekter og planlægge medarbejdernes kapacitet.
Projektlederen opretter projekter med etaper og opgaver, tildeler medarbejdere og kan se, om deadlines kan nås,
og om nogen er overbelastet på tværs af projekter.

Backenden (Java/Javalin) ligger i [4Sem_Scrum_API](https://github.com/JesperTAndersen/4Sem_Scrum_API).

## Krav

| Værktøj     | Version                         | Bemærkning                           |
| ----------- | ------------------------------- | ------------------------------------ |
| **Node.js** | **24** (LTS)                    | Står i `.nvmrc`. CI bruger samme fil |
| npm         | Følger med Node                 |                                      |
| Backend     | Kørende lokalt på port **7070** | Se backendens README                 |

Med [nvm](https://github.com/nvm-sh/nvm) vælges den rigtige version automatisk:

```bash
nvm install
nvm use
```

## Kom i gang

1. Brug Node 24: `nvm use`
2. Installér pakker: `npm ci`
3. Start backenden på port 7070
4. Start frontenden: `npm run dev`
5. Åbn <http://localhost:5173> og log ind med en bruger, der har rollen **projektleder**

Brug `npm ci` og ikke `npm install`. `npm ci` installerer præcis de versioner, der står i `package-lock.json`,
så alle i teamet og CI kører det samme.

### Miljøvariabler

Lokalt behøves ingen `.env`. Vite sender alle kald til `/api/v1` videre til `http://localhost:7070`
(se `vite.config.js`).

| Variabel            | Standard  | Bruges til                                                                 |
| ------------------- | --------- | -------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | `/api/v1` | API'ets adresse, hvis frontenden ikke kører bag samme domæne som backenden |

## Scripts

| Kommando                            | Gør                                     |
| ----------------------------------- | --------------------------------------- |
| `npm run dev`                       | Starter dev-serveren på port 5173       |
| `npm run build`                     | Bygger til `dist/`                      |
| `npm run preview`                   | Viser den byggede version lokalt        |
| `npm run lint` / `npm run lint:fix` | Finder (og retter) kodefejl med ESLint  |
| `npm run format`                    | Formaterer al kode med Prettier         |
| `npm run format:check`              | Tjekker formatering uden at ændre noget |

## Teknologier

React 19 · React Router 8 · Vite 8 · CSS Modules · react-icons · frappe-gantt · react-day-picker

## Projektstruktur

Koden er organiseret efter feature, ikke efter filtype:

```
src/
├── api/            apiClient: fælles fetch med token og fejlhåndtering
├── context/        AuthContext og NotificationContext
├── features/       én mappe pr. feature (dashboard, projects, tasks, planning, …)
│   └── <feature>/
│       ├── components/
│       ├── pages/
│       ├── services/   kald til backenden
│       └── utils/
├── layouts/        DashboardLayout og AuthLayout
├── pages/          sider uden feature (404, forbidden)
├── shared/         komponenter, der bruges af flere features (Button, Card, Badge, TopBar, …)
├── styles/         globale variabler og basis-CSS
└── utils/          fælles hjælpere (datoer, formatering)
```

## Konventioner

- **Ny kode i sin feature-mappe.** Kun noget, der bruges af flere features, hører hjemme i `shared/` eller `utils/`.
- **Imports med `@/`** i stedet for lange relative stier, fx `@/shared/components/ui/Button/Button`.
- **CSS Modules** (`Komponent.module.css`) og variablerne i `styles/variables.css` i stedet for hårdkodede farver.
- **Datoer til API'et** laves med hjælperne i `utils/dateHelpers.js` (`toDateString`, `getNextFourWeeks`),
  ikke med `toISOString()`, som regner i UTC og kan give dagen før.
- Teamets fælles kodestandard står i backend-repoets
  [`docs/coding-standards.md`](https://github.com/JesperTAndersen/4Sem_Scrum_API/blob/developer/docs/coding-standards.md).

## Git-workflow

| Branch                       | Bruges til                                           |
| ---------------------------- | ---------------------------------------------------- |
| `main`                       | Det, der er i drift. Push hertil deployer automatisk |
| `developer`                  | Fælles udviklingsbranch. Alle PR'er går hertil       |
| `feat/…`, `fix/…`, `chore/…` | Én branch pr. opgave, lavet fra `developer`          |

1. Lav en branch fra den nyeste `developer`: `git switch -c feat/kort-beskrivelse origin/developer`
2. Push med `git push -u origin feat/kort-beskrivelse`
3. Opret en PR mod `developer` med én reviewer

### Før en PR

Frontenden har ingen automatiske tests endnu. Derfor skal disse være grønne:

```bash
npm run lint
npm run format:check
npm run build
```

Test derefter ændringen manuelt mod den kørende backend.

## Deployment og sikkerhed

- **GitHub Actions** (`.github/workflows/deploy.yml`) bygger ved PR'er og push til `main`. Ved push til `main`
  kopieres `dist/` til serveren.
- **`npm audit`** kører i CI og stopper deployment ved alvorlige sårbarheder i det, der sendes til brugerne.
- **Dependabot** (`.github/dependabot.yml`) laver ugentligt PR'er mod `developer` med opdaterede pakker og actions.
  Små opdateringer kan merges, når CI er grøn. Nye hovedversioner kræver, at changeloggen læses og appen testes.
