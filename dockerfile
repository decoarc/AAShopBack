FROM quay.io/keycloak/keycloak:latest

ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://ep-lucky-lake-a84ka939-pooler.eastus2.azure.neon.tech/neondb
ENV KC_DB_USERNAME=neondb_owner
ENV KC_DB_PASSWORD=npg_E7JnYz1NcDwO
ENV KC_HOSTNAME=your-app-name.onrender.com
ENV KC_HTTP_ENABLED=true
ENV KC_PROXY=edge
ENV KC_DB_SCHEMA=public
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

CMD ["start-dev"]
