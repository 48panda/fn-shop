import React, { Component } from 'react'
import FNLink from './FNLink';
import state from './variables';
import LockerIcon from './lockericon';

import Cookie from 'universal-cookie'

import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';

import './locker.css';
import './search.css';

import history from './history';
import NavBar from './navbar';

var cookie = new Cookie();

function fuzzySearch(options) {
  const fuse = new Fuse(options, {
      keys: ['name', 'groupName', 'items.name'],
      threshold: 0.3,
  });

  return (value) => {
      if (value.length < 2) {
          return [];
      }

      return fuse.search(value);
  };
}
class LockerLink extends Component {
  constructor() {
      super()
      this.linkClicked = this.linkClicked.bind(this)
  }
  linkClicked(e) {
      e.preventDefault()
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      console.log(`locker.selected.${this.props.parent.props.store}`, this.props.id)
      cookie.remove(`locker.selected.${this.props.parent.props.store}`, { path: '/' });
      cookie.set(`locker.selected.${this.props.parent.props.store}`, this.props.id, { path: '/' ,expires:nextYear});
      state.selected[this.props.parent.props.store] = this.props.id
      history.push(this.props.href)
  }
  render() {
      return (
          <a onClick={this.linkClicked} href={this.props.href} className={this.props.className} style={this.props.style}>
              {this.props.children}
          </a>
      )
  }
}
export class Locker extends Component {
  constructor(props) {
    super(props)
    state.callAfterAllLoaded=()=>setTimeout(()=>this.setState({render:this.state.render+1}),1000)
    this.state = {
       all:{},
       owned:[],
       toAdd:"",
       selected:{skin:"CID_764_Athena_Commando_F_Loofah",backbling:"BID_527_Loofah",pickaxe:"Pickaxe_ID_399_LoofahFemale1H",glider:"Glider_ID_118_Squishy",contrail:"Trails_ID_088_Informer",emote1:"EID_Loofah",emote2:"EID_Loofah",emote3:"EID_Loofah",emote4:"EID_Loofah",emote5:"EID_Loofah",emote6:"EID_Loofah",wrap:"Wrap_263_RainbowLava",music:"MusicPack_065_FortlishRap",loadingscreen:"LSID_120_Ashton"},
       type:""
      }
    this.setToAdd=this.setToAdd.bind(this)
    this.updateToAdd=this.updateToAdd.bind(this)
    this.removeToAdd=this.removeToAdd.bind(this)
  }
  updateToAdd(e) {
    console.log(e)
    this.setState({toAdd:e})
  }
  setToAdd(e) {
    state.owned.push(this.state.toAdd)
    this.setState({toAdd:""})
    state.owned=state.owned.sort(state.sortorder)
    if (state.settings.trackOwned) {
      localStorage.setItem("OwnedItems",state.toLocalStorage(state.owned))
      console.log(state.owned)
      console.log(state.toLocalStorage(state.owned))
    }

  }
  removeToAdd(e) {
    state.owned=state.owned.filter(e=>e.toLowerCase()!==this.state.toAdd.toLowerCase())
    this.setState({toAdd:""})
    state.owned=state.owned.sort(state.sortorder)
    if (state.settings.trackOwned) {
      localStorage.setItem("OwnedItems",state.toLocalStorage(state.owned))
      console.log(state.owned)
      console.log(state.toLocalStorage(state.owned))
    }
    
  }
  async componentDidMount() {
    console.log("NEW")
    while(!state.hasOwnProperty("all")){
        await new Promise(resolve => setTimeout(resolve, 1000))}
        while(!state.hasOwnProperty("owned")){
        await new Promise(resolve => setTimeout(resolve, 1000))}
        while(!state.hasOwnProperty("selected")){
        await new Promise(resolve => setTimeout(resolve, 1000))}
        console.log("RENDER")
      this.setState({all:state.all,owned:state.owned,selected:state.selected})
  }
  async componentDidUpdate() {
    if(this.state.type!==this.props.type) {
      this.setState({type:this.props.type})
    }
  }
    render() {
      console.log(state.owned)
      let storelist=["skin","backbling","pickaxe","glider","contrail","emote1","emote2","emote3","emote4","emote5","emote6","wrap","music","loadingscreen"]
      let biglist=["skin","backbling","pickaxe","glider","contrail"]
      let breakafter=["contrail","emote6"]
      if(!state.all){return null}
      console.log(state)
        return (
            <div className="lockerpage">
              <NavBar selected="locker" />
              <div className="lockerItems">
               {this.props.type?state.owned.map(e=>{let a=state[this.props.type][e.toLowerCase()];if(!a){return null}return <LockerLink key={e} parent={{props:this.props}} id={e} href="/locker"><LockerIcon key={e} data={a} /></LockerLink>}).filter(e=>e):
               <>{storelist.map(e=><div key={e}><FNLink href={`/locker/${e}`}><LockerIcon mainscreen small={!biglist.includes(e)} data={state.all[state.selected[e].toString().toLowerCase()]}/></FNLink>{breakafter.includes(e)?<br key={`${e}.br`}/>:null}</div>)}
               <div className="searcher"><SelectSearch emptyMessage="No cosmetics fit the search. For performance reasons, no results are shown for empty or single-character searches." filterMaxResults={1} options={state.keys} search filterOptions={fuzzySearch} placeholder="Select a Skin" value={this.state.toAdd} onChange={this.updateToAdd}/></div>
               {(this.state.toAdd&&!state.owned.map(e=>e.toLowerCase()).includes(this.state.toAdd.toLowerCase()))?<button onClick={this.setToAdd}>Add cosmetic</button>:null}
               {(this.state.toAdd&&state.owned.map(e=>e.toLowerCase()).includes(this.state.toAdd.toLowerCase()))?<button className="red" onClick={this.removeToAdd}>Remove cosmetic</button>:null}</>}
              </div>
              
            </div>
        )
    }
}

export default Locker
