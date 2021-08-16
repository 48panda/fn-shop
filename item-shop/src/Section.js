import React, { Component } from 'react'

export class Section extends Component {
    render() {
        return (
            <div className="section">
                {this.props.items}
            </div>
        )
    }
}

export default Section
