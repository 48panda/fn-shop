import React, { Component } from 'react'
import Cookie from 'universal-cookie'

import FNLink from './FNLink';
import NavBar from './navbar';
import state from './variables';

var cookie = new Cookie();

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = state.settings;
        
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(name,value)
        if (this.state.allowCookies||name==="allowCookies") {
          const current = new Date();
          const nextYear = new Date();
          console.log("setting one cookie")
          nextYear.setFullYear(current.getFullYear() + 1);
          cookie.remove(name, { path: '/' });
          cookie.set(name, value, { path: '/' ,expires:nextYear});
          if (name === "allowCookies" && value === false) {
              cookie.remove('allowCookies', { path: '/' });
              cookie.remove('showLastSeen', { path: '/' });
          } if(name==="allowCookies" && value === true) {
            console.log("set cookies now")
            cookie.set('showLastSeen',this.state.showLastSeen,{path:"/",expires:nextYear})
            cookie.set('trackOwned',this.state.trackOwned,{path:"/",expires:nextYear})
          }
        }
        this.setState({
          [name]: value
        },()=>{state.settings = this.state});
      }
    render() {
        return (
            <>
            <NavBar selected="settings" />
            <div className="FormStuff">
                <label>
                  Show last seen date:
                  <input name="showLastSeen" type="checkbox" checked={this.state.showLastSeen} onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                  Use cookies:
                  <input name="allowCookies" type="checkbox" checked={this.state.allowCookies} onChange={this.handleInputChange} />
                </label>
                
            </div>
            {this.state.allowCookies?
            <div className="FormStuff">
                <label>
                  Track owned cosmetics:
                  <input name="trackOwned" type="checkbox" checked={this.state.trackOwned} onChange={this.handleInputChange} />
                </label>
            </div>:<div className="FormStuff"><p>Cookies are used on this website to track your settings.<br/>
            With cookies off, settings that don't store data will be available, but your preferences will be lost if you leave or refresh the page.<br/>
            All cookies that may be used by the site at this time:<ul>
              <li>allowCookies</li>
              <li>showLastSeen</li>
              <li>trackOwned</li>
              <li>locker.selected.*</li></ul></p></div>}
            </>
        )
    }
}

export default Settings
