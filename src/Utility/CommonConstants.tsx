import { Messages } from "./CommonMessages";

export const PAGINATION_CONSTANT = {
  ITEMS_PER_PAGE: 9,
};

export const menus = [
  { name: Messages.menu.home.value, link: "/" },
  { name: Messages.menu.books.value, link: "/books" },
  { name: Messages.menu.login.value, link: "/login" },
];

export const ROUTES = {
  HOME: "/",
  BOOKS: "/books",
  BOOK_DETAIL: "/book", // base path
  NOT_FOUND: "/notfound",
  LOGIN: "/login",
  THANK_YOU: "/thankyou",
};
