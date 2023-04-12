import React from "react";
import { FaFilter } from "react-icons/fa";
import Select from "react-select";
const Filters = ({ options, onChange }) => {
  console.log(options)
  return (
    <>
  
      <Select
        options={options}
        isMulti
        onChange={onChange}
        className="text-black basic-multi-select"
      />
      {/* <FaFilter onClick={onClick} /> */}
    </>
  );
};

export default Filters;
