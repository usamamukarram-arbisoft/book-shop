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
