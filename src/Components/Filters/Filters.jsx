import React from "react";
import { FaFilter } from "react-icons/fa";
import Select from "react-select";
const Filters = ({ label, options, value, onChange, onClick }) => {
  console.log(value, "value")
  return (
    <>
      {/* <label className="mr-2">{label}:</label> */}
      {/* <select
      onChange={onChange}
      value={value}
      // defaultValue={"options"}
      style={{
        padding: "5px",
        border: "1px solid black",
        borderRadius: "8px",
      }}
    >
      <option >Select {label}</option>
      {options && options.map((option) => (
        <option  value={option.value}>
          {option.label}
        </option>
      ))}
    </select> */}
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
