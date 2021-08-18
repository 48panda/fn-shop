import React, { Component } from 'react'
import FortniteItem from './Item';

export class DisplayItem extends Component {
    render() {
        return (
            <div>
                {<FortniteItem index={this.props.n % this.props.data.newDisplayAsset.materialInstances.length} {...this.props}/>}
            </div>
        )
    }
}

export default DisplayItem
