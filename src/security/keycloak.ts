import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: 'http://localhost:7000',
    realm: 'fast-payment',
    clientId: 'fast-payment-client',
})
export default keycloak