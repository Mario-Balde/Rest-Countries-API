/* Server-side rendering entry point that creates an isolated Redux store and 
renders the React application into an 
HTML string for pre-rendering. */

import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";

import { configureStore } from "@reduxjs/toolkit";
import regionReducer from "./redux/regionSlice";
import searchReducer from "./redux/searchSlice";

import App from "./App";

export function render(url, initialCountries) {
  const store = configureStore({
    reducer: {
      region: regionReducer,
      search: searchReducer,
    },
  });

  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App initialCountries={initialCountries} />
      </StaticRouter>
    </Provider>,
  );
}
