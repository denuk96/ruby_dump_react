export function trimText(text, length = 100, end = " ...") {
  let index = text.indexOf(" ", length);
  if (index === -1) index = length;

  return text.slice(0, index) + end;
}
