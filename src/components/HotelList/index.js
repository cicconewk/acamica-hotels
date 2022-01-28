import React from "react";
import { Hotel } from "./components";
import Spinner from "../Spinner";

import "./styles.css";
import EmptyList from "./components/EmptyList";

export default function HotelList({ hotels, loading }) {
  if (loading) {
    <div className="hotels">
      <Spinner />
    </div>;
  }

  return (
    <div className="hotels">
      {Array.isArray(hotels) && hotels.length > 0 ? (
        hotels.map((hotel) => {
          return <Hotel key={hotel.slug} hotel={hotel} />;
        })
      ) : (
        <EmptyList message="No se encontraron hoteles con los filtros aplicados" />
      )}
    </div>
  );
}

HotelList.defaultProps = {
  hotels: [],
};
