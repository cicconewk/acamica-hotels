import React, { useContext } from "react";
import GlobalContext from "../../config/GlobalContext";
import "./styles.css";

const ROOM_SIZES = {
  big: "Grande",
  medium: "Mediano",
  small: "Pequeño",
};

const ROOM_PRICES = ["Económico", "Comfort", "Lujoso", "Magnífico"];

export default function Header() {
  const [state] = useContext(GlobalContext);

  return (
    <div className="container">
      <div>
        <h1>Hoteles</h1>
        <p
          className={
            Boolean(state.dateFrom) && Boolean(state.dateTo) ? "isFilled" : ""
          }
        >
          {Boolean(state.dateFrom) && Boolean(state.dateTo)
            ? `Desde ${state.dateFrom}, Hasta ${state.dateTo}`
            : "En cualquier fecha"}
        </p>
        <p className={Boolean(state.country) ? "isFilled" : ""}>
          {Boolean(state.country) ? `De ${state.country}` : "En cualquier país"}
        </p>
        <p className={Boolean(state.price) ? "isFilled" : ""}>
          {Boolean(state.price)
            ? `Con precio  ${ROOM_PRICES[state.price - 1]}`
            : "De cualquier precio"}
        </p>
        <p className={Boolean(state.rooms) ? "isFilled" : ""}>
          {Boolean(state.rooms)
            ? `De tamaño ${ROOM_SIZES[state.rooms]}`
            : "De cualquier tamaño"}
        </p>
      </div>
    </div>
  );
}
