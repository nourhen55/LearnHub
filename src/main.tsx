import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './connexion/login';
import ResetPassword from './connexion/reset-password'; // حرف D كبير
import Dashbord from './dashbord/dashbord'; // حرف D كبير
import ProfilPage from './dashbord/components/profil/profil'; // حرف D كبير
import AdminDashboard from './components/admine/AdmineDashboard'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashbord />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/dashboardAdmine" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
