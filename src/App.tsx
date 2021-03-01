import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "./router";

const history = createBrowserHistory();

const App: React.FC = (): JSX.Element => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

export default App;
