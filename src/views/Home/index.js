import React, { useContext, useEffect } from "react";

import GlobalContext from "../../config/GlobalContext";
import { extractActiveFilters, getHotels } from "../../helpers/filter";
import { HotelList, Filter, Header } from "../../components";

export default function Home() {
  const [state, dispatch] = useContext(GlobalContext);
  const { loading, filters, hotels } = state;

  useEffect(() => {
    dispatch({ type: "setLoading" });
    const filteredHotels = getHotels(extractActiveFilters(filters));
    dispatch({ type: "setHotels", payload: filteredHotels });
  }, [dispatch, filters, loading]);

  return (
    <div>
      <Header />
      <Filter />
      <div className="cardList">
        <HotelList hotels={hotels} loading={loading} />
      </div>
    </div>
  );
}
