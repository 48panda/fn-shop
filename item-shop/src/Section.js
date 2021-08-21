import React, { Component } from 'react'

export class Section extends Component {
    render() {
        return (
            <div className="section">
                {this.props.data.name!==this.props.prevsect?<p style={{top:this.props.first.y,left:this.props.first.x,position:"absolute",padding:"0px",margin:"0px",transform:"translate(-40px,-80px)",fontSize:"50px"}}>{this.props.data.name}</p>:null}
                {this.props.items}
            </div>
        )
    }
}

export default Section
