
import React, {Component} from 'react'
import StreamrMapLib from 'imports?window.StreamrMap!../../libs/streamr-map/streamr-map.js'

export default class StreamrMap extends Component {
    constructor() {
        super()
        new StreamrMapLib()
    }
    render() {
        return (
            <div></div>
        )
    }
}