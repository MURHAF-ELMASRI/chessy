import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import firebaseConfig from "@api/firebase/configuration.json";
import { Provider as ReduxProvider } from "react-redux";
// Firebase.
import firebase from "firebase";
import store from "@store/store";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const theme = useMemo(
  () =>
    createMuiTheme({
      palette: {
        type: "dark",
      },
    }),
  []
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </ThemeProvider>,

  document.getElementById("root")
);
{
  /* <ThemeProvider theme={theme}>
    <AuthProvider>
      <WebSocketProvider>
        <NotificationProvider>
          <DialogProvider></DialogProvider> */
}
