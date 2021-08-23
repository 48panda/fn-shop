import React, { Component } from 'react'

export class Section extends Component {
    render() {
        return (
            <div className="section" style={{top:this.props.first.y-30,left:"0px",width:"100vw",height:"700px",overflowX:"auto",overflowY:"visible"}}>
                {this.props.data.name!==this.props.prevsect?<p style={{position:"absolute",padding:"0px",margin:"0px",transform:"translate(0px,00px)",fontSize:"50px"}}>{this.props.data.name}</p>:null}
                {this.props.items}
                <div style={{left:`${this.props.last.x - this.props.first.x + this.props.last.size[0] + 100}px`,height:"50px",position:"absolute"}}></div>
            </div>
        )
    }
}

export default Section
