import './index.css';
import {Link, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm.tsx";
import React from "react";

const App: React.FC = () => {
  return (
      <Router>
          <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10">
              {/* Navigation Menu */}
              <ul className="flex space-x-6 mb-10 text-lg">
                  <li>
                      <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                  </li>
                  <li>
                      <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                  </li>
              </ul>

              {/* Routes for the different components */}
              <Routes>
                  <Route path="/register" element={<RegistrationForm />} />
                  {/*<Route path="/login" element={<Login />} />*/}
              </Routes>
          </div>
      </Router>
  )
}

export default App
