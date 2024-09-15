import  React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useKeycloak} from "@react-keycloak/web";
import userStore from "../../store/UserStore.ts";
const ProtectedRoute: React.FC<any> = () => {
    const { keycloak, initialized } = useKeycloak();
    if (!initialized) {
        return <div></div>;
    }

    if (keycloak.authenticated) {
        keycloak.loadUserProfile().then((profile) => {
            userStore.setUser(
                profile.firstName ?? "",
                profile.lastName ?? "",
                profile.email ?? "",
                profile.username ?? ""
            );
        });
    }

    return keycloak.authenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;