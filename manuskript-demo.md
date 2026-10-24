# Estimo – manuskript og spørgsmål

**Præsentation:** Uge 44, tirsdag · Produktdemo 6 min · Kunde: Klaus Petersen (Global CTO, Alpha Solutions)

**Tallene i [firkantede parenteser]** er fra en testkørsel med demodata. Tjek dem på prod, efter scriptet er kørt. Kapaciteten afhænger af, hvor mange medarbejdere prod har.

---

## Før præsentationen

- [ ] Frontend med de nye ændringer til tidsplanen (fast højde, "Udvid") er merget og deployet til prod
- [ ] `scripts/demo-seed.sql` er kørt på prod **tirsdag morgen** med `SET demo.reset_all = 'true';`. Status på opgaverne passer til en demo om tirsdagen
- [ ] `demo@estimo.dk` findes, er projektleder, og adgangskoden er klar
- [ ] Prod kører den nyeste `main`
- [ ] Forløbet er øvet én gang, og scriptet er kørt igen bagefter for at nulstille
- [ ] Login-siden er åben. Zoom 110 %
- [ ] Netværket er testet i lokalet

---

## Manuskript (6 min)

### 0:00 – Login (20 sek)
**Skærm:** Login-siden

> "Estimo er et planlægningsværktøj til virksomheder, hvor de samme medarbejdere arbejder på flere projekter på én gang, fx en byggevirksomhed. Jeg logger ind som projektleder. Medarbejdere har ikke adgang til planlægningen. Det er projektlederens værktøj."

**Gør:** Log ind som `demo@estimo.dk`.

### 0:20 – Problemet (30 sek)
**Skærm:** Dashboardet loader

> "Forestil jer en projektleder med ni projekter og [18] medarbejdere. Hvert projekt ser fint ud for sig selv. Men tømreren Morten er sat på to projekter samme uge, og det opdager man først, når han ikke kan være to steder. Så skrider deadlinen, og kunden ringer. Estimo samler alle projekter og alle medarbejdere ét sted, så man kan se problemerne, mens der stadig er tid til at gøre noget."

### 0:50 – Dashboardet: hvad projektlederen møder (1 min 20 sek)
**Skærm:** Dashboard. Gå oppefra og ned.

**De fire nøgletal**
> "Det første, projektlederen ser om morgenen, er fire tal."

- **Aktive projekter:**
  > "Otte aktive projekter, og ét er i risiko. Det er det vigtigste tal på siden. Det siger med det samme, om der er noget, der kræver handling i dag."
- **Resterende arbejde:**
  > "[1.513] timers arbejde, der ikke er lavet endnu, svarende til cirka [12] arbejdsdage med vores nuværende folk. Det svarer på spørgsmålet: kan vi sige ja til et nyt projekt?"
- **Aktiv projektværdi:**
  > "Cirka [1,06] millioner kroner. Det er timerne gange kompetencens timepris uden moms, altså hvad det, vi har i gang, er værd."
- **Kapacitet:**
  > "[129] timer om dagen fordelt på [18] aktive medarbejdere. Er nogen stoppet, tæller de ikke med."

**Projekter i risiko**
> "Tagudskiftningen i Roskilde bliver fire dage for sent. Det har ingen skrevet ind. Systemet har regnet det ud fra opgaverne, deres rækkefølge og hvem der laver dem. Projektlederen får en advarsel, før kunden gør."

**Kommende deadlines**
> "De næste fem deadlines, og om de kan nås. Køkkenet i Valby skal være færdigt på fredag, og det bliver det, på dagen, uden luft. Gulvet på Amager har fire dages luft. Og Roskilde kan ikke nås."

**Opgavestatus og projekter pr. status**
> "Fremdriften i det aktive arbejde, og hvor mange projekter der er i hver fase. Klik på en status, og man kommer direkte til de projekter."

**Klokken**
> "Klokken viser syv overbelastninger de næste fire uger, og den følger med rundt i hele appen."

### 2:10 – Hovedprojektet: Villarenovering Hellerup (1 min 30 sek)
**Skærm:** Projekter › Villarenovering Hellerup

