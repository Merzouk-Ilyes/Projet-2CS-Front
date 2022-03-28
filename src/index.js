import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Agent from "./components/agent/Agent";
import Host from "./components/host/Host";
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="admin" element={<Admin />} />
      <Route path="host" element={<Host />} />
      <Route path="agent" element={<Agent />} />

      <Route
        path="*"
        element={
          <main style={{ padding: "3rem" }}>
            <p>There's nothing here , Leave me alone !</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
