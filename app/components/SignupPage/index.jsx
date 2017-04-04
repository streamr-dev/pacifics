import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Alert, Col, Table, Panel, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {signup} from '../../actions/user.js'
import {Link} from 'react-router'

class SignupPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            password: ''
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.dispatch(signup(this.state))
    }
    
    checkPasswordSimilarity() {
        this.pwd2Input.setCustomValidity(this.state.password != this.pwd2Input.value ? 'Passwords don\'t match' : '')
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
                {this.props.user ?
                    <Panel header={`Thank you for registering, ${this.props.user.name}!`} bsStyle="success">
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td style={{
                                        fontWeight: 'bold'
                                    }}>Email</td>
                                    <td>{this.props.user.email}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Panel>
                :
                    <Panel header="Signup" footer={<Link to='login'>Login</Link>}>
                        <form id="registerForm" onSubmit={this.handleSubmit} className="form-horizontal">
                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel>Name</ControlLabel>
                                </Col>
                                <Col sm={9}>
                                    <FormControl name="name" type="text" placeholder="Name" onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel>Email</ControlLabel>
                                </Col>
                                <Col sm={9}>
                                    <FormControl name="email" type="email" placeholder="Email" onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel>Password</ControlLabel>
                                </Col>
                                <Col sm={9}>
                                    <FormControl name="password" type="password" placeholder="Password" onChange={e => {
                                        this.handleChange(e)
                                        setTimeout(() => this.checkPasswordSimilarity())
                                    }}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel style={{
                                        textAlign: 'left'
                                    }}>Password again</ControlLabel>
                                </Col>
                                <Col sm={9}>
                                    <FormControl name="password2" type="password" placeholder="Password again" onChange={e => this.checkPasswordSimilarity(e)}
                                                 inputRef={input => this.pwd2Input = input}/>
                                </Col>
                            </FormGroup>
                            <Button type="submit">
                                Sign up
                            </Button>
                        </form>
                    </Panel>
                }
                </Col>
            </div>
        )
    }
}


SignupPage.propTypes = {
    user: React.PropTypes.object,
    router: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired,
    error: React.PropTypes.string
}

const mapStateToProps = state => ({
    user: state.user.user,
    error: state.user.error
})

export default connect(mapStateToProps)(SignupPage)