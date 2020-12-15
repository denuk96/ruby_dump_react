import React from "react";

export default function CategoryItem({ category }) {
  return (
    <div>
      <p>id:{category.id}</p>
      <p>name: {category.name}</p>
    </div>
  );
}
