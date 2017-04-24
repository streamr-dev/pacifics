import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {Row, Col, Panel, Table, Breadcrumb} from 'react-bootstrap'
import {connect} from 'react-redux'

class ParcelTrack extends Component {
    
    render() {
        const events = this.props.parcel.events ? this.props.parcel.events.sort((a, b) => b.time.getTime() - a.time.getTime()) : []
        return (
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        Parcels
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href={`/parcels/${this.props.parcel.address}`}>
                        {this.props.parcel.address}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Track
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Col xs={12}>
                    <h1>{this.props.parcel.name || ''}</h1>
                </Col>
                <Col xs={12} md={6}>
                    <Panel header="Event log">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Time</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                            {events.map(e => (
                                <tr key={e.event + e.time.toString()}>
                                    <td>{e.event}</td>
                                    <td>{moment.duration(moment().diff(moment(e.time))).asDays() < 5 ? moment(e.time).fromNow() : moment(e.time).format('MM-DD-YYYY HH:mm')}</td>
                                    <td>{e.address}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Panel>
                </Col>
                <Col xs={12} md={6}>
                    <Panel header="Parcel location">
                        <streamr-map url={'https://eth.streamr.com/api/v1/canvases/Zac64v1SQzy7QlHIAm6ecA4a-0NYa5S2ShGkfSQazLAw/modules/1/keys/' + this.props.params.address + '/modules/2'} />
                    </Panel>
                </Col>
                <Col xs={12}>
                    <Panel header="Parcel metrics">
                        <streamr-chart url={'https://eth.streamr.com/api/v1/canvases/Zac64v1SQzy7QlHIAm6ecA4a-0NYa5S2ShGkfSQazLAw/modules/1/keys/' + this.props.params.address + '/modules/1'} />
                    </Panel>
                </Col>
            </Row>
        )
    }
}

const {object, func} = PropTypes
ParcelTrack.propTypes = {
    user: object,
    params: object,
    parcel: object,
    dispatch: func
}

const mapStateToProps = ({user, parcels}, props) => ({
    user: user.user,
    parcel: parcels.list ? (parcels.list.find(i => i.address === props.params.address) || {}) : {}
})

export default connect(mapStateToProps, null)(ParcelTrack)