import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollButton from "./components/default/ScrollButton.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ScrollButton />
  </BrowserRouter>
);
