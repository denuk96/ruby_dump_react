import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PostShow from "../components/post/postShow";
import PostList from "../components/post/postList";

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/posts" />
      <Route path="/posts/:category/:slug">
        <PostShow />
      </Route>
      <Route path="/posts">
        <PostList />
      </Route>
    </Switch>
  );
}
