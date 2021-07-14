import "./configProject";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core";
import App from "./App";
// Firebase.
import store from "src/core/store/store";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </ThemeProvider>,

  document.getElementById("root")
);