- **Overblik:**
  > "Det her er vores største projekt: en totalrenovering. Deadline, forventet slut, og at den kan nås. Tid, pris og fremdrift."
- **Etaper og opgaver:**
  > "Otte faser og 32 opgaver. Rækkefølgen er regnet ud fra afhængigheder. Råhuset kan først starte, når nedrivningen er færdig, og fliserne først, når vådrumssikringen er lagt."
- **Udtørring af gulvstøbning:**
  > "Fire timers arbejde, men betonen skal tørre i otte dage. Man kan angive en minimumsvarighed, og systemet bruger den længste af de to. Det samme gælder tørretid mellem lag maling, og stenbordpladen, der tager ti arbejdsdage at producere. Det er vigtigt i byggeri, hvor man ikke kan sætte flere folk på for at få beton til at tørre hurtigere."
- **Flisearbejde: advarslen:**
  > "Henrik er stoppet. Han står stadig på opgaven, så historikken ikke går tabt, men systemet regner ikke med ham og siger det med navn."
- **Tidsplan (Gantt):** Klik på "Udvid".
  > "Det samme som en tidslinje. Tidsplanen er tegnet med open source-biblioteket frappe-gantt, men alle datoer kommer fra backenden. Frontenden regner ikke selv noget. Den åbner der, hvor projektet er nu: det, vi lige har lavet, det, der er i gang, og det, der kommer. Pilene er afhængighederne."

  **Gør:** Klik på "Luk".

### 3:40 – Kapacitetsudfordringen (50 sek)
**Skærm:** Kapacitet

> "Det her er siden, der binder projekterne sammen. Morten har 14,5 timers arbejde på en dag, hvor han har 7,5."

**Gør:** Fold rækken ud.

> "Det er Gipsvægge i Hellerup og det nye tag i Roskilde. To projektledere kan have planlagt hver sit projekt korrekt, og alligevel er det her galt. Det kan kun ses, når man ser på tværs."

**Gør:** Klik på søgeknappen ved opgaven.

> "Hvem kan overtage? Systemet viser, hvem der har den rigtige kompetence og ledige timer den dag: Mikkel og Thomas."

### 4:30 – Løs det (1 min 15 sek)
**Skærm:** Hellerup › Gipsvægge og lofter

**Gør:** Fjern Morten, tilføj Mikkel. Gå til Kapacitet.

> "Mortens konflikt er væk, og Hellerup kan stadig nås. Emmas to konflikter er tre uger ude, så dem har projektlederen tid til at løse."

**Skærm:** Tagudskiftning Roskilde › Lægning af nyt tag

**Gør:** Tilføj Thomas.

> "Med én tømrer mere bliver opgaven kortere. Forventet slut rykker til før deadline, og projektet kan nås."

**Gør:** Gå til Dashboard.

> "Alle aktive projekter kan nås."

### 5:45 – Afslutning (15 sek)
> "Fra problem til løsning på få klik. Systemet blokerer aldrig en plan. Det fortæller bare ærligt, hvad konsekvensen er, og hvem der kan hjælpe."

---

## Hvis noget går galt

| Problem | Gør |
|---|---|
| Login fejler | Tjek e-mail og adgangskode. Ellers en kollegas bruger |
| Siden loader ikke | Genindlæs |
| Tallene passer ikke | Scriptet er ikke kørt i dag. Fortæl historien og vis princippet |
| Tidsplanen er for lav eller for høj | Zoom eller vinduesstørrelse er ændret efter, fanen blev åbnet. Skift Dag/Uge, så tegnes den igen |

---

## Det svære spørgsmål: overbelastning ved tildeling

> **"Hvis jeg tager en medarbejder fra Hellerup og sætter ham på en opgave i et andet projekt, bliver han overbelastet. Men det ved projektlederen ikke, når han vælger ham. Er det ikke dumt?"**

**Ja, det er korrekt.** Sådan virker det i dag (valideret i koden):

