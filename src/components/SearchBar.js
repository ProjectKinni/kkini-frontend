import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { fetchAutocompleteSuggestions } from "../utils/ApiClient";

const SERVER_URL = "http://localhost:8080";

function SearchBar({ autocompleteItems, setAutocompleteItems }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedSearches);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      const newSearches = [...recentSearches, searchTerm];
      setRecentSearches(newSearches);
      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
    }

    navigate(`/search-results?searchTerm=${searchTerm}`);
  };

  const debouncedFetch = debounce(async (value) => {
    const { error, items } = await fetchAutocompleteSuggestions(value);
    if (error) {
      setAutocompleteItems([]);
    } else {
      // setAutocompleteItems(items);
    }
  }, 1000);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length < 2) {
      setErrorMessage("검색어는 최소 2자 이상이어야 합니다.");
      // setAutocompleteItems([]);
      return;
    } else {
      setErrorMessage(null);
    }

    debouncedFetch(value);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="name"
          placeholder="검색어를 입력하세요!"
          value={searchTerm}
          onChange={handleInputChange}
          list="recentSearches"
          autoComplete="off"
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <input className="btn-search" type="submit" value="검색" />
      </form>
    </div>
  );
}

export default SearchBar;
