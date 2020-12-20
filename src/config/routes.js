import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PostShow from "../components/post/postShow";
import PostList from "../components/post/postList";
import PostForm from "../components/post/postForm";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/posts/new">
        <PostForm />
      </Route>
      <Route exact path="/posts/edit">
        <PostForm />
      </Route>
      <Redirect exact from="/" to="/posts" />
      <Route path="/posts/other/:slug">
        <PostShow />
      </Route>
      <Route path="/posts/:category/:slug">
        <PostShow />
      </Route>
      <Route path="/posts">
        <PostList />
      </Route>
      <Route exact path="/posts/other">
        <PostList />
      </Route>
    </Switch>
  );
}
