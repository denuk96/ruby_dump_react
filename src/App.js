import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "react-router-dom";
import history from "./config/history";
import Header from "./components/common/header";
import Routes from "./config/routes";
import Message from "./components/common/message";

export default function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Header />
        <Message />
      </div>
      <Routes />
    </Router>
  );
}
