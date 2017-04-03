import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import styles from './app-styles.pcss'

class App extends Component {
    render() {
        return (
            <div className={['container', styles.appContainer].join(' ')}>
                {/*Nav?*/}
                {this.props.children}
                {/*Footer?*/}
            </div>
        )
    }
}

App.propTypes = {
    user: React.PropTypes.object,
    children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.arrayOf(React.PropTypes.element)])
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, null)(App)