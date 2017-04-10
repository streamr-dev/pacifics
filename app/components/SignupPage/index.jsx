import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Col, Table, Panel, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {signup} from '../../actions/user.js'
import {Link} from 'react-router'
import serialize from 'form-serialize'

class SignupPage extends Component {
    
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkPasswordSimilarity = this.checkPasswordSimilarity.bind(this)
    }
    
    handleSubmit(e) {
        e.preventDefault()
        const formObject = serialize(e.target, {
            hash: true
        })
        this.props.dispatch(signup(formObject))
    }
    
    checkPasswordSimilarity() {
        this.pwd2Input.setCustomValidity(this.pwdInput.value != this.pwd2Input.value ? 'Passwords don\'t match' : '')
    }
    
    render() {
        return (
            <div className="container">
                <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3} style={{
                    marginTop: '20px'
                }}>
                    {this.props.user ?
                        <Panel header={`Thank you for registering, ${this.props.user.email}!`} bsStyle="success">
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
                                        <ControlLabel>Email</ControlLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl name="email" type="email" placeholder="Email"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={3}>
                                        <ControlLabel>Password</ControlLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl name="password" type="password" placeholder="Password"
                                                     inputRef={input => this.pwdInput = input}
                                                     onChange={this.checkPasswordSimilarity}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={3}>
                                        <ControlLabel style={{
                                            textAlign: 'left'
                                        }}>Password again</ControlLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl name="password2" type="password" placeholder="Password again"
                                                     onChange={this.checkPasswordSimilarity}
                                                     inputRef={input => this.pwd2Input = input}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={3}>
                                        <ControlLabel>Service</ControlLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl
                                            componentClass="select"
                                            placeholder="select service"
                                            name="serviceId"
                                        >
                                            {this.props.services.map((s) => (
                                                <option key={s.id} value={s.id}>{s.name}</option>
                                            ))}
                                        </FormControl>
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
    services: React.PropTypes.array
}

const mapStateToProps = state => ({
    services: state.services.services || [],
    user: state.user.user
})

export default connect(mapStateToProps)(SignupPage)