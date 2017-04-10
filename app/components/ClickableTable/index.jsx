
import React, {Component} from 'react'

export class ClickableTr extends Component {
    render() {
        return (
            <tr>
                {React.Children.map(this.props.children, c => {
                    return React.cloneElement(c, {
                        href: this.props.href
                    })
                })}
            </tr>
        )
    }
}

ClickableTr.propTypes = {
    href: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element)
    ])
}

const tdStyle = {
    padding: 0
}

const aStyle = {
    padding: '8px',
    display: 'block',
    width: '100%',
    height: '100%',
    textDecoration: 'inherit',
    color: 'inherit'
}

export class ClickableTd extends Component {
    render() {
        return (
            <td style={tdStyle}>
                <a href={this.props.href} style={aStyle}>
                    {this.props.children}
                </a>
            </td>
        )
    }
}

ClickableTd.propTypes = {
    href: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element)
    ])
}