import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: 'http://localhost:9065',
    realm: 'fast-payment',
    clientId: 'fast-payment-client',
})

export default keycloak