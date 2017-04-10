import React, {Component} from 'react'
import {Row, Col, Button, Panel, Table} from 'react-bootstrap'
import {Link} from 'react-router'
import FontAwesome from 'react-fontawesome'
import {connect} from 'react-redux'

class ParcelShow extends Component {
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <h1>{this.props.parcel.name}</h1>
                </Col>
                <Col xs={12}>
                    <Row>
                        <Col xs={2}>
                            <label>Description</label>
                        </Col>
                        <Col xs={10}>
                            <span>{this.props.parcel.description}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <label>Owner</label>
                        </Col>
                        <Col xs={10}>
                            <span>{this.props.parcel.Owner}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <label>Current holder</label>
                        </Col>
                        <Col xs={10}>
                            <span>{this.props.parcel.TransmittedTo}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <label>Temperature limit</label>
                        </Col>
                        <Col xs={10}>
                            <span>{this.props.parcel.TemperatureLimit}</span>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    <Button>
                        <Link to={`/parcels/${this.props.params.address}/track`}>
                            Track Parcel
                        </Link>
                    </Button>
                </Col>
                <Col xs={12}>
                    <h1>Deliveries</h1>
                </Col>
                <Col xs={12}>
                    <Button>
                        <Link to={`/parcels/${this.props.params.address}/deliveries/create`}>
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
                            {/*TODO: change after solidity-getters:getIndexedPropAt works*/}
                            {this.props.deliveries.map((d) => (
                                <tr key={d[1]}>
                                    <td>{d[3]}</td>
                                    <td>{d[4]}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Panel>
                </Col>
            </Row>
        )
    }
}

ParcelShow.propTypes = {
    user: React.PropTypes.object,
    params: React.PropTypes.object,
    deliveries: React.PropTypes.array,
    parcel: React.PropTypes.object,
    dispatch: React.PropTypes.func
}

const mapStateToProps = (state, props) => ({
    user: state.user.user,
    deliveries: state.deliveries.all ? state.deliveries.all.filter(d => d[2] === props.params.address) : [], // TODO: change after solidity-getters:getIndexedPropAt works
    parcel: state.parcels.current || {}
})

export default connect(mapStateToProps, null)(ParcelShow)