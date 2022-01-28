import React from "react";
import { capitalize } from "../../../../helpers/format";

import "./styles.css";

const ESP_TITLES = {
  price: "precio",
  size: "tamaño",
  country: "países",
};

export default function Selector({
  title,
  defaultValue,
  options,
  value,
  setValue,
}) {
  return (
    <select
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      className="selector"
    >
      <option value={defaultValue}>Selecciona un {ESP_TITLES[title]}</option>
      {/* loop through the given options */}
      {Array.isArray(options) &&
        options.length > 0 &&
        options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {capitalize(option.label)}
            </option>
          );
        })}
    </select>
  );
}

Selector.defaultProps = {
  options: [],
};
