import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/user'
import {Link} from 'react-router'
import {Alert, Panel, Col, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.dispatch(login(this.emailInput.value, this.pwdInput.value))
    }
    
    render() {
        return (
            <div className="container">
                <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3} style={{
                    marginTop: '20px'
                }}>
                    {this.props.error &&
                    <Alert bsStyle="danger">
                        {this.props.error}
                    </Alert>
                    }
                    <Panel header="Login" footer={<Link to='signup'>Sign up</Link>}>
                        <form id="registerForm" onSubmit={this.handleSubmit} className="form-horizontal">
                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel>Email</ControlLabel>
                                </Col>
                                <Col sm={9}>
                                    <FormControl name="email" type="email" placeholder="Email"
                                                 inputRef={i => this.emailInput = i}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel>Password</ControlLabel>
                                </Col>
                                <Col sm={9}>
                                    <FormControl name="password" type="password" placeholder="Password"
                                                 inputRef={i => this.pwdInput = i}/>
                                </Col>
                            </FormGroup>
                            <Button type="submit">
                                Login
                            </Button>
                        </form>
                    </Panel>
                </Col>
            </div>)
    }
}

LoginPage.propTypes = {
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    error: React.PropTypes.string
}

const mapStateToProps = state => ({
    user: state.user.user,
    error: state.user.error
})

export default connect(mapStateToProps)(LoginPage)
