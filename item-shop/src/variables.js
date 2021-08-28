import $ from 'jquery'
import Cookie from 'universal-cookie'
var cookie = new Cookie();

let state={owned:[],mappings:[],settings:{allowCookies:cookie.get("allowCookies")==="true",showLastSeen:cookie.get("showLastSeen")==="true",trackOwned:cookie.get("trackOwned")==="true"}}
const arrayToObject = (arr, key) => Object.assign({}, ...arr.map(item => ({[item[key].toLowerCase()]: item})))

$.getJSON('/mappings.json').then(data=>{state.mappings=data.data
if (state.settings.trackOwned) {
    state.owned=state.fromLocalStorage(localStorage.getItem("OwnedItems"))
}

}
)
$.getJSON('https://fortnite-api.com/cosmetics/br').then(data =>{
  state.all = arrayToObject(data.data,"id")
  console.log(state.all)
})
state.idFromItem=item=>state.mappings.indexOf(item)
state.itemFromId=id=>state.mappings[id]

const group=arr=>arr.map((e,i)=>i%6===0 ? arr.slice(i,i+6) : null).filter(e=>e)
state.digits="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
state.fromLocalStorage=function(data) {
    return [].concat.apply([],data.split("").map(i=>state.digits.indexOf(i).toString(2).padStart(6,"0").split(""))).map((v,i)=>v==="1"?state.mappings[i]:null).filter(e=>e)
}
state.toLocalStorage=function(data) {
    let indexes = data.map(i=>state.mappings.indexOf(i))
    let newData = new Array(Math.ceil(state.mappings.length/6)*6).fill(0);
    indexes.forEach(i=>newData[i]=1)
    newData[511]=1
    newData[1542]=1
    newData[2243]=1
    newData[3209]=1
    return group(newData).map(i=>state.digits[parseInt(i.join(""),2)]).join("")
}

export default state