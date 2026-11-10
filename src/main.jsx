// Client entry point that hydrates the pre-rendered HTML and provides Redux and React Router contexts.

import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./redux/store";
import App from "./App";
import "./index.css";

const initialCountries = window.__INITIAL_COUNTRIES__ || [];

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App initialCountries={initialCountries} />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
