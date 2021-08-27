import React, { Component } from 'react'

export class LockerIcon extends Component {
    render() {
        let data=(this.props.data || {})
        console.log(data)
        return (
            <div className="lockerItem" style={{
                "--image":`url('${data.images.icon.url}')`,
                "--circuit-bg-1":'#a335a0',
                "--circuit-bg-2":'#0059ff',
                "--circuit-dots":'#a56dff',
                "--circuit-highlight":'#0077ff',
                "--circuit-lines-1":'#4b00a5',
                "--circuit-lines-2":'#bdadff',
                "--circuit-size":0.3,
                "--circuit-skew":-7.16197,
                "--height":"150px",
                "--width":"150px",
                "--max-size":"150px",
                "--min-size":"150px"
            }}>
                {}
                <div className="lockerpic"></div>
                <div className="SpecialEffects1"></div>
                <div className="SpecialEffects2"></div>
                <div className="SpecialEffects3"></div>
                <div className="SpecialEffects4"></div>
            </div>
        )
    }
}

export default LockerIcon
