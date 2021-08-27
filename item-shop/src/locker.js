import React, { Component } from 'react'
import FNLink from './FNLink';
import state from './variables';
import LockerIcon from './lockericon';

import './locker.css';

export class Locker extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       all:{},
       owned:[]
    }
  }
  
  async componentDidMount() {
    while(!state.hasOwnProperty("all"))
        await new Promise(resolve => setTimeout(resolve, 1000));
        while(!state.hasOwnProperty("owned"))
        await new Promise(resolve => setTimeout(resolve, 1000));
      this.setState({all:state.all,owned:state.owned})
      console.log(state.owned,state.all)
      console.log(state.owned.map(e=>this.state.all[e.toLowerCase()]))
  }
    render() {
        return (
            <div className="lockerpage">
              <div className="tabs">
                <div className="tabin">
                  <FNLink href="/options"><p>settings</p></FNLink>
                  <FNLink href="/"><p>item shop</p></FNLink>
                  <FNLink href="/locker" className="active"><p>locker</p></FNLink>
                </div>
              </div>
              <div className="lockerItems">
               {this.state.owned.map(e=><LockerIcon key={e} data={this.state.all[e.toLowerCase()]} />)}
              </div>
            </div>
        )
    }
}

export default Locker
