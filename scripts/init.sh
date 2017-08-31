#!/bin/sh


~/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user admin --client admin-cli --password admin
~/keycloak/bin/kcadm.sh create realms -s realm=demo -s enabled=true -o

CID=$(~/keycloak/bin/kcadm.sh create clients -r demo -s clientId=oidc-app -s 'redirectUris=["http://localhost:4200/*"]' -i)

~/keycloak/bin/kcadm.sh get realms/demo/clients/$CID/installation/providers/keycloak-oidc-keycloak-json

~/keycloak/bin/kcadm.sh create users -s username=test -s enabled=true -r demo

## http://127.0.0.1:8080/auth/realms/demo
