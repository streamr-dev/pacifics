import React, {Component} from 'react'
import {Link} from 'react-router'
import {Row, Col, FormGroup, Form, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {replace} from 'react-router-redux'
import {createDelivery} from '../../../actions/delivery'
import moment from 'moment'
import DateTime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

class DeliveryCreate extends Component {
    constructor() {
        super()
        this.state = {
            senderPostbox: '0x3878376aEB446B70066eE8F58db9942B4b11D01F',    // TODO: get post box address
            receiverPostbox: '0xa1B20149df843f9aB57f5C8D142a18c2f5587f0c',  // TODO: get post box address
            receiverAddress: '0x26aa20a3ca450537f1bb5b037facd513c723153b',
            canStartAfter: new Date(),
            depositUnlockedAfter: new Date(),
            deposit: 0,
            deliveryDeadline: new Date()
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
    
    handleDateChange(name, momentDate) {
        this.handleInputChange({
            target: {
                value: momentDate.toDate(),
                name
            }
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.dispatch(createDelivery(this.state, this.props.parcel.address))
    }
    
    render() {
        const createDatePicker = name => (
            <DateTime
                inputProps={{
                    name: name
                }}
                defaultValue={moment(this.state[name])}
                onChange={date => {
                    this.handleDateChange(name, date)
                }}
                dateFormat="MM-DD-YYYY"
                timeFormat="HH:mm:ss z"
                utc={true}
            />
        )
        const postboxCreateUrl = `/postboxes/create?parcelAddress=${this.props.parcel ? this.props.parcel.address : '' }`
        
        return (
            <Row>
                <Form onSubmit={this.handleSubmit}>
                    <Col xs={12}>
                        <h2>New Delivery</h2>
                        <Row>
                            <Col xs={2}>
                                <label>Parcel:</label>
                            </Col>
                            <Col xs={8}>
                                {this.props.parcel &&
                                    <Link to={`parcels/${this.props.parcel.address}`}>
                                        {this.props.parcel.name}
                                    </Link>
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={4}>
                        <h4>From Postbox</h4>
                        <FormGroup>
                            <Link to={postboxCreateUrl}>
                                <Button>
                                    New Postbox
                                </Button>
                            </Link>
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
                            {createDatePicker('canStartAfter')}
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Deposit unlocked after</ControlLabel>
                            {createDatePicker('depositUnlockedAfter')}
                        </FormGroup>
                    </Col>
                    <Col xs={4}>
                        <h4>To Postbox</h4>
                        <FormGroup>
                            <Link to={postboxCreateUrl}>
                                <Button>
                                    New Postbox
                                </Button>
                            </Link>
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
                            {createDatePicker('deliveryDeadline')}
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
    parcel: React.PropTypes.object
}

const mapStateToProps = (state, props) => {
    return {
        postboxes: state.postboxes ? state.postboxes.postboxes : [],
        user: state.user.user,
        parcel: state.parcels && state.parcels.list.find(p => p.address === props.params.address)
    }
}

export default connect(mapStateToProps, null)(DeliveryCreate)