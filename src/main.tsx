// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from '@/routes/AppRoutes';
import { AuthProvider, } from '@/context/AuthContext';
import './index.css';
import { NotificationProvider } from './context/NotificationContext';
import NotificationPopup from './components/ui/NotificationPopup/NotificationPopup';
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
    <AuthProvider>
      <NotificationProvider>
        <NotificationPopup />
        <AppRoutes />
      </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>
);