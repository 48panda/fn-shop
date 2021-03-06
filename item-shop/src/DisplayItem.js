import React, { Component } from 'react'
import FortniteItem from './Item';
import state from './variables';

export class DisplayItem extends Component {
    constructor(props) {
        super(props)
        let isOwned = (target,arr) => target.every(v => arr.includes(v));
        this.state = {
             data:props.data,
             owned:isOwned(props.data.items.map(e=>e.id),state.owned),
             rerender:this.props.render
        }
    this.clicked=this.clicked.bind(this)
    }
    
    clicked() {
        console.log(state.owned)
        console.log(this.state.owned)
        let items=this.state.data.items.map(e=>e.id)
        if (this.state.owned) {
            state.owned = state.owned.filter(e=>!items.includes(e))
        } else {
            state.owned = state.owned.filter(e=>!items.includes(e)).concat(items)
            console.log(state.owned.filter(e=>!items.includes(e)).concat(items))
        }
        state.owned=state.owned.sort(state.sortorder)
        if (state.settings.trackOwned) {
            localStorage.setItem("OwnedItems",state.toLocalStorage(state.owned))
        }
        this.state.rerender()
    }
    componentDidUpdate() {
        let isOwned = (target,arr) => target.every(v => arr.includes(v));
        if (isOwned(this.state.data.items.map(e=>e.id),state.owned)!==this.state.owned) {
            this.setState({owned:isOwned(this.state.data.items.map(e=>e.id),state.owned)})
        }
    }
    render() {
        let banner = this.props.data.banner
        let data = this.props.data
        let history = data.items[0].shopHistory
        let today = new Date()
        today.setUTCHours(0,0,0,0)
        let dateLastSeen = history.length===1?today:new Date(history[history.length-2])
        let lastSeenDays = (today.getTime() - dateLastSeen.getTime()) / (1000 * 3600 * 24)
        let lastSeenString = ""
        if (lastSeenDays === 0) {
            lastSeenString = "New item"
        } else if (lastSeenDays===1){
            lastSeenString = "Yesterday"
        } else {
            lastSeenString = `${lastSeenDays}d ago`
        }
        if (!this.props.lastseen) {
            lastSeenString = ""
        }
        let nda = {scalings:{}}
        const radians_to_degrees = rad => (rad * 180.0) / Math.PI
        if (!this.props.data.newDisplayAsset) {
            return <div onClick={this.clicked}><div  className={`${this.state.owned?"owned ":""}item ${this.props.data.tileSize} ${(this.props.data.items[0].series || {}).backendValue || this.props.data.items[0].rarity.value} ${((this.props.data.items[0].series || {}).backendValue || this.props.data.items[0].rarity.value)==="CreatorCollabSeries"?"doIcon":""}`} style={{
                top:this.props.data.y - this.props.first.y +80,
                left:this.props.data.x - this.props.first.x + 50,
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
                "--gradient-hardness":0,
                "--gradient-color-in":"#89d8ff",
                "--gradient-color-out":"#237fd5",
                "--spotlight-size":nda.scalings.Spotlight_Size || 100,
                "--spotlight-x":nda.scalings.Spotlight_Position_X || -100,
                "--spotlight-y":nda.scalings.Spotlight_Position_Y || -100,
                "--spotlight-strength":nda.scalings.Spotlight_Intensity || 100,
                "--spotlight-hardness":nda.scalings.Spotlight_Hardness || 50,
                "--marvel-angle":radians_to_degrees(nda.scalings["Streak Angle"])+"deg",
                "--last-seen":"'"+lastSeenString+"'"
    
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
            </div>{banner?<div style={{top:this.props.data.y - this.props.first.y+80,left:this.props.data.x - this.props.first.x+50}} className={`banner ${banner.intensity}`}>{banner.value}</div>:null}</div>
        } else {
        return (
            <div onClick={this.clicked}>
                {<FortniteItem owned={this.state.owned} lastSeenString={lastSeenString} index={this.props.n % this.props.data.newDisplayAsset.materialInstances.length} {...this.props}/>}
                {banner?<div style={{top:this.props.data.y - this.props.first.y+80,left:this.props.data.x - this.props.first.x+50}} className={`banner ${banner.intensity}`}>{banner.value}</div>:null}
            </div>
        )}
    }
}

export default DisplayItem
