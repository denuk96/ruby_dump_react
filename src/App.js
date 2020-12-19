import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/common/header";
import Routes from "./config/routes";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
      <Routes />
    </Router>
  );
}
