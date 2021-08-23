import React, { Component } from 'react'
import Cookie from 'universal-cookie'

var cookie = new Cookie();

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
          allowCookies: cookie.get("allowCookies") ==="true",
          showLastSeen: cookie.get("showLastSeen") ==="true",
          trackOwned: cookie.get("trackOwned") ==="true"
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const current = new Date();
        const nextYear = new Date();

        nextYear.setFullYear(current.getFullYear() + 1);
        cookie.remove(name, { path: '/' });
        cookie.set(name, value, { path: '/' ,expires:nextYear});
        console.log(name,value)
        if (name === "allowCookies" && value === false) {
            cookie.remove('allowCookies', { path: '/' });
            cookie.remove('showLastSeen', { path: '/' });
        }
        
        this.setState({
          [name]: value
        });
      }
    render() {console.log(this.state.showLastSeen)
        return (
            <>
            <div className="tabs">
              <div className="tabin">
                <a href="/options" className="active"><p>settings</p></a>
                <a href="/"><p>item shop</p></a>
              </div>
            </div>
            <div className="FormStuff">
                <label>
                  Use cookies:
                  <input name="allowCookies" type="checkbox" checked={this.state.allowCookies} onChange={this.handleInputChange} />
                </label>
            </div>
            {this.state.allowCookies?
            <div className="FormStuff">
                <label>
                  Show last seen date:
                  <input name="showLastSeen" type="checkbox" checked={this.state.showLastSeen} onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                  Track owned cosmetics:
                  <input name="trackOwned" type="checkbox" checked={this.state.trackOwned} onChange={this.handleInputChange} />
                </label>
            </div>:<div className="FormStuff"><p>Cookies are used on this website to track your settings.<br/>
            Without cookies, you cannot enable any advanced settings.<br/>
            But, don't worry, support for advanced settings without cookies is coming soon!<br/>
            All cookies that may be used by the site at this time:<ul>
              <li>allowCookies: so that you don't see this everytime</li>
              <li>showLastSeen: to show you last seen dates</li>
              <li>trackOwned: allows you to store your owned cosmetics locally (never shared)</li></ul></p></div>}
            </>
        )
    }
}

export default Settings
