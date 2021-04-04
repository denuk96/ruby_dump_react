export function postBodyData(post) {
  let { title, body, category_id, picture } = post;
  let bodyData = new FormData();
  bodyData.append("title", title);
  bodyData.append("body", body);
  bodyData.append("category_id", category_id);
  bodyData.append("picture", picture);
  return bodyData;
}
