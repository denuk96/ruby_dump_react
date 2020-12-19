import { Record } from "immutable";

export const Settings = Record({
  apiUrl: process.env.REACT_APP_API_URL,
});
