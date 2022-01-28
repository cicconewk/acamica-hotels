import React from "react";
import Button from "../../../Button";

import "./styles.css";

export default function Hotel({ hotel }) {
  return (
    <div className="hotel">
      <div className="hotel-content">
        <img src={hotel.photo} alt={hotel.name} />
        <h2>{hotel.name}</h2>
        <p>{hotel.availabilityFrom.formatted}</p>
        <p>{hotel.availabilityTo.formatted}</p>
        <div className="description">
          <p>{hotel.description}</p>
        </div>
        <div>
          <div>
            Numero de cuartos {hotel.rooms.value} ({hotel.rooms.type})
          </div>
          <div>Country {hotel.country}</div>
          <div>Precio {hotel.price.type}</div>
        </div>
      </div>
      <Button
        title="reservar"
        customStyles="reserve fullWidth"
        onClick={() => {}}
      />
    </div>
  );
}
