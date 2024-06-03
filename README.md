# Ročníkový projekt - Rezervační systém

## Popis
Projekt vytvořený v rámci předmětu ROPR1 a ROPR2. Jedná se o rezervační systém pro bufet Ostravské univerzity.
- Backend aplikace je napsaný pomoci technologie .NET 6 (C#)
- Frontend aplikace se napsaný pomoci technologie React 18.2.0 s použitím JavaScriptu
- Použitá databáze je Microsoft SQL 2022

<br/>
  
> [!TIP]
> ## Lokální vývoj
> Pro lokální vývoj je zapotřebí mít nainstalovaný .NET 6 a Docker Desktop a Node.js LTS (v20.14.0)

<br/>
  
## Docker
Docker je zde použit pro snadné a konzistentní nastavení databáze Microsoft SQL Server 2022, která je klíčová pro běh backendu (BE) aplikace.
### Nastavení
V hlavní složce se nachází soubor compose.yml. V této složce je potřeba otevřít terminál a vložit příkaz:
```bash
docker compose up
```

Poté se vytvoří kontejner s Microsoft SQL Server, který je potřebný pro běh BE.
Migrace jsou zde automatické a tak není zapotřebí spouštět manuální aplikaci migrací.
