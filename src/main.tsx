import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ClickSpark from "./components/ui/ClickSpark";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <App />
    </ClickSpark>
  </React.StrictMode>,
);
