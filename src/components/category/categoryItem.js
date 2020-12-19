import React from "react";
import PropTypes from "prop-types";

function CategoryItem({ category }) {
  return (
    <div>
      <p>id:{category.id}</p>
      <p>name: {category.name}</p>
    </div>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
};

export default CategoryItem;
