import React from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Calculator from "./component/Calculator";
import Snakeboard from "./component/Snake_game";
import SnakeGame from "./component/snake_game2";
import Game from "./component/tictok";


export default function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/snake2">
            <SnakeGame />
          </Route>
          <Route path="/calculator">
              <Calculator />
          </Route>
          <Route path="/snake">
            <Snakeboard />
          </Route>
          <Route path="/">
            <Game />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDom.render(<App />, document.getElementById('root'));