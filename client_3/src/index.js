import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reportWebVitals from "./reportWebVitals";
import reducers from "./reducers";
import { RouterProvider } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import router from "./routes/routes";
import './styles/base.css';

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
