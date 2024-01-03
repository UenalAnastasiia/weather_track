import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './fonts/baloo-2-v16-latin-600.ttf';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <React.StrictMode>
    <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
