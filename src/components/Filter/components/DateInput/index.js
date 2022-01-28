import React from "react";
import "./styles.css";

export default function DateInput({ value, setValue }) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
