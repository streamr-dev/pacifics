import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Alert, Navbar, Nav, NavItem, NavbarBrand, Row} from 'react-bootstrap'
import {Link} from 'react-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import styles from './app-styles.pcss'
import without from 'lodash/without'

class App extends Component {
    render() {
        return (
            <div className={styles.contentWrapper}>
                <Navbar className={styles.header}>
                    <NavbarBrand>
                        <Link to="/" className={styles.navLogo}>
                            <img src="http://pacifics.org/uploads/s/l/4/e/l4ejxqrwsl3p/img/UMNNjRll.png" />
                        </Link>
                    </NavbarBrand>
                    {this.props.user && (
                        <Nav className="pull-right">
                            <NavItem href={`${baseUrl}/logout`} className={styles.navLink}>
                                Log out
                            </NavItem>
                        </Nav>
                    )}
                </Navbar>
                <div className={['container', styles.appContainer].join(' ')}>
                    {this.props.errors.map(e => (
                        <Row key={Date.now() + e}>
                            <Alert bsStyle="danger">
                                {e.message || e}
                            </Alert>
                        </Row>
                    ))}
                    {this.props.children}
                </div>
            </div>
        )
    }
}

App.propTypes = {
    user: React.PropTypes.object,
    children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.arrayOf(React.PropTypes.element)]),
    errors: React.PropTypes.array
}

const mapStateToProps = ({user, deliveries, parcels, postboxes}) => {
    return {
        user: user.user,
        // If no errors are defined, errors = []
        errors: without([user.error, deliveries.error, parcels.error, postboxes.error], undefined, null)
    }
}

export default connect(mapStateToProps, null)(App)