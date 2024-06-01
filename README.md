# Ročníkový projekt - Rezervační systém

## Popis
Projekt vytvořený v rámci předmětu ROPR1 a ROPR2. Jedná se o rezervační systém pro bufet Ostravské univerzity. Backend projektu je napsaný pomocí .NET. Frontend je vytvořen pomocí Reactu.

## Lokální vývoj

Pro lokální vývoj je zapotřebí mít nainstalovaný .NET 6 a Docker a Node.js

### Docker
Je zde kvůli databázi a to konkrétně MS SQL 2022
V hlavní složce se nachází soubor compose.yml. V této složce je potřeba otevřít terminál a vložit příkaz:
```bash
docker compose up
```

Poté se vytvoří kontejner s Microsoft SQL Server, který je potřebný pro běh BE.


Migrace jsou zde automatické a tak není zapotřebí spouštět manuální aplikaci migrací.

