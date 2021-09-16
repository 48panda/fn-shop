import React, { Component } from 'react'
import {Router, Switch, Route, useRouteMatch} from "react-router-dom";
import history from "./history.js";

import BattlePass from './battlepass.js';

import App from './App.js';
import Settings from './settings.js';
import Locker from './locker.js';
import BattlePassQuiz from './battlepassquiz.js';

function LockerPath() {
  let match = useRouteMatch();

  return (<Switch>
        <Route path={`${match.path}/skin`}>
          <Locker type="skins" store="skin"/>
        </Route>
        <Route path={`${match.path}/backbling`}>
          <Locker type="backblings" store="backbling"/>
        </Route>
        <Route path={`${match.path}/pickaxe`}>
          <Locker type="pickaxes" store="pickaxe"/>
        </Route>
        <Route path={`${match.path}/glider`}>
          <Locker type="gliders" store="glider"/>
        </Route>
        <Route path={`${match.path}/contrail`}>
          <Locker type="contrails" store="contrail"/>
        </Route>
        <Route path={`${match.path}/emote1`}>
          <Locker type="emotes" store="emote1"/>
        </Route>
        <Route path={`${match.path}/emote2`}>
          <Locker type="emotes" store="emote2"/>
        </Route>
        <Route path={`${match.path}/emote3`}>
          <Locker type="emotes" store="emote3"/>
        </Route>
        <Route path={`${match.path}/emote4`}>
          <Locker type="emotes" store="emote4"/>
        </Route>
        <Route path={`${match.path}/emote5`}>
          <Locker type="emotes" store="emote5"/>
        </Route>
        <Route path={`${match.path}/emote6`}>
          <Locker type="emotes" store="emote6"/>
        </Route>
        <Route path={`${match.path}/wrap`}>
          <Locker type="wraps" store="wrap"/>
        </Route>
        <Route path={`${match.path}/music`}>
          <Locker type="music" store="music"/>
        </Route>
        <Route path={`${match.path}/loadingscreen`}>
          <Locker type="loadingscreens" store="loadingscreen"/>
        </Route>
        <Route path={match.path}>
        <Locker />
        </Route>
      </Switch>)
}
export class FNRouter extends Component {
    render() {
        return (
            <Router history={history}>
              <Switch>
                <Route exact path="/fn/"><App /></Route>
                <Route path="/fn/options"><Settings/></Route>
                <Route path="/fn/locker"><LockerPath/></Route>
                <Route exact path="/fn/bp"><BattlePass/></Route>
                <Route exact path="/fn/bp/findlevel/:pass" component={props => <BattlePassQuiz {...props} />}></Route>
              </Switch>
            </Router>
        )
    }
}

export default FNRouter
