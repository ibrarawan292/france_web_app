import React, { useContext } from "react";
import { ThemeContext } from "../../App";

const Button = ({title, handleShowModal}) => {
  // const { setShowModal, setEditData, setIsEdit, setShowZipped } = useContext(ThemeContext);
  
  return (
    <div>
      <button
        type="button"
        class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-600"
        onClick={handleShowModal
          // setShowModal(true);
          // setEditData(null);
          // setIsEdit(false);
          // setShowZipped(true)
        }
      >
        <svg
          class="h-3.5 w-3.5 mr-2"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          />
        </svg>
        {title}
      </button>
    </div>
  );
};

export default Button;