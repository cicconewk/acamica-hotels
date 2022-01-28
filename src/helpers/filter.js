import hotels from "../data/hotels";
import { getFormattedDate } from "./format";

const keysWithMinMax = ["rooms"];

const transformedHotels = hotels.map((hotel) => {
  return {
    ...hotel,
    availabilityFrom: {
      timestamp: hotel.availabilityFrom,
      formatted: new Date(hotel.availabilityFrom).toLocaleDateString("es-CH", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    },
    availabilityTo: {
      timestamp: hotel.availabilityTo,
      formatted: new Date(hotel.availabilityTo).toLocaleDateString("es-CH", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    },
    price: {
      value: hotel.price,
      type:
        hotel.price === 1
          ? "Económico"
          : hotel.price === 2
          ? "Comfort"
          : hotel.price === 3
          ? "Lujoso"
          : "Magnífico",
    },
    rooms: {
      value: hotel.rooms,
      type:
        hotel.rooms > 20
          ? "Grande"
          : hotel.rooms > 10 && hotel.rooms <= 20
          ? "Mediano"
          : "Pequeño",
    },
  };
});

export const extractActiveFilters = (filters) =>
  Object.values(filters).filter((filter) => filter?.selected);

export const getHotels = (filters) => {
  if (Array.isArray(filters) && filters.length === 0) {
    return transformedHotels;
  }

  const filteredData = transformedHotels.filter((hotel) => {
    for (const filter of filters) {
      if (
        Boolean(filter?.from?.type) &&
        Boolean(filter?.to?.type) &&
        hotel[filter?.from?.type].hasOwnProperty("timestamp") &&
        hotel[filter?.to?.type].hasOwnProperty("timestamp")
      ) {
        const from = getFormattedDate(filter.from.value);
        const to = getFormattedDate(filter.to.value);

        if (
          hotel[filter.from.type].timestamp < from ||
          hotel[filter.to.type].timestamp > to
        ) {
          return false;
        }
      } else {
        if (!hotel.hasOwnProperty(filter.type)) {
          return false;
        }

        if (
          typeof hotel[filter.type] === "string" &&
          hotel[filter.type].toLowerCase() !== filter.value
        ) {
          return false;
        }

        if (typeof hotel[filter.type].value === "number") {
          if (
            keysWithMinMax.includes(filter.type) &&
            (hotel[filter.type].value < filter.value.min ||
              hotel[filter.type].value > filter.value.max)
          ) {
            return false;
          }

          if (
            !keysWithMinMax.includes(filter.type) &&
            hotel[filter.type].value !== filter.value
          ) {
            return false;
          }
        }
      }
    }
    return true;
  });

  return filteredData;
};