- **Valget:** dropdown-menuen "Tilføj medarbejder" viser alle **aktive** medarbejdere med den **rigtige kompetence**, som ikke allerede er på opgaven. Den viser **ikke**, hvor travlt de har.
- **Backenden** afviser kun en tildeling, hvis medarbejderen er inaktiv, mangler kompetencen, eller opgaven er færdig. Belastning tjekkes ikke ved tildeling.
- **Advarslen kommer bagefter:** konflikten står straks på Kapacitet-siden. Klokken opdateres, så snart man skifter side.

**Svar:**
> "Ja, i dag kommer advarslen efter valget og ikke i selve valget. Det er et bevidst valg, at systemet ikke *forbyder* overbelastning. En projektleder kan have gode grunde: overarbejde en enkelt uge eller en akut opgave. Så systemet advarer i stedet for at blokere. Men vi er enige i, at advarslen burde komme før. Det er den første UX-forbedring, vi ville tage med Product Owner. Og data findes allerede: backenden har et endpoint, der viser hver medarbejders ledige timer pr. dag og kompetence. Næste skridt er at vise det direkte i dropdown-menuen, fx 'Morten Jensen: overbooket i opgavens periode'."

**Hvis han spørger "Hvorfor er det så ikke lavet?":**
> "Opgaven strækker sig over flere dage, og en medarbejder kan være ledig nogle af dem og overbooket andre. Det kræver en beregning for hele opgavens periode pr. medarbejder, og det nåede vi ikke i denne iteration. Vi prioriterede først at få beregningen rigtig og synlig. Nu bygger vi den ind, hvor beslutningen tages."

---

## Spørgsmål om tidsplanen (Gantt)

Valideret i `ProjectGantt.jsx` og `WorkingDaySchedule`.

