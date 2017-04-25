import React, {Component, PropTypes} from 'react'
import {Row, Col, Panel, Table, Breadcrumb} from 'react-bootstrap'
import {addEvents, getParcel} from '../../../actions/parcel'
import {getAllDeliveries} from '../../../actions/delivery'
import {connect} from 'react-redux'
import {getParcelEvents, getDeliveryEvents, unCamelCase} from '../../../../src/eventLog'

class ParcelTrack extends Component {

    constructor(props) {
        super(props)
        this.watcherList = []
    }

    componentDidMount() {
        // pick event properties that are used in render()
        const transformAndAddEvents = events => {
            const ev = events.map(e => ({
                id: e.transactionHash + e.transactionIndex,
                blockNumber: parseInt(e.blockNumber),
                event: unCamelCase(e.event)
            }))
            console.log(ev)
            this.props.dispatch(addEvents(address, ev))
        }

        //debugger
        //const address = this.props.parcel && this.props.parcel.address || this.props.location.pathname.split('/')[1]
        const address = this.props.location.pathname.split('/')[1]
        const getParcelP = this.props.dispatch(getParcel(address))      // needed in render()

        const parcelP = getParcelEvents(address).then(transformAndAddEvents)

        const deliveries = this.props.deliveries
        const getDeliveriesP = deliveries && deliveries.length ? Promise.resolve(deliveries) : this.props.dispatch(getAllDeliveries())
        const deliveryP = getDeliveriesP.then(ds => Promise.all(ds.map(d => {
            const deliveryAddress = d[1] // TODO: changes after solidity-getters:getIndexedPropAt works
            return getDeliveryEvents(deliveryAddress).then(transformAndAddEvents)
        })))

        // All parcel events: "PostboxCreated", "DeliveryContractCreated", "ContractSigned", "StreamsSet", "ParcelSent", "ParcelTaken", "ParcelDelivered", "ParcelReceived"
        //this.watcherList.push(watchParcelEvent(address, 'ParcelSent', (...args) => {
        //    console.log(args)
        //}))

        Promise.all([parcelP, deliveryP, getParcelP]).catch(e => {
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
        const events = this.props.parcel.events ? this.props.parcel.events.sort((a, b) => b.blockNumber - a.blockNumber) : []
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
                                    <th>Block #</th>
                                    <th>Event</th>
                                </tr>
                            </thead>
                            <tbody>
                            {events.map(e => (
                                <tr key={e.id}>
                                    <td>{e.blockNumber}</td>
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