import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import CategoryList from "../category/categoryList";
import PostItem from "./postItem";

export default function PostList() {
  const categories = useSelector((state) => state.categoryReducer.categories);
  const posts = useSelector((state) => state.postReducer.posts);
  const location = useLocation();
  const history = useHistory();

  const sortPosts = () => {
    const categoryName = location.pathname.split("posts/")[1];
    if (categoryName) {
      const category = categories.find(
        (category) => category.name === categoryName
      );
      if (category) {
        return posts.filter((post) => post.category_id === category.id);
      } else {
        history.push("/");
      }
    } else {
      return posts;
    }
  };

  const sortedPosts = sortPosts();

  return (
    <div>
      <h1>Posts Page</h1>

      <CategoryList />
      <hr />

      <h2>posts</h2>
      <ul>
        {sortedPosts !== undefined && sortedPosts.length > 0 ? (
          sortedPosts.map((post, index) => {
            return (
              <li key={post.id}>
                <PostItem
                  post={post}
                  index={index}
                  category={categories.find(
                    (category) => category.id === post.category_id
                  )}
                />
              </li>
            );
          })
        ) : (
          <p>has no posts </p>
        )}
      </ul>
    </div>
  );
}
