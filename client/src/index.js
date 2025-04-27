import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserMain from "./store/UserMain";
import TransactionMain from "./store/TransactionMain";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserMain(),
      transaction: new TransactionMain(),
    }}
  >
    <App />
  </Context.Provider>
);
