# Zero to OIDC+API in 60 seconds

## Purpose
This is a proof of concept for a suitable architecture for a secured API.

## Features

- open id connect Authentication through KeyCloak
- secured API in asp.net core 2 using JwtBearer Token
- angular2 SPA can authenticate against KeyCloak and call secured API endpoints


## Get KeyCloak Running
```
docker-compose up
docker cp scripts/init.sh oidc_keycloak_1:/opt/jboss/init.sh
docker exec -it oidc_keycloak_1 /opt/jboss/init.sh
curl http://localhost:8080/auth/realms/demo/.well-known/openid-configuration
```

## Create an API
- https://andrewlock.net/an-introduction-to-openid-connect-in-asp-net-core/
- https://docs.microsoft.com/en-us/aspnet/core/migration/1x-to-2x/identity-2x

```
cd oidc-api
dotnet new webapi
dotnet add package Microsoft.AspNetCore.Cors
dotnet add package Microsoft.AspNetCore.Authentication.OpenIdConnect
# make code changes
# modify csproj to add tools
dotnet restore
dotnet user-secrets set ClientId "oidc-app"
dotnet user-secrets set ClientSecret "b15b17a4-4536-467f-9759-91ad1f21ee15"
dotnet user-secrets set Authority "http://localhost:8080/auth/realms/demo"
```

## Create an Angular App
- https://www.npmjs.com/package/angular-auth-oidc-client

```
ng new oidc-app
cd oidc-app
yarn add angular-auth-oidc-client
yarn add bootstrap ngx-bootstrap
ng serve
```
