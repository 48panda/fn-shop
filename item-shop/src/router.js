import React, { Component } from 'react'
import {Router, Switch, Route} from "react-router-dom";
import history from "./history.js";

import App from './App.js';
import Settings from './settings.js';
import Locker from './locker.js';

export class FNRouter extends Component {
    render() {
        return (
            <Router history={history}>
              <Switch>
                <Route exact path="/"><App /></Route>
                <Route path="/options"><Settings/></Route>
                <Route path="/locker"><Locker/></Route>
              </Switch>
            </Router>
        )
    }
}

export default FNRouter
