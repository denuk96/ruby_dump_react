import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "react-router-dom";
import history from "./config/history";
import Header from "./components/common/header/header";
import Routes from "./config/routes";
import Message from "./components/common/message";
import "./styles/index.scss";

export default function App() {
  return (
    <Router history={history}>
      <div>
        <Header />
        <Message />
      </div>
      <Routes />
    </Router>
  );
}
