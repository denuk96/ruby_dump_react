import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import CategoryList from "../category/categoryList";
import PostItem from "./postItem";
import { Loader } from "../common/loader";
import CreatePostButton from "./buttons/createPostButton";

export default function PostList() {
  const isLoaded = useSelector((state) => state.categoryReducer.loaded);
  const categories = useSelector((state) => state.categoryReducer.categories);
  const posts = useSelector((state) => state.postReducer.posts);
  const location = useLocation();
  const history = useHistory();

  const sortPosts = () => {
    const categoryName = location.pathname.split("posts/")[1];
    if (categoryName && categoryName !== "other") {
      const category = categories.find(
        (category) => category.name === categoryName
      );
      if (category) {
        return posts.filter((post) => post.category_id === category.id);
      } else {
        history.push("/posts");
      }
    } else if (categoryName === "other") {
      return posts.filter((post) => post.category_id === null);
    } else {
      return posts;
    }
  };

  if (!isLoaded) {
    return <Loader />;
  }

  const sortedPosts = sortPosts();

  return (
    <div className="container">
      <h1>Posts Page</h1>

      <CategoryList />

      <h2>posts</h2>
      <CreatePostButton />
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
