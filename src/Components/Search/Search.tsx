import "./Search.css";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTES } from "../../Utility/CommonConstants";
import { clearSearchQuery, setSearchQuery } from "./SearchSlice";

const Search = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (location !== "/books") {
      const input = document.querySelector(
        'input[name="search"]'
      ) as HTMLInputElement | null;
      if (input) {
        input.value = "";
        setSearch("");
        dispatch(clearSearchQuery());
      }
    }
  }, [location]);
  const searchQuery = (e: React.FormEvent<HTMLFormElement>) => {
    if (location !== "/books") {
      navigate(ROUTES.BOOKS);
    }
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("search") as string;
    dispatch(setSearchQuery(searchQuery));
    setSearch(searchQuery);
  };
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest("form") as HTMLFormElement | null;

    if (form) {
      const searchInput = form.elements.namedItem(
        "search"
      ) as HTMLInputElement | null;
      if (searchInput) {
        searchInput.value = "";
        setSearch("");
        dispatch(clearSearchQuery());
      }
    }
  };
  return (
    <div className="position-absolute start-50 translate-middle-x w-400px">
      <form className="d-flex" onSubmit={searchQuery}>
        <div className="input-group">
          <input
            className="form-control"
            type="search"
            name="search"
            placeholder="Search"
            aria-label="Search"
          />
          {search && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="clearbtn"
            >
              ×
            </button>
          )}
          <button className="btn primary px-3" type="submit">
            <i className="bi bi-search" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
