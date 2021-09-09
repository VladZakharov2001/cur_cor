import React from "react";
import "./style.css";
const ConverterSelect = ({ value, onChange, resultValue }) => {
  return (
    <div>
      <select className="currency" value={value} onChange={onChange}>
        {resultValue &&
          Object.keys(resultValue).map((country) => (
            <option key={country} defaultValue={country}>
              {country}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ConverterSelect;
