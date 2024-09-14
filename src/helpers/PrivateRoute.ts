import { useKeycloak } from "@react-keycloak/web";

// @ts-ignore
const PrivateRoute = ({ children }) => {
    const { keycloak, initialized } = useKeycloak();
    if (!initialized) {
        console.log(initialized);
    }
    const isLoggedIn = keycloak.authenticated;
    return isLoggedIn ? children : null;
};

export default PrivateRoute;