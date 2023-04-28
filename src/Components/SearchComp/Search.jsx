import React, {useState } from "react";
import {  toast } from "react-toastify";

const Search = ({ onSearch, validationType, placeholder }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast.error("Please enter a value");
    } else if (validationType === "string" && !/^[a-zA-Z\s]+$/.test(searchValue)) {
      toast.error(`Invalid input: Please search for a ${placeholder}`);
    } else if (validationType === "number" && !/^[+]?[\d]+$/.test(searchValue)) {
      toast.error(`Invalid input: Please search for a ${placeholder}`);
    } else {
      onSearch(searchValue);
    }
  };

  return (
    <div>
      <form
        class="flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="border-2 border-black text-black rounded-lg focus:border-black block w-full pl-10 p-1  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 "
            required=""
            value={searchValue}
            onChange={(e) => (
              e.target.value === "" && onSearch(""),
              setSearchValue(e.target.value)
            )}
            placeholder={`Search ${placeholder}`}
          />
        </div>
        <button
          className="rounded-lg bg-blue-600 py-1 ml-2 text-white px-2"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
