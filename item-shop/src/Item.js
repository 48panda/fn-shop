import React, { Component } from 'react'
import { bindAll } from 'underscore'

export class FortniteItem extends Component {
    render() {
        console.log(this.props.index)
        const radians_to_degrees = rad => (rad * 180.0) / Math.PI
        console.log(this.props.data)
        if (this.props.data.newDisplayAsset) {
        let nda = this.props.data.newDisplayAsset.materialInstances[this.props.index]
        return (<div  className={"item "+this.props.data.tileSize+" "+((this.props.data.items[0].series || {}).backendValue || this.props.data.items[0].rarity.value)+" "+this.props.index} style={{
            top:this.props.data.y,
            left:this.props.data.x,
            "--height":this.props.data.size[1]+"px",
            "--width":this.props.data.size[0]+"px",
            "--offerURL":`url(${nda.images.OfferImage})`,
            "--Zoom2":nda.scalings.Scale_Compensation || 0,
            "--Zoom1":nda.scalings.ZoomImage_Percent || 0,
            "--xoffset":nda.scalings.OffsetImage_X || 0,
            "--yoffset":nda.scalings.OffsetImage_Y || 0,
            "--yoffsetcom":nda.scalings.OffsetImage_Y_Compensation || 0,
            "--max-size":Math.max(...this.props.data.size)+"px",
            "--min-size":Math.min(...this.props.data.size)+"px",
            "--gradient-size":nda.scalings.Gradient_Size || 0,
            "--gradient-x":nda.scalings.Gradient_Position_X || 50,
            "--gradient-y":nda.scalings.Gradient_Position_Y || 50,
            "--gradient-color-in":"#"+nda.colors.Background_Color_B.substring(0,6),
            "--gradient-color-out":"#"+nda.colors.Background_Color_A.substring(0,6),
            "--spotlight-size":nda.scalings.Spotlight_Size || 0,
            "--spotlight-x":nda.scalings.Spotlight_Position_X || 50,
            "--spotlight-y":nda.scalings.Spotlight_Position_Y || 50,
            "--spotlight-strength":nda.scalings.Spotlight_Intensity || 100,
            "--marvel-angle":radians_to_degrees(nda.scalings["Streak Angle"])+"deg"

            }}>
            
            <div className="gradient"></div>
            <div className="gradient bright"></div>
            <div className="falloff"></div>
            <div className="SpecialEffects1"></div>
            <div className="SpecialEffects2"></div>
            <div className="offer"></div>
            <div className="rarity"></div>
            <div className="nameSegment"><p>{(this.props.data.bundle||this.props.data.items[0]).name}</p></div>
            <div className="cost"><p><del>{this.props.data.finalPrice!==this.props.data.regularPrice?this.props.data.regularPrice.toLocaleString(undefined):""}</del>&#160;&#160;&#160;{this.props.data.finalPrice.toLocaleString(undefined)}</p><img src="https://fortnite-api.com/images/vbuck.png" alt="V-Bucks"/></div>
                
            </div>
        )} else {return null}
    }
}

export default FortniteItem

//nda.scalings.Spotlight_Position_X || 10000
//nda.scalings.Spotlight_Position_Y || 10000
//(nda.scalings.Spotlight_Intensity || 0)/255