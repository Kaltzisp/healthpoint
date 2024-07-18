import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/global.css";
import "./styles/form.css";
import "./styles/menu.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
