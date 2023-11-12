# Ročníkový projekt - Rezervační systém

## Lokální vývoj

Pro lokální vývoj je zapotřebí mít nainstalovaný .NET 6 a Docker 

### Docker
V hlavní složce se nachází soubor compose.yml. V této složce je potřeba otevřít terminál a vložit příkaz:
```bash
docker compose up
```

Ve složce ReservationSystem se nachází docker compose pro spuštění backendu a to pomocí příkazu
```bash
docker compose up --build
```

Poté se vytvoří kontejner s Microsoft SQL Server, který je potřebný pro běh BE.


Po úspěšném vytvoření DB serveru je potřeba otevřít ve Visual Studiu Nuget Packet Manager a do příkazové řádky napsat příkaz Update-Database (tento příkaz vytvoří strukturu DB)
