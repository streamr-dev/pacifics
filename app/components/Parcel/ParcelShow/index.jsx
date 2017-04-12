import React, {Component, PropTypes} from 'react'
import {Row, Col, Button, Panel, Table} from 'react-bootstrap'
import {Link} from 'react-router'
import FontAwesome from 'react-fontawesome'
import {DateLabel, AddressLabel} from '../../Util/Labels'
import {connect} from 'react-redux'
import commonStyles from '../../../commonStyles.pcss'

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
                <Col xs={12} className={commonStyles.buttonContainer}>
                    <Link to={`/parcels/${this.props.params.address}/track`}>
                        <Button>
                            Track Parcel
                        </Button>
                    </Link>
                </Col>
                <Col xs={12}>
                    <h1>Deliveries</h1>
                </Col>
                <Col xs={12} className={commonStyles.buttonContainer}>
                    <Link to={`/parcels/${this.props.params.address}/deliveries/create`}>
                        <Button>
                            <FontAwesome name="plus"/> New Delivery
                        </Button>
                    </Link>
                </Col>
                <Col xs={12}>
                    <Panel>
                        <Table>
                            <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Start</th>
                                <th>Deadline</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/*TODO: change after solidity-getters:getIndexedPropAt works*/}
                            {this.props.deliveries.map(d => (
                                <tr key={d[1]}>
                                    <td>
                                        <AddressLabel address={d[3]}/>
                                    </td>
                                    <td>
                                        <AddressLabel address={d[4]}/>
                                    </td>
                                    <td>
                                        <DateLabel date={d[6]} />
                                    </td>
                                    <td>
                                        <DateLabel date={d[7]} />
                                    </td>
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

const {object, array, func} = PropTypes
ParcelShow.propTypes = {
    user: object,
    params: object,
    deliveries: array,
    parcel: object,
    dispatch: func
}

const mapStateToProps = (state, props) => ({
    user: state.user.user,
    deliveries: state.deliveries.all ? state.deliveries.all.filter(d => d[2] === props.params.address) : [], // TODO: change after solidity-getters:getIndexedPropAt works
    parcel: state.parcels.list && state.parcels.list.find(p => p.address === props.params.address) || {}
})

export default connect(mapStateToProps, null)(ParcelShow)