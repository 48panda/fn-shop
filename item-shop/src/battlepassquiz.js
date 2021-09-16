import React, { Component } from 'react'

import $ from 'jquery'

import state from './variables'

import LockerIcon from './lockericon'

import history from './history'

export class BattlePassQuiz extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:null,
             checkable:null,
             possible:null,
             first:true,
             question:"",
             render:0
        }
        this.nextStep = this.nextStep.bind(this)
        this.finish = this.finish.bind(this)
    }
    async componentDidMount() {
        state.callAfterAllLoaded=()=>this.setState({render:1})
        $.getJSON(`./bp${this.props.match.params.pass}.json`).then(data_=>{
            let data=data_
            data.rewards=data.rewards.filter(e=>e.item.id).filter(e=>e.item.name!=="V-bucks").filter(e=>e.item.type.id!=="misc").filter(e=>e.item.type.id!=="cosmeticvariant").filter(e=>e.item.type.id!=="bannertoken").filter(e=>e.item.type.id!=="itemaccess")
            this.setState({data:data,
                checkable:[...new Set(data.rewards.map(e=>e.tier))],
                possible :[...new Set(data.rewards.map(e=>e.tier))],
                question:data.rewards[data.rewards.length-1],
                first:true,
                level:0,
                finished:false,
                biggestlevel:0
            })
            })
    }
    finish() {
        let toAdd = this.state.data.rewards.filter(e=>e.tier<=this.state.level).map(e=>e.item.id)
        state.owned=state.owned.filter(e=>!this.state.data.rewards.map(e=>e.item.id).includes(e)).concat(toAdd).sort(state.sortorder)
        localStorage.setItem("OwnedItems",state.toLocalStorage(state.owned))
        history.push("/bp")
    }
    nextStep(YesOrNo) {
        if (YesOrNo) {
            //yes
            let newPossible=this.state.possible.filter(e=>e>this.state.question.tier)
            if (newPossible.length===0) {
                console.log(this.state.checkable.concat([101]))
                console.log(this.state.checkable.concat([101]).filter(e=>e>this.state.question.tier))
                this.setState({level:this.state.question.tier,finished:true,biggestlevel:this.state.checkable.concat([101]).filter(e=>e>this.state.question.tier)[0]-1})
            } else {
                this.setState({possible:newPossible,
                first:false,
                question:this.state.data.rewards.filter(e=>e.tier===newPossible[Math.floor(newPossible.length / 2)])[0],
                level:this.state.question.tier})
            }
        } else {
            //no
            let newPossible=this.state.possible.filter(e=>e<this.state.question.tier)
            if (newPossible.length===0) {
                console.log(this.state.checkable.concat([101]))
                this.setState({finished:true,biggestlevel:this.state.checkable.concat([101]).filter(e=>e>this.state.level)[0]-1})
            } else {
                this.setState({possible:newPossible,
                first:false,
                question:this.state.data.rewards.filter(e=>e.tier===newPossible[Math.floor(newPossible.length / 2)])[0]})
            }
        }
    }
    render() {
        if(!this.state.data){return null}
        if(!state.all){return null}
        console.log(this.state.question)
        if(this.state.finished){
            return <div style={{width:"100vw"}} className="allowWrap"><p>That's all!<br/>You reached {this.state.level===this.state.biggestlevel?`Level ${this.state.level}`:"Between levels "+this.state.level+" and "+this.state.biggestlevel} in {this.state.data.displayInfo.chapterSeason}</p>{this.state.data.rewards.filter(e=>e.tier<=this.state.level).map(e=><LockerIcon data={state.all[e.item.id.toLowerCase()]}/>)}<button onClick={this.finish} className="yes" style={{width:"100vw",height:"fit-content"}}><h1>Add all of these to my locker.</h1></button></div>
        }
        return (<div>
            {this.state.first?<p>Check if a series of items are in your locker, and the level you reached in {this.state.data.displayInfo.chapterSeason} Will be calculated. Here's your first question:</p>:null}
            <LockerIcon data={state.all[this.state.question.item.id.toLowerCase()]}/><p>Is "{state.all[this.state.question.item.id.toLowerCase()].name}" in your locker?</p>
            <button className="yes" onClick={e=>this.nextStep(true)}><p>Yes</p></button>
            <button className="no" onClick={e=>this.nextStep(false)}><p>no</p></button>
        </div>)
    }
}

export default BattlePassQuiz

