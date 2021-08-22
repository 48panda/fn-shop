import React, { Component } from 'react'
import FortniteItem from './Item';

export class DisplayItem extends Component {
    render() {
        let banner = this.props.data.banner
        let data = this.props.data
        let nda = {scalings:{}}
        const radians_to_degrees = rad => (rad * 180.0) / Math.PI
        if (!this.props.data.newDisplayAsset) {
            return <><div  className={`item ${this.props.data.tileSize} ${(this.props.data.items[0].series || {}).backendValue || this.props.data.items[0].rarity.value} ${((this.props.data.items[0].series || {}).backendValue || this.props.data.items[0].rarity.value)=="CreatorCollabSeries"?"doIcon":""}`} style={{
                top:this.props.data.y,
                left:this.props.data.x,
                "--height":`${data.size[1]}px`,
                "--width":`${data.size[0]}px`,
                "--offerURL":`url(${data.items[0].images.icon})`,
                "--Zoom2":nda.scalings.Scale_Compensation || 0,
                "--Zoom1":nda.scalings.ZoomImage_Percent || 0,
                "--xoffset":nda.scalings.OffsetImage_X || 0,
                "--yoffset":nda.scalings.OffsetImage_Y || 0,
                "--yoffsetcom":nda.scalings.OffsetImage_Y_Compensation || 0,
                "--max-size":Math.max(...this.props.data.size)+"px",
                "--min-size":Math.min(...this.props.data.size)+"px",
                "--gradient-size":nda.scalings.Gradient_Size || 75,
                "--gradient-x":nda.scalings.Gradient_Position_X || 50,
                "--gradient-y":nda.scalings.Gradient_Position_Y || 33,
                "--gradient-color-in":"#89d8ff",
                "--gradient-color-out":"#237fd5",
                "--spotlight-size":nda.scalings.Spotlight_Size || 100,
                "--spotlight-x":nda.scalings.Spotlight_Position_X || -100,
                "--spotlight-y":nda.scalings.Spotlight_Position_Y || -100,
                "--spotlight-strength":nda.scalings.Spotlight_Intensity || 100,
                "--spotlight-hardness":nda.scalings.Spotlight_Hardness || 50,
                "--marvel-angle":radians_to_degrees(nda.scalings["Streak Angle"])+"deg"
    
                }}>
                <div className="background">
                    <div className="gradient"></div>
                    <div className="gradient bright"></div>
                    <div className="falloff"></div>
                    <div className="SpecialEffects1"></div>
                    <div className="SpecialEffects2"></div>
                    <div className="SpecialEffects3"></div>
                    <div className="SpecialEffects4"></div>
                    <div className="SpecialEffects5"></div>
                    <div className="SpecialEffects6"></div>
                </div>
                <div className="offer"></div>
                <div className="rarity"></div>
                <div className="nameSegment"><p>{(this.props.data.bundle||this.props.data.items[0]).name}</p></div>
                <div className="cost"><p><del>{this.props.data.finalPrice!==this.props.data.regularPrice?this.props.data.regularPrice.toLocaleString(undefined):""}</del>&#160;&#160;&#160;{this.props.data.finalPrice.toLocaleString(undefined)}</p><img width="0" height="0" src="https://fortnite-api.com/images/vbuck.png" alt="V-Bucks"/></div>
            </div>{banner?<div style={{top:this.props.data.y,left:this.props.data.x}} className={`banner ${banner.intensity}`}>{banner.value}</div>:null}</>
        } else {
        return (
            <div>
                {<FortniteItem index={this.props.n % this.props.data.newDisplayAsset.materialInstances.length} {...this.props}/>}
                {banner?<div style={{top:this.props.data.y,left:this.props.data.x}} className={`banner ${banner.intensity}`}>{banner.value}</div>:null}
            </div>
        )}
    }
}

export default DisplayItem
