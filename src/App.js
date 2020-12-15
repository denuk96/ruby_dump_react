import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/common/header";
import PostList from "./components/post/postList";
import PostShow from "./components/post/postShow";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>

      <Switch>
        <Redirect exact from="/" to="/posts" />
        <Route path="/posts/:category/:slug">
          <PostShow />
        </Route>
        <Route path="/posts">
          <PostList />
        </Route>
      </Switch>
    </Router>
  );
}
