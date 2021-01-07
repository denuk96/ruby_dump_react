import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Category.module.scss";
import CategoryItem from "./categoryItem";

export default function CategoryList() {
  const categories = useSelector((state) => state.categoryReducer.categories);
  let match = useRouteMatch();

  return (
    <>
      <div className={styles.categories}>
        <Link
          to="/posts"
          className={styles.categories__item}
          style={{ "--color": "#bf1650", color: "#fff" }}
        >
          <CategoryItem category={{ name: "All" }} />
        </Link>
        {categories.map((category, index) => {
          return (
            <Link
              key={category.id}
              to={`${match.url}/${category.name}`}
              className={styles.categories__item}
              style={{ "--color": category.color || "#fff" }}
            >
              <CategoryItem category={category} index={index} />
            </Link>
          );
        })}
        <Link
          to={`${match.url}/other`}
          className={styles.categories__item}
          style={{ "--color": "#bf1650", color: "#fff" }}
        >
          <CategoryItem category={{ name: "Other" }} />
        </Link>
      </div>
      <Switch>
        <Route path={`${match.path}/:slug`} />
        <Route path={match.path} />
      </Switch>
    </>
  );
}
