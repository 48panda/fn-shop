import $ from 'jquery'
import Cookie from 'universal-cookie'
var cookie = new Cookie();

let state={all:null,callAfterAllLoaded:()=>null,owned:[],mappings:[],selected:{
    skin:"CID_Random",
backbling:"cid_npc_athena_commando_f_rebirthdefault_henchman",
pickaxe:"DefaultPickaxe",
glider:"DefaultGlider",
contrail:"Trails_Random",
emote1:"eid_dancemoves"
,emote2:"eid_dancemoves",
emote3:"eid_dancemoves",
emote4:"eid_dancemoves",
emote5:"eid_dancemoves",
emote6:"eid_dancemoves",
wrap:"LSID_Random",
music:"LSID_Random",
loadingscreen:"LSID_Random"
},settings:{allowCookies:cookie.get("allowCookies")==="true",showLastSeen:cookie.get("showLastSeen")==="true",trackOwned:cookie.get("trackOwned")==="true"}}
if (state.settings.trackOwned) {
    let storelist=["skin","backbling","pickaxe","glider","contrail","emote1","emote2","emote3","emote4","emote5","emote6","wrap","music","loadingscreen"]
    for (let i of storelist) {
        let id=cookie.get(`locker.selected.${i}`)
        if(id){state.selected[i]=id}
    }
}
const arrayToObject = (arr, key) => Object.assign({}, ...arr.map(item => ({[item[key].toLowerCase()]: item})))
let rarityOrder=['EFortRarity::Common','EFortRarity::Uncommon','EFortRarity::Rare','EFortRarity::Epic','EFortRarity::Legendary','EFortRarity::Mythic']
state.sortorder = (a_,b_)=>{
let a=state.all[a_.toLowerCase()];
let b=state.all[b_.toLowerCase()];
return ((a.series||"z").toLowerCase().localeCompare((b.series||"z").toLowerCase())||
rarityOrder.indexOf(b.backendRarity) - rarityOrder.indexOf(a.backendRarity))||
a.name.toLowerCase().localeCompare(b.name.toLowerCase())}
$.getJSON('https://fortnite-api.com/cosmetics/br').then(data =>{
  state.all = arrayToObject(data.data,"id")
  let names=arrayToObject(data.data,"name")
  let unique = (thing, index, self) => index === self.findIndex((t) => (t.value === thing.value))
  state.filters = {
    series: Object.keys(names).sort().map(e=>{e=names[e];if(!e.description){return null}if(e.type==="banner"){return null}return{label:e.series || e.rarity, value:e.series || e.rarity}}).filter(e=>e).filter(unique),
    seasons:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map(e=>{return {label:`Season ${e}`,value:e}}),
    set: Object.keys(names).sort().map(e=>{e=names[e];if(!e.description){return null}if(e.type==="banner"){return null}return{label:e.set || "No Set", value:e.set || null}}).filter(e=>e).filter(unique),
    type:[{label:"Outfits",value:"outfit"},{label:"Backblings",value:"backpack"},{label:"Pickaxes",value:"pickaxe"},{label:"Gliders",value:"glider"},{label:"Emotes",value:"emote"},{label:"Wraps",value:"wrap"}],
    source:[{label:"Battlepass",value:"BattlePass"},{label:"Item Shop",value:"ItemShop"}]
  }

  state.skins=Object.fromEntries(Object.entries(state.all).filter(([key, value]) => value.type==="outfit"))
  state.backblings=Object.fromEntries(Object.entries(state.all).filter(([key, value]) => value.type==="backpack"||value.type==="pet"||value.type==="petcarrier"))
  state.pickaxes=Object.fromEntries(Object.entries(state.all).filter(([key, value]) => value.type==="pickaxe"))
  state.gliders=Object.fromEntries(Object.entries(state.all).filter(([key, value]) => value.type==="glider"))
  state.contrails=Object.fromEntries(Object.entries(state.all).filter(([key, value]) => value.type==="contrail"))
  state.emotes=Object.fromEntries(Object.entries(state.all).filter(([key, value]) => value.type==="emote"||value.type==="emoji"||value.type==="spray"||value.type==="toy"))
  state.music=Object.fromEntries(Object.entries(state.all).filter(([key, value]) => value.type==="music"))
  state.wraps=Object.fromEntries(Object.entries(state.all).filter(([key, value]) => value.type==="wrap"))
  state.loadingscreens=Object.fromEntries(Object.entries(state.all).filter(([key, value]) => value.type==="loadingscreen"))
  console.log(state.all)
  state.keys =Object.keys(names).sort().map(e=>{e=names[e];if(!e.description){return null}if(e.type==="banner"){return null}return{name:e.name, value:e.id}}).filter(e=>e)
$.getJSON('/fn-shop/mappings.json').then(async data=>{
state.mappings=data.data
if (state.settings.trackOwned) {
    state.owned=state.fromLocalStorage(localStorage.getItem("OwnedItems"))
    state.owned=state.owned.sort(state.sortorder)
}
state.callAfterAllLoaded()

}
)
})


state.idFromItem=item=>state.mappings.indexOf(item)
state.itemFromId=id=>state.mappings[id]

const group=arr=>arr.map((e,i)=>i%6===0 ? arr.slice(i,i+6) : null).filter(e=>e)
state.digits="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
state.fromLocalStorage=function(data) {
    return [].concat.apply([],data.split("").map(i=>state.digits.indexOf(i).toString(2).padStart(6,"0").split(""))).map((v,i)=>v==="1"?state.mappings[i]:null).filter(e=>e)
}
state.toLocalStorage=function(data) {
    let indexes = data.map(i=>state.mappings.map(e=>e.toLowerCase()).indexOf(i.toLowerCase()))
    let newData = new Array(Math.ceil(state.mappings.length/6)*6).fill(0);
    indexes.forEach(i=>newData[i]=1)
    return group(newData).map(i=>state.digits[parseInt(i.join(""),2)]).join("")
}

export default state
