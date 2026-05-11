import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast"

import App from "./App"
import "./index.css"
import rootReducer from "./reducer"

const store = configureStore({
  reducer: rootReducer,
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#161D29",
              color: "#fff",
              border: "1px solid #2C333F",
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)