import './index.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm.tsx";
import React from "react";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./security/keycloak.ts";
import PrivateRoute from "./helpers/PrivateRoute.ts";
import Nav from "./components/Nav.tsx";

const App: React.FC = () => {
  return (
      <ReactKeycloakProvider
          authClient={keycloak}
          initOptions={{ onLoad: 'login-required' }}
      >
          <Router>
              <Nav />
              <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10">
                  {/* Routes for the different components */}
                  <Routes>
                      <Route path="/register" element={
                          <PrivateRoute>
                                  <RegistrationForm />
                          </PrivateRoute>
                      } />
                  </Routes>
              </div>
          </Router>
      </ReactKeycloakProvider>
  )
}

export default App
