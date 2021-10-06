import React, { Component } from 'react'
import NavBar from './navbar'

import state from './variables'
import Select from 'react-select'

import './claim.css'

import LockerIcon from './lockericon'

export class ClaimPage extends Component {
    constructor(props) {
        super(props)
        state.callAfterAllLoaded=()=>setTimeout(()=>this.setState({render:this.state.render+1}),2000)

        this.state = {
            render: 0,
            filters:{
                series:null,
                set:null,
                season:null,
                type:null,
                source:null
            },
            matches:[]
        }
        this.Change = this.Change.bind(this)
        this.search = this.search.bind(this)
        this.finish = this.finish.bind(this)
        this.remove = this.remove.bind(this)
    }
    finish() {
        state.owned=state.owned.concat(this.state.matches.map(e=>e.id)).sort(state.sortorder).filter(e=>e)
        state.owned=[...new Set(state.owned.map(e=>e.toLowerCase()))];
        localStorage.setItem("OwnedItems",state.toLocalStorage(state.owned))
        this.setState({matches:[]})
    }
    remove() {
        state.owned=state.owned.filter(e=>!this.state.matches.map(e=>e.id).includes(e)).sort(state.sortorder).filter(e=>e)
        localStorage.setItem("OwnedItems",state.toLocalStorage(state.owned))
        this.setState({matches:[]})
    }
    Change(e,id) {
        var filters = {...this.state.filters}
        filters[id] = (e||{}).value||null;
        this.setState({filters})
    }
    search() {
        console.log(this.state.filters.type)
        this.setState({matches:Object.values(state.all)
            .filter(e=>this.state.filters.series===null || e.rarity===this.state.filters.series || e.series===this.state.filters.series)
        .filter(e=>this.state.filters.set===null || this.state.filters.set===e.set)
        .filter(e=>this.state.filters.season===null || (e.gameplayTags&&e.gameplayTags.includes(`Cosmetics.Filter.Season.${this.state.filters.season}`)))
        .filter(e=>this.state.filters.type===null || (e.type&&(e.type===this.state.filters.type)))
        .filter(e=>this.state.filters.source===null || (e.gameplayTags&&e.gameplayTags.join().includes(this.state.filters.source)))
    })
    }
    render() {
        if (!state.filters) {return null}
        console.log(this.state.matches)
        return (
            <div id="somewhitespace">
                <NavBar selected="claim"/>
                <div id="center">
                    
                    <label>
                    <Select options={state.filters.series} isSearchable={false} placeholder={"No Rarity Filter."} isClearable={true} onChange={e=>this.Change(e,"series")}/>
                    <p>Filter by Rarity</p>
                    </label>
                    <label>
                    <Select options={state.filters.set} isSearchable={true} placeholder={"No Set Filter."} isClearable={true} onChange={e=>this.Change(e,"set")}/>
                    <p>Filter by Set</p>
                    </label>
                    <label>
                    <Select options={state.filters.seasons} isSearchable={false} placeholder={"No Season Filter."} isClearable={true} onChange={e=>this.Change(e,"season")}/>
                    <p>Filter by Season</p>
                    </label>
                    <label>
                    <Select options={state.filters.type} isSearchable={false} placeholder={"No Type Filter."} isClearable={true} onChange={e=>this.Change(e,"type")}/>
                    <p>Filter by Type</p>
                    </label>
                    <label>
                    <Select options={state.filters.source} isSearchable={false} placeholder={"No source Filter."} isClearable={true} onChange={e=>this.Change(e,"source")}/>
                    <p>Filter by Source</p>
                    </label>
                <button id="search" onClick={this.search}>Search</button>
                </div>
                {this.state.matches?this.state.matches.map(e=><button style={{width:0}} onClick={(e)=>{e.preventDefault();console.log("hi!");this.setState({matches:this.state.matches.filter(i=>i!==e)})}}><LockerIcon data={e}/></button>):null}
                {this.state.matches.length!==0?<button onClick={this.finish} className="yes" style={{width:"100vw",height:"fit-content"}}><h1>Add all of these to my locker.</h1></button>:null}
                {this.state.matches.length!==0?<button onClick={this.remove} className="no" style={{width:"100vw",height:"fit-content"}}><h1>Remove all of these from my locker.</h1></button>:null}

            </div>
        )
    }
}

export default ClaimPage
