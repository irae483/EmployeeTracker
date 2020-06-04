import React, { Component } from "react";
import "./App.css";
import { MainPage } from "./pages/MainPage";
import {
  Route,
  BrowserRouter,
  Switch,
} from "react-router-dom";
import { RootStore } from "./stores/RootStore";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import validate from "validate.js";
import validators from "./util/Validators";
import { action } from "mobx";

validate.validators = {
  ...validate.validators,
  ...validators,
};


class App extends Component {

  private store: RootStore = new RootStore();
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <MainPage store={this.store.mainPageStore} />}
            />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
