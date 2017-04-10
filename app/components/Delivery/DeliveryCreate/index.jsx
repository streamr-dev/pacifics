import React, {Component} from 'react'
import {Link} from 'react-router'
import {Row, Col, FormGroup, Form, ControlLabel, FormControl, Button, Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import {replace} from 'react-router-redux'
import {createDelivery} from '../../../actions/delivery'

class DeliveryCreate extends Component {
    constructor() {
        super()
        this.state = {
            senderPostbox: '0x3878376aEB446B70066eE8F58db9942B4b11D01F',    // TODO: get post box address
            receiverPostbox: '0xa1B20149df843f9aB57f5C8D142a18c2f5587f0c',  // TODO: get post box address
            receiverAddress: '0x26aa20a3ca450537f1bb5b037facd513c723153b',
            canStartAfter: '',
            depositUnlockedAfter: '',
            deposit: 0,
            deliveryDeadline: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillMount() {
        this.props.location.state && this.setState({
            ...this.state,
            ...this.props.location.state
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
        this.props.dispatch(createDelivery(this.state, this.props.parcel.address))
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
                                {this.props.parcel ? <Link to={`parcels/${this.props.parcel.address}`}>{this.props.parcel.name}</Link> : ''}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={4}>
                        <h4>From Postbox</h4>
                        <FormGroup>
                            <Button>
                                <Link to="/postboxes/create">
                                    New Postbox
                                </Link>
                            </Button>
                        </FormGroup>
                        <FormGroup>
                            <FormControl componentClass="select" placeholder="select postbox">
                                {this.props.postboxes.map((postbox) => (
                                    <option value={postbox.id} key={postbox.id}>{postbox.name}</option>
                                ))}
                            </FormControl>
                        </FormGroup>
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
                        <h4>To Postbox</h4>
                        <FormGroup>
                            <Button>
                                <Link to="/postboxes/create">
                                    New Postbox
                                </Link>
                            </Button>
                        </FormGroup>
                        <FormGroup>
                            <FormControl componentClass="select" placeholder="select postbox">
                                {this.props.postboxes.map((postbox) => (
                                    <option value={postbox.id} key={postbox.id}>{postbox.name}</option>
                                ))}
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Deposit (ETH)</ControlLabel>
                            <FormControl
                                name="deposit"
                                value={this.state.deposit}
                                onChange={this.handleInputChange}
                                min={0}
                                step="any"
                                type="number"
                            />
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

DeliveryCreate.propTypes = {
    location: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    user: React.PropTypes.object,
    params: React.PropTypes.object,
    postboxes: React.PropTypes.arrayOf(React.PropTypes.object),
    error: React.PropTypes.string,
    parcel: React.PropTypes.object
}

const mapStateToProps = state => {
    return {
        postboxes: state.postboxes ? state.postboxes.postboxes : [],
        user: state.user.user,
        parcel: state.parcels.current
    }
}

export default connect(mapStateToProps, null)(DeliveryCreate)