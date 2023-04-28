import React, { useEffect } from "react";
import { toast } from "react-toastify";
const Search = ({
  getData,
  search,
  setSearch,
  setData,
  setTotalPages,
  setTotalRecords,
  TempData,
  TempDataValue,
  setLoader,
  placeholder,
}) => {
  useEffect(() => {
    if (search.length === 0) {
      setLoader(true);

      getData();
      setLoader(false);
    }
  }, [search]);

  return (
    <>
      <form
        className="flex w-full"
        onSubmit={(e) => {
          e.preventDefault();
          {
            search.length <= 0
              ? toast.error("Search form is empty")
              : getData();
          }
        }}
      >
        <input
          className="w-full bg-gray-100/50 px-5 py-2 border border-gray-500 rounded-l-full  border-y border-r-0"
          type="search"
          value={search}
          placeholder={`Search ${placeholder}`}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value === "") {
              setData = TempDataValue;
              setTotalPages = TempData.data.pages;
              setTotalRecords = TempData.data.total_records;
            }
          }}
        />

        <button
          type="submit"
          className="py-1 px-5 bg-blue-500 text-white whitespace-nowrap rounded-r-full"
        >
          Find Queries
        </button>
      </form>
    </>
  );
};
export default Search;
