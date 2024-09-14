import './index.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./security/keycloak.ts";
import Nav from "./components/common/Nav.tsx";
import RegistrationForm from "./components/RegistrationForm.tsx";
import Dashboard from "./components/admin/Dashboard.tsx";
import Home from "./components/Home.tsx";
import ProtectedRoute from "./components/security/ProtectedRoute.tsx";

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
                      <Route path="/admin" element={<ProtectedRoute />}>
                          <Route path="/admin/dashboard" element={<Dashboard/>} />
                      </Route>
                      <Route path="/register" element={<RegistrationForm/>}/>
                      <Route path="/" element={<Home/>} />
                  </Routes>
              </div>
          </Router>
      </ReactKeycloakProvider>
  )
}

export default App
