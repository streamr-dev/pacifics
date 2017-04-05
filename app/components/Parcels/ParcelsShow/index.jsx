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
                    <h1>{this.props.parcel.name}</h1>
                </Col>
                <Col xs={12}>
                    <Row>
                        <Col xs={2}>
                            <label>Owner</label>
                        </Col>
                        <Col xs={10}>
                            <span>{this.props.parcel.owner}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <label>Currently at</label>
                        </Col>
                        <Col xs={10}>
                            <span>{this.props.parcel.currentlyAt}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <label>Temperature limit</label>
                        </Col>
                        <Col xs={10}>
                            <span>{this.props.parcel.temperatureLimit}</span>
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
                            {this.props.deliveries.forEach((d) => (
                                <tr>
                                    <td>{d.fromPostBox.name}</td>
                                    <td>{d.toPostbox.name}</td>
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

ParcelsShow.propTypes = {
    user: React.PropTypes.object,
    params: React.PropTypes.object,
    deliveries: React.PropTypes.array,
    parcel: React.PropTypes.object,
    dispatch: React.PropTypes.func
}

const mapStateToProps = (state, props) => ({
    user: state.user.user,
    deliveries: state.deliveries.deliveries ? state.deliveries.deliveries.filter(d => d.parcelId === props.params.id) : [],
    parcel: state.parcels.parcels ? state.parcels.parcels.find((p) => p.id === props.params.id) : {}
})

export default connect(mapStateToProps, null)(ParcelsShow)