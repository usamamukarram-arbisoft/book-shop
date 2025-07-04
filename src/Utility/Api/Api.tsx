import axios from "axios";

import type { Books, usersInterface } from "../../Types/Types";
import { Messages } from "../CommonMessages";
export const fetchBooks = (): Promise<Books[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      axios.get<Books[]>("src/BooksListing.json").then((response) => {
        resolve(response.data);
      });
    }, 1000);
  });
};

export const loginRequest = (payload: usersInterface) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get("src/Users.json").then((res) => {
        const users = res.data;
        const isUserMatched = users.find(
          (user: usersInterface) =>
            user.email == payload.email && user.password === payload.password
        );
        if (isUserMatched) {
          resolve(isUserMatched);
        } else {
          reject(Messages.SignIn.error.value);
        }
      });
    }, 1000);
  });
};
