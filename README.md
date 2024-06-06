# Ročníkový projekt - Rezervační systém

## Popis
Projekt vytvořený v rámci předmětu ROPR1 a ROPR2. Jedná se o rezervační systém pro bufet Ostravské univerzity.
- Backend aplikace je napsaný pomoci technologie .NET 6 (C#)
- Frontend aplikace se napsaný pomoci technologie React 18.2.0 s použitím JavaScriptu
- Použitá databáze je Microsoft SQL 2022

- Frontend část projektu je rozdělena na 2 podčástí a tou je část uživatelská (z pohledu zákakazníka bufetu) a na administrátorskou část (obsluha bufetu)

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

## Backend
V hlavní BE složce (/ReservationSystemBE/ReservationSystemBE) se nachází soubor ReservationSystemBE.csproj. V této složce je potřeba otevřít terminál a vložit příkaz:
```bash
dotnet run
```
Tento příkaz spustí vývojový server a váš projekt bude dostupný na lokální adrese (https://localhost:7038/).

## Frontend
V hlavní FE složce (/reservation_system_fe) spusťte následující příkaz pro instalaci všech potřebných závislostí:
```bash
npm i
```
Po úspěšné instalaci závislostí spusťte projekt pomocí příkazu:
```bash
npm start
```
Tento příkaz spustí vývojový server a váš projekt bude dostupný na lokální adrese (http://localhost:3000).

##Seznam portů

Frontend :3000
Backend :7038
DB: 1433
