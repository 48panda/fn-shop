import React, { Component } from 'react'
import { bindAll } from 'underscore'

export class FortniteItem extends Component {
    render() {
        console.log(this.props.data)
        if (this.props.data.newDisplayAsset) {
        let nda = this.props.data.newDisplayAsset.materialInstances[0]
        return (<div  className={"item "+this.props.data.tileSize} style={{top:this.props.data.y,left:this.props.data.x}}>
            
            <div style={{
                    background:`radial-gradient(circle ${nda.scalings.Gradient_Size*Math.max(...this.props.data.size)/100}px at ${nda.scalings.Gradient_Position_X}% ${nda.scalings.Gradient_Position_Y}%, ${"#"+nda.colors.Background_Color_B.substring(0,6)},${"#"+nda.colors.Background_Color_A.substring(0,6)})`,
                    }}> </div>
            <div style={{
                background:`radial-gradient(circle ${nda.scalings.Gradient_Size*Math.max(...this.props.data.size)/100}px at ${nda.scalings.Gradient_Position_X}% ${nda.scalings.Gradient_Position_Y}%, ${"#"+nda.colors.Background_Color_B.substring(0,6)},${"#"+nda.colors.Background_Color_A.substring(0,6)})`,
                WebkitMaskImage:`radial-gradient(circle ${nda.scalings.Spotlight_Size*Math.max(...this.props.data.size)/100}px at ${nda.scalings.Spotlight_Position_X}% ${nda.scalings.Spotlight_Position_Y}%, black,transparent)`,
                filter:`brightness(${1+nda.scalings.Spotlight_Intensity/100})`
                }}> </div>
            {nda.scalings["Streak Angle"]?<div className="marvel"></div>:null}
            <div 
            style={{backgroundImage:`url("${nda.images.OfferImage}")`,
            backgroundSize:(((nda.scalings.Scale_Compensation || 0)+nda.scalings.ZoomImage_Percent+200)*this.props.data.size[1]/200)+"px",
            backgroundPositionX:`calc(50% + ${this.props.data.size[0]*nda.scalings.OffsetImage_X/100}px)`,
            backgroundPositionY:`calc(0% + calc(calc(calc(${this.props.data.size[0]*nda.scalings.OffsetImage_Y/100}px + calc(${this.props.data.size[0]*(nda.scalings.OffsetImage_Y_Compensation || 0)/100}px) / 2) - ${(this.props.data.tileSize==="Small" && nda.scalings.OffsetImage_Y_Compensation)?40:0}px))`}}>
            
                {<><br/>
                Y:{nda.scalings.OffsetImage_Y}<br/>
                O:{nda.scalings.OffsetImage_Y_Compensation}<br/>
                </>}
            <div className="rarity"><div className="nameSegment"><p>{(this.props.data.bundle||this.props.data.items[0]).name}</p><div className="cost"></div></div></div></div></div>
        )} else {return null}
    }
}

export default FortniteItem

//nda.scalings.Spotlight_Position_X || 10000
//nda.scalings.Spotlight_Position_Y || 10000
//(nda.scalings.Spotlight_Intensity || 0)/255