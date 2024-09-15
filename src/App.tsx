import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./security/keycloak.ts";
import RegistrationForm from "./components/RegistrationForm.tsx";
import Dashboard from "./components/Dashboard.tsx";
import ProtectedRoute from "./components/security/ProtectedRoute.tsx";
import MainLayout from "./components/MainLayout.tsx";
import ProductList from "./components/products/ProductList.tsx";
import MyCart from "./components/mycart/MyCart.tsx";
import MyOrders from "./components/orders/MyOrders.tsx";

const App: React.FC = () => {
  return (
      <ReactKeycloakProvider
          authClient={keycloak}
          initOptions={{ onLoad: 'login-required' }}
      >
          <Router>
              <Routes>
                  <Route path="/admin" element={<ProtectedRoute />}>
                    <Route path="/admin" element={<MainLayout />}>
                          <Route path="/admin/dashboard" element={<Dashboard/>} />
                          <Route path="/admin/products" element={<ProductList/>} />
                          <Route path="/admin/my-cart" element={<MyCart/>} />
                          <Route path="/admin/my-order-history" element={<MyOrders/>} />
                          <Route path="/admin/register" element={<RegistrationForm/>}/>
                    </Route>
                  </Route>
              </Routes>
          </Router>
      </ReactKeycloakProvider>
  )
}

export default App
