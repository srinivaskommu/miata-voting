import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Link, Switch, Route} from "react-router-dom";
import {VoterRegistration} from "./components/VoterRegistration";
import {Home} from "./components/Home";
import {Vote} from "./components/Vote";
import {Election} from "./components/Election";

function App() {
  return (
      <div>
        <header>
          <h1>Miata Voting</h1>
        </header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/voter-registration">Voter Registration</Link>
            </li>
            <li>
              <Link to="/elections">Create Elections</Link>
            </li>
            <li>
              <Link to="/vote">Vote</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/voter-registration" component={VoterRegistration} />
            <Route path="/elections" component={Election} />
            <Route path="/vote" component={Vote} />
          </Switch>
        </main>
        <footer>
          <small>Miata Voting Inc.</small>
        </footer>
      </div>
  );
}

export default App;
