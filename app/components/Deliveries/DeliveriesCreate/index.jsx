import React, {Component} from 'react'
import {Row, Col, FormGroup, Form, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

class DeliveriesCreate extends Component {
    render() {
        return (
            <Row>
                <Form>
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
                        <Button>New Postbox</Button>
                        <FormGroup>
                            <ControlLabel>Receiver address</ControlLabel>
                            <FormControl type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Can start after</ControlLabel>
                            <FormControl type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Deposit unlocked after</ControlLabel>
                            <FormControl type="text"/>
                        </FormGroup>
                    </Col>
                    <Col xs={4}>
                        <h4>From Postbox</h4>
                        <Button>New Postbox</Button>
                        <FormGroup>
                            <ControlLabel>Deposit required</ControlLabel>
                            <FormControl type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Delivery deadline</ControlLabel>
                            <FormControl type="text"/>
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
    user: React.PropTypes.object,
    params: React.PropTypes.object
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, null)(DeliveriesCreate)