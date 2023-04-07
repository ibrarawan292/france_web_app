import React from "react";

const Category = ({ label, options, value, onChange }) => {
  return (
    <>
      <select
        onChange={onChange}
        value={value}
        // defaultValue={"options"}
        style={{
          padding: "5px",
          border: "2px solid var(--bg-fill4)",
          borderRadius: "8px",
        }}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Category;
