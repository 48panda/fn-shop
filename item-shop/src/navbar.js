import React, { Component } from 'react'

import FNLink from './FNLink'

export class NavBar extends Component {
    render() {
        return (
            <div className="tabs">
                <div className="tabin">
                  <FNLink href="/options" className={this.props.selected==="settings"?"active":""}><p>settings</p></FNLink>
                  <FNLink href="/" className={this.props.selected==="shop"?"active":""}><p>item shop</p></FNLink>
                  <FNLink href="/locker" className={this.props.selected==="locker"?"active":""}><p>locker</p></FNLink>
                  <FNLink href="/bp" className={this.props.selected==="bp"?"active":""}><p>battle pass</p></FNLink>
                </div>
              </div>
        )
    }
}

export default NavBar