| Spørgsmål | Svar |
|---|---|
| **Hvorfor bruger I et bibliotek og bygger det ikke selv?** | frappe-gantt er open source (MIT) og tegner i SVG med afhængighedspile, dag- og ugevisning og en markering af i dag. At bygge det selv ville tage lang tid uden at løse kundens problem. Vi brugte tiden på beregningen i stedet. Biblioteket er pakket ind i én komponent, `ProjectGantt`, så det kan skiftes ud uden at røre resten af appen |
| **Hvem regner datoerne ud, frontenden eller backenden?** | Backenden. `WorkingDaySchedule` regner start og slut ud fra estimat, bemanding, afhængigheder og minimumsvarighed. Frontenden tegner bare de datoer, den får. Så viser dashboard, Kapacitet og tidsplan altid de samme tal, fordi der kun er ét sted, de regnes |
| **Hvorfor kan man ikke trække i bjælkerne?** | Diagrammet er `readonly`. Datoerne er et *resultat* af estimat, folk og rækkefølge. Trækker man en bjælke, passer den ikke længere med beregningen. I stedet ændrer man det, der styrer datoen: flere folk, et andet estimat eller en anden afhængighed. Næste skridt kunne være en "tidligste start", man kan sætte på en opgave |
| **frappe-gantt ændrer DOM'en selv. Hvordan spiller det sammen med React?** | React tegner kun en tom `div` med en `ref`. I en `useEffect` opretter vi diagrammet i den `div`, efter React har tegnet. Cleanup-funktionen tømmer den igen. Så rører React og biblioteket aldrig de samme elementer |
| **Hvorfor tegner I hele diagrammet forfra i stedet for at opdatere det?** | Effecten kører igen, når data, dag/uge eller "Udvid" ændrer sig, og laver så et nyt diagram. Det er enkelt og giver aldrig en gammel tilstand. Med omkring 40 rækker går det hurtigt. Rækkerne bygges i en `useMemo`, så de kun regnes om, når projektet eller visningen ændrer sig |
| **Hvordan viser I etaper og opgaver i samme diagram?** | Hver etape er sin egen række med fed tekst foran sine opgaver. Etapens datoer kommer også fra backenden. Id'erne får et præfiks, `stage-5` og `task-5`, så en etape og en opgave med samme id i databasen ikke bliver blandet sammen. Pilene tegnes både mellem etaper og mellem opgaver |
| **Hvad betyder fremdriften i bjælkerne?** | Den bygger på status: ikke startet 0 %, i gang 50 %, færdig 100 %. En etape viser gennemsnittet af sine opgaver. Den bygger ikke på timer, fordi vi ikke registrerer faktisk tidsforbrug. Det er næste skridt |
| **Hvad med opgaver, der ikke kan beregnes?** | De har ingen datoer og kan ikke tegnes. De står i en liste under diagrammet, "Ikke med i tidsplanen", med grunden, og man kan klikke på dem. Det ses på Tilbygning Gentofte, hvor kun en inaktiv medarbejder er tildelt |
| **Weekenderne står i diagrammet. Regnes de med?** | Nej. Backenden springer lørdag og søndag over, så en opgave på tre arbejdsdage fra fredag slutter tirsdag. Bjælken går hen over weekenden, fordi diagrammet viser kalenderdage. Biblioteket kan skjule weekender, men vi valgte at vise dem, så datoerne ligner en almindelig kalender |
| **Hvordan sikrer I, at slutdatoen er med i bjælken?** | Backenden sender den sidste arbejdsdag. Når en dato ikke har et klokkeslæt, lægger frappe-gantt 24 timer til, så bjælken dækker hele den sidste dag |
| **Hvorfor åbner tidsplanen ikke ved projektets start?** | Fordi en projektleder vil se, hvad der sker nu. Den scroller ned til to rækker over den første ufærdige opgave og til en uge før i dag. Vi havde en fejl her: den vandrette scroll kører som en animation, og når vi bagefter satte den lodrette position, stoppede browseren animationen. Løsningen var at gøre det i den rigtige rækkefølge |
| **Hvorfor har boksen en fast højde?** | Med fuld højde var et stort projekt cirka 1.800 px højt. Så lå den vandrette scrollbar i bunden af siden, og datoerne øverst forsvandt, når man scrollede ned. frappe-gantt skal have højden i pixels, så vi regner den ud fra vinduets højde. Små projekter får kun den højde, de skal bruge |
| **Hvordan virker "Udvid"?** | En boolean i state styrer en CSS-klasse med `position: fixed` og `inset: 0`, der lægger diagrammet over hele vinduet. Den har `z-index` 150, lavere end modalens 200, så man stadig kan åbne en opgave. Vi brugte ikke browserens fuldskærm, fordi opgave-modalen ligger uden for diagrammet og ikke ville kunne ses |
| **Lange opgavenavne?** | `fitNameToBar` regner ud, hvor mange tegn der er plads til i bjælken, ud fra cirka 8 pixels pr. tegn, og forkorter med "…". Hele navnet står i popuppen, når man klikker. Det er et skøn og ikke en måling, så et navn med brede bogstaver kan blive skåret lidt for tidligt |
| **I hvilken rækkefølge står rækkerne?** | Backenden sender etaper og opgaver uden fast rækkefølge. Frontenden sorterer dem efter startdato og bruger id, hvis to starter samme dag. Opgaver uden dato kommer sidst |
| **Hvorfor står månederne på engelsk?** | frappe-gantt bruger engelsk som standard. Månederne kan sættes til dansk med `language`-optionen, men "Today"-knappen er skrevet fast ind i biblioteket. Det er en lille ting, vi ville rette |
| **Tilgængelighed og mobil?** | Diagrammet er SVG og ikke godt til skærmlæsere. Den samme information findes som liste under "Etaper & opgaver". På mobil kan man scrolle, men det er lavet til en computer, fordi en projektleder planlægger ved skrivebordet |
| **Hvordan er tidsplanen testet?** | Beregningen af datoerne er testet i backenden med grænseværdier, fx minimumsvarighed, weekender og afhængigheder. Selve tegningen er testet manuelt, fordi frontenden ikke har automatiske tests endnu. Det er vores største tekniske gæld i frontenden |

---

## Spørgsmål om funktionalitet

Mønster: **"Ikke i prototypen, fordi … Næste skridt er …"**

