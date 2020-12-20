import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryItem from "./categoryItem";

export default function CategoryList() {
  const categories = useSelector((state) => state.categoryReducer.categories);
  let match = useRouteMatch();

  return (
    <>
      <div>
        <h4>Category List</h4>
        <ul>
          <li>
            <Link to="/posts"> All </Link>
          </li>
          <li>
            <Link to={`${match.url}/other`}> OTHER </Link>
          </li>
          {categories.map((category, index) => {
            return (
              <li key={category.id}>
                <Link to={`${match.url}/${category.name}`}>
                  <CategoryItem category={category} index={index} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Switch>
        <Route path={`${match.path}/:slug`} />
        <Route path={match.path}>
          <h3>no selected categories</h3>
        </Route>
      </Switch>
    </>
  );
}
