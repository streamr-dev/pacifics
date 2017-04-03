import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import styles from './app-styles.pcss'

class App extends Component {
    render() {
        return (
            <div className={['container', styles.appContainer].join(' ')}>
                {this.props.user && this.props.user.id ?
                    <div>
                        {JSON.stringify(this.props.user)}
                    </div>
                    :
                    <div>
                        <div>No user</div>
                        <div>
                            <Link to="login">Login</Link>
                        </div>
                        <div>
                            <Link to="signup">Signup</Link>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

App.propTypes = {
    user: React.PropTypes.object,
    router: React.PropTypes.object
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, null)(App)