| Spørgsmål | Svar (valideret i koden) |
|---|---|
| **Hvad hvis en medarbejder er syg eller på ferie?** | Man kan deaktivere medarbejderen. Så tæller kapaciteten ikke med, og opgaverne får en advarsel med navn. Der er **ingen fraværskalender** for enkelte dage, fordi det kræver kapacitet pr. dato i stedet for pr. medarbejder. Næste skridt er fraværsperioder |
| **Helligdage?** | Kun lørdag og søndag springes over. Hellerup har derfor planlagt arbejde den 31. december og 1. januar. Næste skridt er en liste over helligdage, der springes over på samme måde |
| **Deltid eller forskellige timer pr. dag?** | Hver medarbejder har én fast daglig kapacitet, fx 6 timer, eller virksomhedens standard på 7,5. Den kan ikke variere pr. ugedag |
| **Kan systemet selv vælge, hvem der skal på?** | Det viser, hvem der er ledig med den rigtige kompetence, men projektlederen beslutter. Automatisk omplanlægning er bevidst ikke med, fordi projektlederen typisk vil bestemme selv |
| **Hvad hvis en opgave tager længere end estimeret?** | Vi registrerer ikke faktisk tidsforbrug. Når en opgave afsluttes, gemmes de planlagte datoer og varigheden som planlægningsværdier. Næste skridt er tidsregistrering, så estimat og virkelighed kan sammenlignes |
| **Hvor præcise er estimaterne?** | Opgaver estimeres med bedste, mest sandsynlige og værste tid, vægtet som (b + 4m + w) / 6. Usikre opgaver trækker derfor estimatet op |
| **Hvordan regnes overbelastning ud?** | En opgaves timer fordeles mellem de tildelte efter deres daglige kapacitet og spredes jævnt over opgavens arbejdsdage. Er summen på tværs af projekter større end kapaciteten den dag, er det en konflikt. Præcis fuld booking er ikke en konflikt. Begrænsning: i virkeligheden er arbejdet ikke altid jævnt fordelt |
| **Hvad sker der, når man tilføjer en medarbejder?** | Opgavens varighed er timer delt med de tildeltes samlede daglige kapacitet. Flere folk giver en kortere opgave, men aldrig kortere end minimumsvarigheden (fx udtørring) |
| **Kan man gemme en plan, der ikke holder?** | Ja, med vilje. Advarsler blokerer aldrig. Det er projektlederens beslutning, og systemet er bare ærligt om konsekvensen |
| **Hvad med opgaver, som ingen er tildelt?** | De regnes med én person á 7,5 timer om dagen, så tidsplanen kan vises. Men timerne kan ikke fordeles på en medarbejder, så de står som "kunne ikke vurderes" på Kapacitet-siden, når de ligger i perioden |
| **Hvad koster projektet?** | Estimerede timer × kompetencens timepris ekskl. moms. Det er kundeprisen, altså hvad arbejdet er værd. Materialer og underleverandører er ikke med |
| **Kritisk vej?** | Ligger i backloggen (US 20). Afhængighederne findes allerede |
| **Kan medarbejderne selv se deres opgaver?** | Nej. Planlægningen er kun for projektledere. En visning for medarbejderne er ikke med i prototypen |

---

## Spørgsmål om kode og arkitektur

