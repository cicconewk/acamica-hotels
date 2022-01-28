const conditions = {
  small: {
    min: 0,
    max: 10,
  },
  medium: {
    min: 11,
    max: 20,
  },
  big: {
    min: 21,
    max: 100,
  },
};

export const initialState = {
  dateFrom: "",
  dateTo: "",
  price: "",
  country: "",
  rooms: "",
  filters: {
    price: { selected: false },
    country: { selected: false },
    size: { selected: false },
    date: {
      selected: false,
    },
  },
  hotels: [],
  loading: false,
};

export default function reducer(state, action) {
  switch (action.type) {
    case "updateDate": {
      let nextState;
      if (action.payload.type === "to") {
        nextState = {
          ...state,
          dateTo: action.payload.value,
          filters: { ...state.filters, date: { selected: false } },
        };
      } else {
        nextState = {
          ...state,
          dateFrom: action.payload.value,
          filters: { ...state.filters, date: { selected: false } },
        };
      }

      if (Boolean(nextState.dateFrom) && Boolean(nextState.dateTo)) {
        return {
          ...nextState,
          filters: {
            ...state.filters,
            date: {
              selected: true,
              from: {
                type: "availabilityFrom",
                value: nextState.dateFrom,
              },
              to: {
                type: "availabilityTo",
                value: nextState.dateTo,
              },
            },
          },
        };
      }

      return nextState;
    }
    case "updatePrice":
      return {
        ...state,
        price: action.payload,
        filters: {
          ...state.filters,
          price: {
            type: "price",
            selected: Boolean(action.payload),
            value: parseInt(action.payload, 10) || null,
          },
        },
      };
    case "updateCountry":
      return {
        ...state,
        country: action.payload,
        filters: {
          ...state.filters,
          country: {
            type: "country",
            selected: Boolean(action.payload),
            value: action.payload || null,
          },
        },
      };
    case "updateSize":
      return {
        ...state,
        rooms: action.payload,
        filters: {
          ...state.filters,
          size: {
            type: "rooms",
            selected: Boolean(action.payload),
            value: conditions[action.payload] || null,
          },
        },
      };
    case "setHotels":
      return {
        ...state,
        loading: false,
        hotels: action.payload,
      };
    case "setLoading":
      return { ...state, loading: true };
    case "clearValues":
      return initialState;
    default:
      return;
  }
}
