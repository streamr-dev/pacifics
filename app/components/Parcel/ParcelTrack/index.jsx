import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {Row, Col, Panel, Table, Breadcrumb} from 'react-bootstrap'
import {addEvents, getParcel} from '../../../actions/parcel'
//import {getAllDeliveries} from '../../../actions/delivery'
import {getBlockDate} from '../../../../src/block'
import {connect} from 'react-redux'
import {getParcelEvents, /*getDeliveryEvents, */unCamelCase} from '../../../../src/eventLog'

class ParcelTrack extends Component {

    constructor(props) {
        super(props)
        this.watcherList = []
    }

    componentDidMount() {
        // pick event properties that are used in render()
        const transformAndAddEvents = events => {
            const eventsP = events.map(e => getBlockDate(parseInt(e.blockNumber)).then(blockDate => ({
                id: e.transactionHash + e.transactionIndex,
                time: new Date(blockDate * 1000),
                event: unCamelCase(e.event)
            })))
            //console.info(ev)
            Promise.all(eventsP).then(ev => this.props.dispatch(addEvents(address, ev)))
        }

        //const address = this.props.parcel && this.props.parcel.address || this.props.location.pathname.split('/')[1]
        const address = this.props.location.pathname.split('/')[1]
        const getParcelP = this.props.dispatch(getParcel(address))      // needed in render()

        const parcelP = getParcelEvents(address).then(transformAndAddEvents)

        // const deliveries = this.props.deliveries
        // const getDeliveriesP = deliveries && deliveries.length ? Promise.resolve(deliveries) : this.props.dispatch(getAllDeliveries())
        // const deliveryP = getDeliveriesP.then(ds => Promise.all(ds.map(d => {
        //     const deliveryAddress = d[1] // TODO: changes after solidity-getters:getIndexedPropAt works
        //     return getDeliveryEvents(deliveryAddress).then(transformAndAddEvents)
        // })))

        // All parcel events: "PostboxCreated", "DeliveryContractCreated", "ContractSigned", "StreamsSet", "ParcelSent", "ParcelTaken", "ParcelDelivered", "ParcelReceived"
        //this.watcherList.push(watchParcelEvent(address, 'ParcelSent', (...args) => {
        //    console.log(args)
        //}))

        Promise.all([getParcelP, parcelP/*, deliveryP*/]).catch(e => {
            console.error(e)
        })
    }

    componentWillUnmount() {
        this.watcherList.forEach(w => {
            w.stopWatching()
        })
        this.watcherList = []
    }

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
                                    <th>Time</th>
                                    <th>Event</th>
                                </tr>
                            </thead>
                            <tbody>
                            {events.map(e => (
                                <tr key={e.id}>
                                    <td>{moment.duration(moment().diff(moment(e.time))).asDays() < 5 ? moment(e.time).fromNow() : moment(e.time).format('MM-DD-YYYY HH:mm')}</td>
                                    <td>{e.event}</td>
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

const {object, func, array} = PropTypes
ParcelTrack.propTypes = {
    user: object,
    params: object,
    parcel: object,
    dispatch: func,
    deliveries: array,
    location: object
}

const mapStateToProps = ({user, parcels, deliveries}, props) => ({
    user: user.user,
    parcel: parcels.list ? (parcels.list.find(i => i.address === props.params.address) || {}) : {},
    deliveries: deliveries.list ? deliveries.list.filter(d => d[2] === props.params.address) : [], // TODO: change after solidity-getters:getIndexedPropAt works
})

export default connect(mapStateToProps, null)(ParcelTrack)