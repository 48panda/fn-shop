import React, { Component } from 'react'
import { bindAll } from 'underscore'

export class FortniteItem extends Component {
    render() {
        console.log(this.props.data)
        if (this.props.data.newDisplayAsset) {
        let nda = this.props.data.newDisplayAsset.materialInstances[0]
        return (
            <div className={"item "+this.props.data.tileSize} style={{
                top:this.props.data.y,
                left:this.props.data.x,
                background:`radial-gradient(circle ${(nda.scalings.Spotlight_Size || 1)*Math.min(...this.props.data.size)/100}px at ${nda.scalings.Spotlight_Position_X || 10000}% ${nda.scalings.Spotlight_Position_Y || 10000}%, rgba(255,255,255,${(nda.scalings.Spotlight_Intensity || 0)/255}),transparent),${""
            }radial-gradient(circle ${nda.scalings.Gradient_Size*Math.max(...this.props.data.size)/100}px at ${nda.scalings.Gradient_Position_X}% ${nda.scalings.Gradient_Position_Y}%, ${"#"+nda.colors.Background_Color_B.substring(0,6)},${"#"+nda.colors.Background_Color_A.substring(0,6)})`
                }}> 
            <div 
            style={{backgroundImage:`url("${nda.images.OfferImage}")`,
            backgroundSize:(((nda.scalings.Scale_Compensation || 0)+nda.scalings.ZoomImage_Percent+200)*Math.max(...this.props.data.size)/200)+"px",
            backgroundPositionX:`calc(50% + ${this.props.data.size[0]*nda.scalings.OffsetImage_X/100}px)`,
            backgroundPositionY:nda.scalings.OffsetImage_Y+"%",}}>
            
                {<>{(this.props.data.bundle||this.props.data.items[0]).name}<br/>
                {this.props.data.x+","+this.props.data.y}<br/>
                ZOOM:{nda.scalings.ZoomImage_Percent}<br/>
                SCALE:{nda.scalings.Scale_Compensation}<br/>
                Y:{nda.scalings.OffsetImage_Y}<br/>
                X:{nda.scalings.OffsetImage_X}<br/>
                GRADIENT:{`radial-gradient(circle ${nda.scalings.Gradient_Size*Math.max(...this.props.data.size)}px at ${nda.scalings.Gradient_Position_X}% ${nda.scalings.Gradient_Position_Y}%, ${"#"+nda.colors.Background_Color_B.substring(0,6)},${"#"+nda.colors.Background_Color_A.substring(0,6)})`}</>}
            </div></div>
        )} else {return null}
    }
}

export default FortniteItem
