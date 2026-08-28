import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.jsx'

import MyContextsProvider from "./components/custom/MyContextsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyContextsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyContextsProvider>
  </StrictMode>,
);