| Spørgsmål | Svar (valideret i koden) |
|---|---|
| **Hvordan er backenden bygget op?** | Feature først (project, task, employee, workload …) med tre lag i hver: **presentation** (controller, routes, DTO'er), **domain** (service og forretningsregler) og **data** (DAO med JPA/Hibernate). Afhængigheder går kun én vej, og al wiring sker ét sted, i `DependencyContainer` |
| **Hvorfor DTO'er og ikke bare entiteterne?** | Entiteter forlader aldrig servicelaget. API-kontrakten er DTO'erne, så vi kan ændre databasemodellen uden at ødelægge frontenden. Fx kunne vi tilføje trepunktsestimater uden at ændre de eksisterende svar |
| **Hvordan tester I logik, der afhænger af databasen?** | Services får deres DAO'er gennem constructoren som interfaces. I servicetests bruger vi **in-memory test doubles** (fx `InMemoryProjectDAO`), så forretningsreglerne testes hurtigt uden database. DAO'er og endpoints testes mod en rigtig **PostgreSQL 16 i Testcontainers**, så SQL og mapping også er testet |
| **Hvordan vælger I testcases?** | Systematisk ud fra acceptkriterierne: equivalence partitioning, boundary value analysis og beslutningstabeller. Testdata ligger i CSV-filer, én pr. regelsæt, så testdesignet kan reviewes som en tabel. Fx er "7,5 timer mod 7,5 kapacitet er ikke en konflikt" en grænseværdi i en CSV |
| **Hvordan regnes tidsplanen ud?** | `WorkingDaySchedule` går rekursivt gennem forgængere (opgaver og hele etaper) og husker resultater undervejs, så hver opgave kun regnes én gang. Varighed = estimat ÷ de tildeltes samlede kapacitet, mindst minimumsvarigheden, rundet op til hele arbejdsdage |
| **Hvad med cirkulære afhængigheder?** | De afvises, når man opretter dem (`wouldCreateCycleWith` på både opgaver og etaper). Beregningen har også et ekstra tjek, så den aldrig kan løbe uendeligt |
| **Gemmer I den beregnede plan?** | Nej. Den regnes ud ved hver forespørgsel ud fra de gemte data, så den aldrig er forældet. Undtagelsen er færdige opgaver: deres planlagte datoer gemmes ved afslutning, så historikken ikke ændrer sig. Ulempen er beregning ved hver visning. Ved store datamængder ville vi cache |
| **Hvad hvis to projektledere redigerer samme opgave samtidig?** | Den sidste, der gemmer, vinder. Der er ingen optimistic locking (ingen `@Version` på entiteterne). Næste skridt er en versionskolonne, så den anden får en "opgaven er ændret af en anden"-fejl |
| **Hvordan håndterer I ændringer i databasen?** | Hibernate opdaterer selv tabellerne (`hbm2ddl.auto = update`). Det virker til en prototype, men det kan ikke fjerne eller omdøbe kolonner. Da vi gik fra ét estimat til trepunktsestimater, skulle vi migrere data med et manuelt SQL-script. Næste skridt er **Flyway** med versionerede migreringer |
| **Fejlhåndtering?** | Alle forventede fejl er en `ApiException` (400, 404, 409 …) og bliver til et ens JSON-svar med besked og et `errorId`. Ved serverfejl (500) ser klienten kun "Internal server error" og et `errorId`, og detaljerne logges. Så lækker vi ikke interne oplysninger, men kan stadig finde fejlen i loggen |
| **Sikkerhed?** | Login giver en JWT med udløbstid. Adgangskoder hashes med bcrypt. Hver route har en rolle, så kun projektledere kan planlægge. I frontenden ligger token i `localStorage`, og det er sårbart, hvis der kommer XSS. Næste skridt er en httpOnly-cookie |
| **Afhængigheder og sårbarheder?** | Frontenden: `npm audit` i CI og Dependabot. Backenden har ikke automatisk scanning endnu. Næste skridt er Dependabot for Maven |
| **Hvordan deployer I?** | Ved push til `main` bygger GitHub Actions backenden som et Docker-image og lægger det på Docker Hub. Watchtower på serveren henter det nye image. Frontenden bygges og kopieres til serveren |
| **Hvordan sikrer I, at frontend og backend passer sammen?** | Hver ressource har API-dokumentation i `docs/api/`, og frontend-issues indeholder JSON-kontrakten. Nye felter tilføjes uden at fjerne gamle, så eksisterende klienter ikke går i stykker |
| **Hvad er den største tekniske gæld?** | 1) Ingen automatiske tests i frontenden. 2) Ingen databasemigreringer. 3) Ingen optimistic locking. 4) CI kører kun ved PR'er til `main` og ikke til `developer`, så feature-PR'er bliver ikke testet automatisk |

---

## Spørgsmål om Scrum og proces

*Svarene bruger eksempler fra vores forløb. Kursiv skal udfyldes med vores egne erfaringer.*

