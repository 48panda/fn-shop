import logo from './logo.svg';
import './App.css';
import FortniteItem from './Item';
import React from 'react';
import $, { data } from 'jquery';
import Section from './Section';

var _ = require('underscore');

class App extends React.Component {
  constructor(){
    super()
    this.state={data:{}}
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
      let tileSizes={Normal:[xnormal,yheight],Small:[xnormal,Math.floor((yheight-yspacesmall)/2)],DoubleWide:[xnormal*2+xspace,yheight]}
      data.items=Object.values(_.groupBy(data.items,x=>x.section.id)).sort((a,b)=>a[0].section.index-b[0].section.index).map(x=>x.sort((b,a)=>a.sortPriority-b.sortPriority))
      for (const j of data.items){
        for (const i of j) {
        let yoffset=0
        if (old_section!==i.section.id){
          old_section=i.section.id
          if (!first){
            xpos=0
            ypos+=tileSizes["Normal"][1]+yspacebig
            smallTileParity=0
          }
        }
        if (i.tileSize === "Small"){yoffset=smallTileParity*(tileSizes["Small"][1]+yspacesmall)}
        i.x = xpos
        i.y = ypos+yoffset
        i.size = tileSizes[i.tileSize]
        if (i.tileSize === "Small"){smallTileParity=1-smallTileParity
          if (smallTileParity===0){xpos+=tileSizes[i.tileSize][0]+xspace}}
        else{xpos+=tileSizes[i.tileSize][0]+xspace}
        first=false
      }}
      
      console.log(data)
      this.setState({data:data})
    });
  }
  render(){
    return (
      <div className="App">
        {this.state.data.items?this.state.data.items.map(x=><Section items={x.sort((b,a)=>a.sortPriority-b.sortPriority).map(y=><FortniteItem data={y} />)} />):<></>}
      </div>
    );
  }
}

export default App;
