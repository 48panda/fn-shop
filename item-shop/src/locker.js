import React, { Component } from 'react'
import FNLink from './FNLink';

export class Locker extends Component {
    render() {
        return (
            <>
              <div className="tabs">
                <div className="tabin">
                  <FNLink href="/options"><p>settings</p></FNLink>
                  <FNLink href="/"><p>item shop</p></FNLink>
                  <FNLink href="/locker" className="active"><p>locker</p></FNLink>
                </div>
              </div> 
            </>
        )
    }
}

export default Locker
