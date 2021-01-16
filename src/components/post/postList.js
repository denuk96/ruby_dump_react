import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import CategoryList from "../category/categoryList";
import PostItem from "./postItem";
import { Loader } from "../common/loader";
import CreatePostButton from "./buttons/createPostButton";
import styles from "./Post.module.scss";

export default function PostList() {
  const isLoaded = useSelector((state) => state.categoryReducer.loaded);
  const categories = useSelector((state) => state.categoryReducer.categories);
  const posts = useSelector((state) => state.postReducer.posts);
  const location = useLocation();
  const history = useHistory();
  let activeCategoryName;

  const sortPosts = () => {
    const categoryName = location.pathname.split("posts/")[1];
    if (categoryName && categoryName !== "other") {
      const category = categories.find(
          (category) => category.name === categoryName
      );
      if (category) {
        activeCategoryName = category.name;
        return posts.filter((post) => post.category_id === category.id);
      } else {
        history.push("/posts");
      }
    } else if (categoryName === "other") {
      activeCategoryName = "other";
      return posts.filter((post) => post.category_id === null);
    } else {
      return posts;
    }
  };

  if (!isLoaded) {
    return <Loader/>;
  }

  const sortedPosts = sortPosts();

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-12">
          <CategoryList activeCategoryName={activeCategoryName}/>
        </div>

        <div className="col-lg-9 col-md-9 col-sm-12">
          <CreatePostButton/>
          <div className={"mt-3"}>
            {sortedPosts !== undefined && sortedPosts.length > 0 ? (
              sortedPosts.map((post, index) => {
                return (
                    <div key={post.id}>
                      <PostItem
                          post={post}
                          index={index}
                          category={categories.find(
                              (category) => category.id === post.category_id
                          )}
                      />
                    </div>
                );
              })
            ) : (
              <p>has no posts </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
