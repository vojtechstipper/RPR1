FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine3.14 as build
WORKDIR /app
COPY . .
ENV DOTNET_RUNNING_IN_CONTAINER=true
RUN apk add --no-cache icu-libs krb5-libs libgcc libintl libssl1.1 libstdc++ zlib

ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
RUN dotnet restore
RUN dotnet publish -o /app/published-app

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine3.14 as runtime
WORKDIR /app
COPY --from=build /app/published-app /app
ENTRYPOINT [ "dotnet", "/app/ReservationSystemBE.dll" ]