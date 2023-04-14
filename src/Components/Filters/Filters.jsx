import React from "react";
import { FaFilter } from "react-icons/fa";
import Select from "react-select";
const Filters = ({ options, onChange, placeholder }) => {
  console.log(options)
  return (
    <>
  
      <Select
        options={options}
        isMulti
        onChange={onChange}
        className="text-black basic-multi-select"
        placeholder={placeholder}
      />
      {/* <FaFilter onClick={onClick} /> */}
    </>
  );
};

export default Filters;
