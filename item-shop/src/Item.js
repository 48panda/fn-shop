import React, { Component } from 'react'
import { bindAll } from 'underscore'
function LightenDarkenColor(r,n){var a=!1;var z="#"==r[0]&&(r=r.slice(1),a=!0);var t=parseInt(r,16),e=(t>>16)+n;e>255?e=255:e<0&&(e=0);var i=(t>>8&255)+n;i>255?i=255:i<0&&(i=0);var o=(255&t)+n;return o>255?o=255:o<0&&(o=0),(a?"#":"")+(o|i<<8|e<<16).toString(16)}
export class FortniteItem extends Component {
    render() {
        const radians_to_degrees = rad => (rad * 180.0) / Math.PI
        if (this.props.data.newDisplayAsset) {
        let nda = this.props.data.newDisplayAsset.materialInstances[this.props.index]
        let flags = nda.flags || {}
        return (<div  className={`${this.props.owned ? "owned " : ""}item ${this.props.data.tileSize} ${(this.props.data.items[0].series || {}).backendValue || this.props.data.items[0].rarity.value}${flags.bIsCreatorCollabSeries ? " doIcon" : ""}${flags.bIsDCUSeries ? " doNoise" : ""}${flags.bIsPlatformSeries ? " doGamingLegends" : ""}${flags.IsCharacter!==false?" character":""}`} style={{
            top:this.props.data.y - this.props.first.y + 80,
            left:this.props.data.x - this.props.first.x + 50,
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
            "--gradient-x":nda.scalings.Gradient_Position_X || 0,
            "--gradient-y":nda.scalings.Gradient_Position_Y || 0,
            "--gradient-hardness":nda.scalings.Gradient_Hardness || 50,
            "--gradient-color-out":"#"+(nda.colors.ColorCircuitBackground?"000":nda.colors.Background_Color_A).substring(0,6),
            "--gradient-color-in":"#"+(nda.colors.ColorCircuitBackground||nda.colors.Background_Color_B).substring(0,6),
            "--spotlight-size":nda.scalings.Spotlight_Size || 100,
            "--spotlight-x":nda.scalings.Spotlight_Position_X || 0,
            "--spotlight-y":nda.scalings.Spotlight_Position_Y || 0,
            "--spotlight-strength":nda.scalings.Spotlight_Intensity || 20,
            "--spotlight-hardness":nda.scalings.Spotlight_Hardness || 100,
            "--marvel-angle":radians_to_degrees(nda.scalings["Streak Angle"])+"deg",
            "--circuit-bg-1":"#"+(nda.colors.ColorCircuitBackground || "").substring(0,6),
            "--circuit-bg-2":"#"+(nda.colors.ColorCircuitBackground2 || "").substring(0,6),
            "--circuit-dots":"#"+(nda.colors.ColorCircuitDots || "").substring(0,6),
            "--circuit-highlight":"#"+(nda.colors.ColorCircuitHighlights || "").substring(0,6),
            "--circuit-lines-1":"#"+(nda.colors.ColorCircuitLines || "").substring(0,6),
            "--circuit-lines-2":"#"+(nda.colors.ColorCircuitLines2 || "").substring(0,6),
            "--circuit-size":nda.scalings.SizeCircuitPattern,
            "--circuit-skew":radians_to_degrees(nda.scalings.Skew),
            "--last-seen":"'"+this.props.lastSeenString+"'"

            }}>
                <div className="clickDetect"></div>
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
            <div className="cost"><p><del>{this.props.data.finalPrice!==this.props.data.regularPrice?this.props.data.regularPrice.toLocaleString(undefined):""}</del>&#160;&#160;&#160;{this.props.data.finalPrice.toLocaleString(undefined)}</p><img src="https://fortnite-api.com/images/vbuck.png" alt="V-Bucks"/></div>
            
                
            </div>
        )} else {return null}
    }
}

export default FortniteItem

//nda.scalings.Spotlight_Position_X || 10000
//nda.scalings.Spotlight_Position_Y || 10000
//(nda.scalings.Spotlight_Intensity || 0)/255