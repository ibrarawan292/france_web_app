import React from "react";

const ExportAll = () => {
  return (
    <div>
      <button
        type="button"
        class="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700   dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <svg
          class="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewbox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        Export
      </button>
    </div>
  );
};

export default ExportAll;
