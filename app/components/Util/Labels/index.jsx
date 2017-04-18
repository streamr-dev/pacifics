
import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import commonStyles from '../../../commonStyles.pcss'

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
            <span title={this.props.address} className={commonStyles.addressLabel}>
                {this.props.name || this.props.address && this.props.address.slice(0, this.props.visibleLength) || '(unknown)'}
            </span>
        )
    }
}

AddressLabel.propTypes = {
    address: string,
    visibleLength: number,
    name: string
}

AddressLabel.defaultProps = {
    visibleLength: Infinity
}
