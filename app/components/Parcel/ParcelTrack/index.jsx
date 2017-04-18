import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {Row, Col, Panel, Table} from 'react-bootstrap'
import {addEvent} from '../../../actions/parcel'
import {connect} from 'react-redux'

class ParcelTrack extends Component {
    
    
    // TODO: REMOVE THIS
    componentDidMount() {
        const items = [{
            event: 'Sent',
            time: new Date('2017-03-15 14:30:31'),
            address: 'test'
        },{
            event: 'Taken',
            time: new Date('2017-04-15 14:31:31'),
            address: 'test2'
        },{
            event: 'Delivered',
            time: new Date('2017-03-16 14:31:31'),
            address: 'test3'
        },{
            event: 'Photo added',
            time: new Date('2017-03-17 14:31:31'),
            address: 'test4'
        }]
        const add = i => setTimeout(() => {
            if (i < items.length) {
                if (this.props.parcel && this.props.parcel.address) {
                    this.props.dispatch(addEvent(this.props.parcel.address, items[i]))
                    add(i + 1)
                } else {
                    add(i)
                }
            }
        }, 2000)
        add(0)
    }
    // TODO: REMOVE THIS
    
    
    
    render() {
        const events = this.props.parcel.events ? this.props.parcel.events.sort((a, b) => b.time.getTime() - a.time.getTime()) : []
        return (
            <Row>
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
                    <Panel header="Some map">
                        <streamr-map url='https://eth.streamr.com/api/v1/canvases/xYROIxenRFGDw-33_fU4-wMGzQWiRFTHOQpxJYB-im6w/modules/1' />
                    </Panel>
                </Col>
                <Col xs={12}>
                    <Panel header="Some data">
                        <streamr-chart url='https://eth.streamr.com/api/v1/canvases/xYROIxenRFGDw-33_fU4-wMGzQWiRFTHOQpxJYB-im6w/modules/2' />
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