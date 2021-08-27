import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './colors.css';
import './Items.css';
import './owned.css';

import './marvel.css';
import './dc.css';
import './icon.css';

import './legendary.css';
import './epic.css';
import './rare.css';
import './uncommon.css';
import './common.css';
import './gaminglegends.css';

import './images/MarvelMaskR.png'
import './images/MarvelMaskG.png'
import './images/NoiseR.png'
import './images/NoiseG.png'
import './images/NoiseB.png'

import FNRouter from './router';
import $ from 'jquery'
let state = require('./variables.js')

let last = +new Date();
let Section = 0;
/*
window.onscroll = function (e) {
  let app = document.getElementById("App")
  let section = Math.round(window.scrollY/60)
  console.log(section)
  app.style.transform = `translateY(${-(section * 650)}px)`
  window.scrollTo({top:section*60})
  } */
$('*').on('wheel', function(event) {
  if (!document.getElementById("App")) {return null}
    var delta = {
      x: event.originalEvent.deltaX, 
      y: event.originalEvent.deltaY
    };
    let now = +new Date();
   
    if (delta.y != 0) {
      if (now-last>500) {
        last = now
        let ud = Math.round(delta.y / Math.abs(delta.y))
        Section = Section + ud
        console.log(Section,window.scrollY)
        Section = Math.max(0,Section)
        Section = Math.min(Section, $("#App").children().length - 1)
        }
        let app = document.getElementById("App")
        app.style.transform = `translateY(${-(Section * 650)}px)`
        window.scrollTo({top:Section*100})
    }
  });

ReactDOM.render(
  <React.StrictMode>
    <FNRouter/>
  </React.StrictMode>,
  document.getElementById('root')
);