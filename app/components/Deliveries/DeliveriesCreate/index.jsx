import React, {Component} from 'react'
import {Link} from 'react-router'
import {Row, Col, FormGroup, Form, ControlLabel, FormControl, Button, Alert} from 'react-bootstrap'
import Switch from 'react-bootstrap-switch'
import 'react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css'
import {connect} from 'react-redux'
import {replace} from 'react-router-redux'
import {getAllPostboxes} from '../../../actions/postbox'
import {createDelivery} from '../../../actions/delivery'

class DeliveriesCreate extends Component {
    constructor() {
        super()
        this.state = {
            receiverAddress: '',
            canStartAfter: new Date(),
            depositUnlockedAfter: new Date(),
            depositRequired: null,
            deliveryDeadline: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSwitchChange = this.handleSwitchChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillMount() {
        this.props.dispatch(getAllPostboxes())
        this.props.location.state && this.setState({
            ...this.state,
            ...this.props.location.state
        })
    }
    handleSwitchChange(s, value) {
        this.handleInputChange({
            target: {
                name: 'depositRequired',
                value: value
            }
        })
    }
    handleInputChange(e) {
        const changedPart = {
            [e.target.name]: e.target.value
        }
        this.setState({
            ...this.state,
            ...changedPart
        })
        this.props.dispatch(replace({
            ...this.props.location,
            state: {
                ...this.props.location.state,
                ...changedPart
            }
        }))
    }
    handleSubmit(e) {
        e.preventDefault()
        this.props.dispatch(createDelivery(this.state))
    }
    render() {
        return (
            <Row>
                {this.props.error &&
                <Alert bsStyle="danger">
                    {this.props.error}
                </Alert>
                }
                <Form onSubmit={this.handleSubmit}>
                    <Col xs={12}>
                        <h2>New Delivery</h2>
                        <Row>
                            <Col xs={2}>
                                <label>Parcel:</label>
                            </Col>
                            <Col xs={8}>
                                <label>Parcel1</label>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={4}>
                        <h4>From Postbox</h4>
                        <Button>
                            <Link to="/postboxes/create">
                                New Postbox
                            </Link>
                        </Button>
                        <FormControl componentClass="select" placeholder="select postbox">
                            {this.props.postboxes.map((postbox) => (
                                <option value={postbox.id}>{postbox.name}</option>
                            ))}
                        </FormControl>
                        <FormGroup>
                            <ControlLabel>Receiver address</ControlLabel>
                            <FormControl
                                name="receiverAddress"
                                onChange={this.handleInputChange}
                                value={this.state.receiverAddress}
                                placeholder="0x"
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Can start after</ControlLabel>
                            <FormControl
                                name="canStartAfter"
                                onChange={this.handleInputChange}
                                value={this.state.canStartAfter}
                                type="date"
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Deposit unlocked after</ControlLabel>
                            <FormControl
                                name="depositUnlockedAfter"
                                value={this.state.depositUnlockedAfter}
                                onChange={this.handleInputChange}
                                type="date"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={4}>
                        <h4>From Postbox</h4>
                        <Button>
                            <Link to="/postboxes/create">
                                New Postbox
                            </Link>
                        </Button>
                        <FormControl componentClass="select" placeholder="select postbox">
                            {this.props.postboxes.forEach((postbox) => (
                                <option value={postbox.id}>{postbox.name}</option>
                            ))}
                        </FormControl>
                        <FormGroup>
                            <ControlLabel>Deposit required</ControlLabel>
                            <div>
                                <Switch
                                    name="depositRequired"
                                    value={this.state.depositRequired}
                                    onChange={this.handleSwitchChange}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Delivery deadline</ControlLabel>
                            <FormControl
                                name="deliveryDeadline"
                                type="date"
                                value={this.state.deliveryDeadline}
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <Button type="submit">
                            Create
                        </Button>
                    </Col>
                </Form>
            </Row>
        )
    }
}

DeliveriesCreate.propTypes = {
    location: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    user: React.PropTypes.object,
    params: React.PropTypes.object,
    postboxes: React.PropTypes.arrayOf(React.PropTypes.object),
    error: React.PropTypes.string
}

const mapStateToProps = state => {
    return {
        postboxes: state.postboxes ? state.postboxes.postboxes : [],
        user: state.user.user,
    }
}

export default connect(mapStateToProps, null)(DeliveriesCreate)