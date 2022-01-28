import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.css";

export default function Button({ title, onClick, icon, customStyles }) {
  return (
    <button onClick={onClick} className={`button ${customStyles}`}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {title}
    </button>
  );
}
