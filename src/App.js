import React, { useReducer } from "react";

import Home from "./views/Home";
import reducer, { initialState } from "./store/reducer";
import GlobalContext from "./config/GlobalContext";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      <Home />
    </GlobalContext.Provider>
  );
}

export default App;
