# Zero to OIDC in 60 seconds

## Get IAM Running
```
docker-compose up
docker cp scripts/init.sh oidc_keycloak_1:/opt/jboss/init.sh
docker exec -it oidc_keycloak_1 /opt/jboss/init.sh
curl http://localhost:8080/auth/realms/demo/.well-known/openid-configuration
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
