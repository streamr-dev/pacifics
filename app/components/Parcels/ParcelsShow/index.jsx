import React, {Component} from 'react'
import {Row, Col, Button, Panel, Table} from 'react-bootstrap'
import {Link} from 'react-router'
import FontAwesome from 'react-fontawesome'
import {connect} from 'react-redux'

class ParcelsShow extends Component {
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <h1>Parcel1</h1>
                </Col>
                <Col xs={12}>
                    <Row>
                        <Col xs={2}>
                            <label>Owner</label>
                        </Col>
                        <Col xs={10}>
                            <span>Me</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <label>Currently at</label>
                        </Col>
                        <Col xs={10}>
                            <span>Postbox1</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <label>Temperature limit</label>
                        </Col>
                        <Col xs={10}>
                            <span>10°C</span>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    <Button>
                        <Link to={`/parcels/${this.props.params.id}/track`}>
                            Track Parcel
                        </Link>
                    </Button>
                </Col>
                <Col xs={12}>
                    <h1>Deliveries</h1>
                </Col>
                <Col xs={12}>
                    <Button>
                        <Link to={`/parcels/${this.props.params.id}/deliveries/create`}>
                            <FontAwesome name="plus"/> New Delivery
                        </Link>
                    </Button>
                </Col>
                <Col xs={12}>
                    <Panel>
                        <Table>
                            <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>MyPostbox</td>
                                <td>AnotherPostbox</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Panel>
                </Col>
            </Row>
        )
    }
}

ParcelsShow.propTypes = {
    user: React.PropTypes.object,
    params: React.PropTypes.object
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, null)(ParcelsShow)