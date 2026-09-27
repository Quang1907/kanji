import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { startSyncManager } from "./services/sync-manager";
import { registerSW } from "virtual:pwa-register";
import "./index.css";

/**
 * Register PWA.
 */
registerSW({
  immediate: true,
});

/**
 * Sync manager.
 */
startSyncManager();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
