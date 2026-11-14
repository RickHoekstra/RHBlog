# Blog van Rick Hoekstra

Een blog over Microsoft 365, UniFi en 3CX, gebouwd met [Hugo](https://gohugo.io) (open source) en gratis gehost op GitHub Pages. Het thema is op maat gemaakt en zit volledig in deze map: geen externe thema's, lettertypen, trackers of scripts.

## Wat zit waar

| Map / bestand | Wat het is |
|---|---|
| `hugo.toml` | Alle instellingen: sitenaam, tagline, bio, menu, social links |
| `content/posts/` | Je artikelen, elk in een eigen map met `index.md` en de afbeeldingen |
| `content/about.md`, `content/contact.md` | De vaste pagina's |
| `data/tools.yaml` | De kaarten op de pagina Tools |
| `layouts/` | De HTML-sjablonen van het thema |
| `assets/css/main.css` | De vormgeving; bovenaan staan de kleuren (`--accent`) |
| `.github/workflows/deploy.yml` | Bouwt en publiceert de site bij elke push |

## Eenmalig: installeren

Je hebt Git en Hugo (de "extended"-versie) nodig.

Windows (PowerShell):

```powershell
winget install Git.Git
winget install Hugo.Hugo.Extended
```

macOS:

```bash
brew install git hugo
```

Sluit daarna de terminal en open hem opnieuw. Controleer met `git --version` en `hugo version`.

Als editor is [VS Code](https://code.visualstudio.com) (of het volledig open source VSCodium) handig: je ziet de mappen, schrijft Markdown en kunt met de ingebouwde Git-knoppen committen en pushen.

## Eenmalig: online zetten

1. Maak op GitHub een nieuwe, **publieke** repository aan (GitHub Pages is alleen gratis voor publieke repositories). Noem hem bijvoorbeeld `blog`. Vink niets aan bij README of .gitignore.
2. Open een terminal in deze map en voer uit (vervang `JOUW-GEBRUIKERSNAAM`):

   ```bash
   git init -b main
   git add .
   git commit -m "Eerste versie van de blog"
   git remote add origin https://github.com/JOUW-GEBRUIKERSNAAM/blog.git
   git push -u origin main
   ```

3. Ga in de repository naar **Settings > Pages** en kies bij **Source** voor **GitHub Actions**.
4. Kijk op het tabblad **Actions**: na een minuut of twee staat de site online. Het adres staat bij Settings > Pages.

Vanaf nu wordt de site bij elke `git push` automatisch opnieuw gebouwd en gepubliceerd.

## Eenmalig: je eigen domein koppelen

1. Vul bij **Settings > Pages > Custom domain** je domein in, bijvoorbeeld `www.jouwdomein.nl`, en klik op Save.
2. Stel bij je domeinprovider deze DNS-records in:

   | Type | Naam | Waarde |
   |---|---|---|
   | CNAME | `www` | `JOUW-GEBRUIKERSNAAM.github.io` |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |

3. Wacht tot GitHub de DNS-controle goedkeurt (meestal binnen een uur, soms tot 24 uur) en vink dan **Enforce HTTPS** aan. Het certificaat is gratis.
4. Zet in `hugo.toml` bij `baseURL` je echte adres. De publicatie zelf gebruikt automatisch het adres uit de Pages-instellingen.

Tip: verifieer je domein ook onder je GitHub-profiel (**Settings > Pages > Verified domains**), zodat niemand anders het kan claimen.

## Een artikel schrijven

1. Maak een nieuw artikel:

   ```bash
   hugo new content posts/mijn-nieuwe-artikel
   ```

   Er ontstaat een map `content/posts/mijn-nieuwe-artikel/` met een `index.md`. De mapnaam wordt het webadres.
2. Vul bovenin titel, `description`, `categories` en `tags` in en schrijf de tekst in Markdown.
3. Screenshots zet je in dezelfde map en voeg je in met `![omschrijving](screenshot.png)`. Met `cover: "cover.png"` krijgt het artikel een eigen thumbnail; zonder cover maakt de site zelf een blauwe tegel met de categorienaam.
4. Bekijk het resultaat lokaal:

   ```bash
   hugo server -D
   ```

   Open http://localhost:1313. De pagina ververst vanzelf bij elke wijziging. `-D` toont ook concepten.
5. Klaar? Zet `draft: true` op `false` (of haal de regel weg) en publiceer:

   ```bash
   git add .
   git commit -m "Nieuw artikel: mijn nieuwe artikel"
   git push
   ```

Let op: een artikel met een datum in de toekomst verschijnt pas bij de eerste publicatie na die datum.

### Handige opmaak

````markdown
```powershell
Get-MgUser -All
```

> [!NOTE]
> Een blauw notitieblok. Ook mogelijk: TIP, IMPORTANT, WARNING en CAUTION.
````

Een inhoudsopgave verschijnt automatisch bij artikelen met meer dan twee tussenkopjes. Uitzetten kan per artikel met `toc: false`.

## Een nieuwe categorie toevoegen

Zet de nieuwe naam bij `categories` in een artikel, bijvoorbeeld `categories: ["Azure"]`. De categorie verschijnt dan vanzelf in de filterbalk op de homepage en op de pagina Topics. Je hoeft verder niets in te stellen.

## Overige aanpassingen

- **Naam, tagline, bio, social links, menu**: `hugo.toml`
- **Accentkleur**: `--accent` bovenaan `assets/css/main.css` (apart voor licht en donker)
- **Logo/favicon**: `static/favicon.svg`
- **Tools-pagina**: blokken toevoegen in `data/tools.yaml`
- **Hugo-versie voor publicatie**: `HUGO_VERSION` in `.github/workflows/deploy.yml`
