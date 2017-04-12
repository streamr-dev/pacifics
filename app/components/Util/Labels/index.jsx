
import React, {Component, PropTypes} from 'react'
import moment from 'moment'

export class DateLabel extends Component {
    render() {
        return (
            <span>
                {moment(this.props.date, this.props.inputFormat).format(this.props.outputFormat)}
            </span>
        )
    }
}

const {number, string, oneOfType} = PropTypes
DateLabel.propTypes = {
    date: oneOfType([number, string]).isRequired,
    inputFormat: string,
    outputFormat: string
}

DateLabel.defaultProps = {
    inputFormat: 'X',
    outputFormat: 'MM-DD-YYYY HH:mm:ss z'
}

export class AddressLabel extends Component {
    render() {
        return (
            <span title={this.props.address}>
                {this.props.address.slice(0, this.props.visibleLength)}
            </span>
        )
    }
}

AddressLabel.propTypes = {
    address: string,
    visibleLength: number
}

AddressLabel.defaultProps = {
    visibleLength: Infinity
}
