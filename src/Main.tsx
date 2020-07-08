import React from "react";
import Game from "./Game";

import "./Main.sass";

const Main = () => {
  return (
    <div className="Main" data-testid="Main">
      <Game />
    </div>
  );
};

export default Main;
