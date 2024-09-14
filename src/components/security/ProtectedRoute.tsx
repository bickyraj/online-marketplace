import  React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useKeycloak} from "@react-keycloak/web";

const ProtectedRoute: React.FC<any> = () => {
    const { keycloak, initialized } = useKeycloak();
    if (!initialized) {
        return <div>Loading...</div>;
    }

    return keycloak.authenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;