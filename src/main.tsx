import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from '@/routes/AppRoutes';
import { AuthProvider, } from '@/context/AuthContext';
import './index.css';
import { NotificationProvider } from './context/NotificationContext';
import NotificationPopup from './components/ui/NotificationPopup/NotificationPopup';
import { GoogleOAuthProvider } from "@react-oauth/google";
if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register(
    "/firebase-messaging-sw.js"
  )
    .then((registration) => {
      console.log(
        "Service worker registered",
        registration
      );
    });

}

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      <AuthProvider>
        <NotificationProvider>
          <NotificationPopup />
          <AppRoutes />
        </NotificationProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);