| Spørgsmål | Svar |
|---|---|
| **Hvordan har I delt user stories op?** | Store historier blev delt i under-issues, fx US 19 i 19.1 (beregning), 19.2 (API) og 19.3 (frontend). **Refleksion:** vi delte vandret, altså backend først og frontend bagefter. Det gav ventetid: frontenden var blokeret, til backenden var færdig. Næste gang ville vi dele lodret, så hver del giver noget, man kan se |
| **Hvad var jeres største forhindring?** | Afhængigheden mellem backend og frontend. Et frontend-issue (17.5) blev skrevet, før backenden var lavet, så beskrivelsen var forældet, da vi gik i gang. Og kontrakten for ressourceplanlægning blev ændret undervejs, fra et stort gitter til to tabeller. **Håndtering:** "blocked by" mellem issues, JSON-kontrakten skrevet ind i issuet og API-dokumentation, der opdateres sammen med koden |
| **Fungerer jeres Definition of Done?** | Delvist. Den kræver tests, og det virker i backenden. Men flere frontend-issues har "frontend tests" som acceptkriterie, og frontenden har intet testframework. Så kriteriet kan ikke opfyldes. **Opdatering:** enten et testframework i frontenden, eller en DoD, der siger "lint, format og manuel test" for frontenden, indtil det findes |
| **Hvordan håndterede I ændringer i scope?** | Fx ville et dashboard-kort vise "samlede timer". Undervejs fandt vi ud af, at det tal ikke gav projektlederen noget at handle på, fordi afsluttede projekter talte med. Vi ændrede det til resterende arbejde i aktive projekter, men en ændring af acceptkriterier skal godkendes af PO og skrives ind på issuet, ellers er "done" uklart |
| **Hvordan sikrer I kvalitet i sprintet og ikke kun til sidst?** | Tests skrives sammen med koden, coverage måles med JaCoCo og analyseres med SonarQube. Code review med én reviewer før merge. **Refleksion:** CI kører kun ved PR'er til `main`. Ved at køre den ved PR'er til `developer` ville vi fange fejl tidligere |
| **Hvordan fungerede samarbejdet?** | *(Daily standups, hvem der var PO og Scrum Master, kommunikation mellem frontend og backend.)* Et konkret læringspunkt var, at issues blev stående som "åbne" på boardet, selvom koden var merget. Boardet skal opdateres som en del af DoD, ellers viser det ikke den reelle status |
| **Hvordan estimerede I?** | *(Planning poker? Story points? Vores egen praksis.)* Refleksion: de historier, der var afhængige af en anden del, var sværest at estimere, fordi den anden del kunne ændre sig |
| **Hvad ville I gøre anderledes?** | 1) Skære historier lodret. 2) Aftale API-kontrakten, før begge sider går i gang. 3) Et testframework i frontenden fra starten. 4) CI på alle PR'er. 5) Automatisk opdatering af afhængigheder fra dag ét |
| **Hvordan har I brugt AI i udviklingen?** | *(Til punkt 2 på dagsordenen.)* Fx til at gennemgå kode, skrive tests ud fra acceptkriterier og finde fejl. **Refleksion:** AI-forslag skal valideres. Vi fandt fx en datofejl (UTC gav dagen før), som kun blev opdaget, fordi vi testede mod den rigtige backend. Det er review og tests, der sikrer kvaliteten, ikke hvor koden kommer fra |

---

## Hvordan vurderer vi kvaliteten?

### Produktet
- **Vi er tilfredse.** Prototypen løser kerneproblemet: den viser, om projekter kan nås, og hvem der er overbelastet på tværs af projekter.
- **Planen er ærlig:** "Kan ikke beregnes" i stedet for opfundne datoer, og advarsler med navn.
- **Der er altid noget, der kan blive bedre**, især i UX: fx at vise belastning i selve tildelingen, bedre søgning og en fraværskalender. Det tager vi med Product Owner.

### Arbejdet
- **Tests:** backenden har over 850 automatiske tests designet med equivalence partitioning, boundary value analysis og beslutningstabeller i CSV-filer. Testcases udledes af acceptkriterierne.
- **CI:** GitHub Actions bygger og tester ved pull requests. Code review med én reviewer. Definition of Done.
- **Kodekvalitet:** coverage med JaCoCo og statisk analyse med SonarQube. *(Indsæt vores tal.)*
- **Ærlig svaghed:** frontenden har ingen automatiske tests endnu, kun lint, formatering og manuel test. Det er det første, vi ville forbedre, fx med Vitest og React Testing Library.
