import React from 'react'
import {Link} from 'react-router'
import styles from './clickableTable.pcss'

export class CTable extends React.Component {
    render() {
        return (
            <div className={`${styles.clickableTable} table`}>
                {this.props.children}
            </div>
        )
    }
}

CTable.propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element)
    ])
}

export class Thead extends React.Component {
    render() {
        return (
            <div className={styles.thead}>
                {this.props.children}
            </div>
        )
    }
}

Thead.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element)
    ])
}

export class Tbody extends React.Component {
    render() {
        return (
            <div className={styles.thead}>
                {this.props.children}
            </div>
        )
    }
}

Tbody.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element)
    ])
}

export class Tr extends React.Component {
    render() {
        return (
            <Link to={this.props.href} className={styles.tr}>
                {this.props.children}
            </Link>
        )
    }
}

Tr.propTypes = {
    href: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element)
    ])
}

export class Th extends React.Component {
    render() {
        return (
            <span className={styles.th}>
                {this.props.children}
            </span>
        )
    }
}

Th.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
    ])
}

export class Td extends React.Component {
    render() {
        return (
            <span className={styles.td}>
                {this.props.children}
            </span>
        )
    }
}

Td.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
    ])
}