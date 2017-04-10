import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import styles from './app-styles.pcss'
import without from 'lodash/without'

class App extends Component {
    render() {
        return (
            <div className={['container', styles.appContainer].join(' ')}>
                {/*Nav?*/}
                {this.props.errors.map(e => (
                    <Alert bsStyle="danger" key={Date.now() + e}>
                        {e}
                    </Alert>
                ))}
                {this.props.children}
                {/*Footer?*/}
            </div>
        )
    }
}

App.propTypes = {
    user: React.PropTypes.object,
    children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.arrayOf(React.PropTypes.element)]),
    errors: React.PropTypes.arrayOf(React.PropTypes.string)
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        // If no errors are defined, errors = []
        errors: without([state.user.error, state.deliveries.error, state.parcels.error, state.postboxes.error], undefined, null)
    }
}

export default connect(mapStateToProps, null)(App)