import React, {Component} from 'react'
import {Link} from 'react-router'
import {Row, Col, FormGroup, Form, ControlLabel, FormControl, Button, Breadcrumb} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
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
            .then(() => {
                const url = this.props.location.query.parcelAddress ? `/parcels/${this.props.location.query.parcelAddress}/` : '/'
                this.props.dispatch(replace(url))
            })
    }
    
    render() {
        const createDatePicker = name => (
            <DateTime
                inputProps={{
                    name: name,
                    disabled: this.props.fetching
                }}
                defaultValue={moment(this.state[name])}
                onChange={date => {
                    this.handleDateChange(name, date)
                }}
                dateFormat="MM-DD-YYYY"
                timeFormat="HH:mm:ss z"
            />
        )
        const postboxCreateUrl = `/postboxes/create?parcelAddress=${this.props.parcel ? this.props.parcel.address : '' }`
        
        return (
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        Parcels
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href={`/parcels/${this.props.parcel.address}`}>
                        {this.props.parcel.address}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Deliveries
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Create
                    </Breadcrumb.Item>
                </Breadcrumb>
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
                    <Col xs={12} md={6}>
                        <Row>
                            <Col xs={6}>
                                <h4>From Postbox</h4>
                            </Col>
                            <Col xs={6}>
                                <Link to={postboxCreateUrl} className="pull-right">
                                    <Button bsSize="small">
                                        <FontAwesome name="plus" /> New Postbox
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                        <FormGroup>
                            <FormControl componentClass="select" placeholder="select postbox"
                                         disabled={this.props.fetching}>
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
                                disabled={this.props.fetching}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Can start after</ControlLabel>
                            {createDatePicker('canStartAfter')}
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col xs={6}>
                                <h4>To Postbox</h4>
                            </Col>
                            <Col xs={6}>
                                <Link to={postboxCreateUrl} className="pull-right">
                                    <Button bsSize="small">
                                        <FontAwesome name="plus" /> New Postbox
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                        <FormGroup>
                            <FormControl componentClass="select" placeholder="select postbox" disabled={this.props.fetching}>
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
                                disabled={this.props.fetching}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Delivery deadline</ControlLabel>
                            {createDatePicker('deliveryDeadline')}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        {this.props.fetching ?
                            <div>
                                <FontAwesome
                                    name="spinner"
                                    size="3x"
                                    pulse
                                />
                                <span style = {{
                                    padding: '15px'
                                }}>
                                    Creating delivery
                                </span>
                            </div>
                            :
                            <FormGroup className="pull-right">
                                <Link to={`/parcels/${this.props.parcel.address}`} style={{
                                    marginRight: '10px'
                                }}>
                                    <Button>
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" bsStyle="primary">
                                    Create
                                </Button>
                            </FormGroup>
                        }
                    </Col>
                </Form>
            </Row>
        )
    }
}

const {object, func, arrayOf, bool} = React.PropTypes
DeliveryCreate.propTypes = {
    location: object,
    dispatch: func,
    user: object,
    params: object,
    postboxes: arrayOf(object),
    parcel: object,
    fetching: bool
}

const mapStateToProps = ({postboxes, user, parcels, deliveries}, props) => ({
    postboxes: postboxes.list || [],
    user: user.user,
    parcel: parcels.list && parcels.list.find(p => p.address === props.params.address),
    fetching: Boolean(deliveries.fetching)
})

export default connect(mapStateToProps, null)(DeliveryCreate)