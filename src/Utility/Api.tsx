import axios from "axios";
import type { Books } from "../Types/Types";
export const fetchBooks = (): Promise<Books[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      axios.get<Books[]>("src/BooksListing.json").then((response) => {
        resolve(response.data);
      });
    }, 1000);
  });
};

export const loginRequest = (payload: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get("src/Users.json").then((res: any) => {
        const users = res.data;
        const isUserMatched = users.find(
          (user: any) =>
            user.email == payload.email && user.password === payload.password
        );
        if (isUserMatched) {
          resolve(isUserMatched);
        } else {
          reject("Invalid email or password");
        }
      });
    }, 1000);
  });
};
