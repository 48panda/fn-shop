import logo from './logo.svg';
import './App.css';
import React from 'react';
import $, { data } from 'jquery';
import Section from './Section';
import DisplayItem from './DisplayItem';

import FNLink from './FNLink';
import state from './variables';

var _ = require('underscore');
class App extends React.Component {
  constructor(){
    super()
    this.state={data:{},n:0}
    this.rerender=this.rerender.bind(this)
  }
  componentDidMount(){
    console.log("Getting JSON")
    $.getJSON('https://fortnite-api.com/v2/shop/br').then(data=>{
      console.log(data)
      data=data.data
      let noSection = {entries:[]}
      let featured = (data.featured ||noSection).entries
      let daily = (data.daily ||noSection).entries
      let specialFeatured = (data.specialFeatured || noSection).entries
      let specialDaily = (data.specialDaily || noSection).entries
      data.items = [].concat(featured,daily,specialDaily,specialFeatured)
      data.featured=null
      data.daily=null
      data.specialFeatured=null
      data.specialDaily=null
      var xpos=0;
      var ypos=0;
      let old_section=""
      let yspacebig=100
      let yspacesmall=25
      let xspace=25
      let yheight=550
      let xnormal=320
      let smallTileParity=0
      let first=true
      let numSections=0
      let tileSizes={Normal:[xnormal,yheight],Small:[xnormal,Math.floor((yheight-yspacesmall)/2)],DoubleWide:[xnormal*2+xspace,yheight]}
      data.items=Object.values(_.groupBy(data.items,x=>x.section.id)).sort((a,b)=>a[0].section.index-b[0].section.index).map(x=>x.sort((b,a)=>a.sortPriority-b.sortPriority))
      for (const j of data.items){
        for (const i of j) {
        let yoffset=0
        
        if (old_section!==i.section.id){
          old_section=i.section.id
          
          if (!first){
            numSections+=1
            xpos=0
            ypos+=tileSizes["Normal"][1]+yspacebig
            smallTileParity=0
          }
        }
        if (i.tileSize === "Small"){yoffset=smallTileParity*(tileSizes["Small"][1]+yspacesmall)}
        i.x = xpos+50
        i.y = ypos+yoffset+230
        i.size = tileSizes[i.tileSize]
        if (i.tileSize === "Small"){smallTileParity=1-smallTileParity
          if (smallTileParity===0){xpos+=tileSizes[i.tileSize][0]+xspace}}
        else{xpos+=tileSizes[i.tileSize][0]+xspace}
        first=false
      }}
      
      this.setState({data:data,height:numSections*100 + window.innerHeight})
    });
  }
  componentDidUpdate() {
    setTimeout(function() { //Start the timer
      this.setState({n: this.state.n+1}) //After 1 second, set render to true
  }.bind(this), 2000)
  }
  componentWillUnmount() {
    var id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
  }
  rerender() {
    var id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    console.log(state)
    this.forceUpdate()
  }
  render(){
    console.log("RENDER APP")
    let n=this.state.n
    let lastSeen = state.settings.showLastSeen
    return (
      <>
    <div className="tabs">
      <div className="tabin">
        <FNLink href="/options"><p>settings</p></FNLink>
        <FNLink href="/" className="active"><p>item shop</p></FNLink>
        <FNLink href="/locker"><p>locker</p></FNLink>
      </div>
    </div>
      <div id="sizeSetter" style={{height:this.state.height}}>
        <div className="lagreduce">
        <div className="App" id="App">
          {this.state.data.items?this.state.data.items.map((x,i,arr)=><Section data={x[0].section} first={x[0]} last={x[x.length-1]} prevsect={i==0?"":arr[i-1][0].section.name} items={x.sort((b,a)=>a.sortPriority-b.sortPriority).map(y=><DisplayItem render={this.rerender} lastseen={lastSeen} data={y} n={n} first={x[0]} />)} />):<></>}
        </div>
        </div>
      </div>
      </>
    );
  }
}

export default App;
