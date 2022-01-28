import React, { useContext, useEffect, useState } from "react";

import { DateInput, Selector } from "./components";
import Button from "../Button";

import GlobalContext from "../../config/GlobalContext";
import options from "../../data/options.json";
import "./styles.css";
import { getFormattedDate } from "../../helpers/format";

export default function Filter() {
  const [error, setError] = useState({ context: "", show: false });
  const [state, dispatch] = useContext(GlobalContext);

  useEffect(() => {
    if (
      Boolean(state.dateFrom) &&
      Boolean(state.dateTo) &&
      getFormattedDate(state.dateFrom) > getFormattedDate(state.dateTo)
    ) {
      setError({
        show: true,
        context:
          "La fecha de salida no puede ser menos que la fecha de entrada.",
      });
    }
  }, [state.dateFrom, state.dateTo]);

  return (
    <>
      {/* Error container */}
      {error.show && (
        <div className="errorContainer">
          <p className="error">{error.context}</p>
        </div>
      )}
      <div className="filter">
        {/* Custom date inputs */}
        <DateInput
          value={state.dateFrom}
          setValue={(value) => {
            setError({ context: "", show: false });
            dispatch({ type: "setLoading" });
            dispatch({ type: "updateDate", payload: { value, type: "from" } });
          }}
        />
        <DateInput
          value={state.dateTo}
          setValue={(value) => {
            setError({ context: "", show: false });
            dispatch({ type: "setLoading" });
            dispatch({ type: "updateDate", payload: { value, type: "to" } });
          }}
        />
        {/* Custom selectors */}
        <Selector
          title="country"
          defaultValue={options.countries.default}
          options={options.countries.data}
          value={state.country}
          setValue={(value) => {
            dispatch({ type: "setLoading" });
            dispatch({ type: "updateCountry", payload: value });
          }}
        />
        <Selector
          title="price"
          defaultValue={options.prices.default}
          options={options.prices.data}
          value={state.price}
          setValue={(value) => {
            dispatch({ type: "setLoading" });
            dispatch({ type: "updatePrice", payload: value });
          }}
        />
        <Selector
          title="size"
          defaultValue={options.sizes.default}
          options={options.sizes.data}
          value={state.rooms}
          setValue={(value) => {
            dispatch({ type: "setLoading" });
            dispatch({ type: "updateSize", payload: value });
          }}
        />
        {/* Custom button */}
        <Button
          title="limpiar"
          icon="trash"
          onClick={() => {
            dispatch({ type: "setLoading" });
            dispatch({ type: "clearValues" });
          }}
        />
      </div>
    </>
  );
}
