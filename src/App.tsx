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
import MyOrders from "./components/orders/MyOrders.tsx";
import Checkout from "./components/mycart/checkout/Checkout.tsx";
import PaymentSuccessful from "./components/payment/PaymentSuccessful.tsx";
import userStore from "./store/UserStore.ts";

const App: React.FC = () => {
    const onEvent = (event: string) => {
        if (event === 'onAuthSuccess') {
            const tokenParsed = keycloak.tokenParsed;
            if (tokenParsed) {
                userStore.setUser(
                    tokenParsed.given_name,
                    tokenParsed.family_name,
                    tokenParsed.email,
                    tokenParsed.preferred_username,
                );
            }
        }
    };
  return (
      <ReactKeycloakProvider
          authClient={keycloak}
          initOptions={{ onLoad: 'login-required' }}
          onEvent={onEvent}
      >
          <Router>
              <Routes>
                  <Route path="/admin" element={<ProtectedRoute />}>
                    <Route path="/admin" element={<MainLayout />}>
                          <Route path="/admin/dashboard" element={<Dashboard/>} />
                          <Route path="/admin/products" element={<ProductList/>} />
                          <Route path="/admin/my-order-history" element={<MyOrders/>} />
                          <Route path="/admin/register" element={<RegistrationForm/>}/>
                          <Route path="/admin/checkout" element={<Checkout/>}/>
                          <Route path="/admin/payment-successful" element={<PaymentSuccessful/>}/>
                    </Route>
                  </Route>
              </Routes>
          </Router>
      </ReactKeycloakProvider>
  )
}

export default App
