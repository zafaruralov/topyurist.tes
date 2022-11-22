import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { AuthProvider } from "context/AuthProvider";
import reportWebVitals from "./reportWebVitals";
// import "services/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
