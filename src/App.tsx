import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Main from "./Main";

import "./App.sass";

const App = () => {
  const toDoItems = ["build", "destroy"];
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <Main />
        </Route>
      </div>
    </Router>
  );
};

export default App;
