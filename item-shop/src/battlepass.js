import React, { Component } from 'react'
import FNLink from './FNLink'

import $ from 'jquery'

import './battlepass.css'
import NavBar from './navbar'

class OneBattlePass extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:null
        }
    }
    async componentDidMount() {
        $.getJSON(`./bp${this.props.pass}.json`).then(data=>{
            this.setState({data:data,
                maxtier:Math.max(...data.rewards.map(e=>e.tier))
            })
            })
    }
    render() {
        if(!this.state.data){return null}
        return (<div>
            <p>{this.state.data.displayInfo.chapterSeason}. Max tier:{this.state.maxtier}<FNLink href={`/bp/findlevel/${this.props.pass}`} className="doQuiz">Find your level</FNLink></p>
        </div>)
    }
}

export class BattlePass extends Component {
    render() {
        return (
            <>
              <NavBar selected="bp" />
              {[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(e=><OneBattlePass pass={e} />)}
            </>
        )
    }
}

export default BattlePass
