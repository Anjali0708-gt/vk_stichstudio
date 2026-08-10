import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Provider } from "react-redux";
import {store} from "./redux/store"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      
        <CartProvider>
          <Provider store={store}>
            <AuthProvider>
            <App />
            </AuthProvider>
          </Provider>
        </CartProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);