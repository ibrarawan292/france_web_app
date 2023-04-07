import React from "react";

const ZipCode = ({ label, options, value, onChange }) => {
  return (
    <>
      {/* <label className="mr-2">{label}:</label> */}
      <select
        onChange={onChange}
        value={value}
        // defaultValue={"options"}
        style={{
          padding: "5px",
          border: "1px solid black",
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

export default ZipCode;
