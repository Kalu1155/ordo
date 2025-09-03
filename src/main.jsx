import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import './assets/styles/style.scss';

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderProvider>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
    </OrderProvider>
  </StrictMode>
);
