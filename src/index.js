import React from 'react';
import { HelmetProvider } from "react-helmet-async";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AdminContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.Suspense fallback={<div>Loading...</div>}>
    <HelmetProvider>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <App />
            <ToastContainer />
          </CartProvider>
        </UserProvider>
      </AuthProvider>
      </HelmetProvider>
    </React.Suspense>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
