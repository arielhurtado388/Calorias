import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ActividadProvider } from "./context/ActividadContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ActividadProvider>
      <App />
    </ActividadProvider>
  </StrictMode>
);
