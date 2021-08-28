import React, { Component } from 'react'

export class LockerIcon extends Component {
    render() {
        let data=(this.props.data || {})
        let seriestoclass = {PlatformSeries:" doGamingLegends",DCUSeries:" doNoise",CreatorCollabSeries:" doIcon"}
        return (
            <div className={`lockerItem ${data.backendSeries || data.rarity}${seriestoclass[data.backendSeries || data.rarity] || ""}`} style={{
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
                "--min-size":"150px",
                "--gradient-color-in":"#0075e9",
                "--graidient-color-out":"#0075e9"
            }}>
                {}
                <div className="rarity raritylocker bottom"></div>
                <div className="rarity raritylocker top"></div>
                <div className="lockerpic"></div>
                <div className="background">
                    <div className="SpecialEffects1"></div>
                    <div className="SpecialEffects2"></div>
                    <div className="SpecialEffects3"></div>
                    <div className="SpecialEffects4"></div>
                </div>
            </div>
        )
    }
}

export default LockerIcon
