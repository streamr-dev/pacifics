import React, {Component, PropTypes} from 'react'
import {Row, Col, Panel, Table, Breadcrumb, ListGroup, ListGroupItem} from 'react-bootstrap'
import {connect} from 'react-redux'
import {AgeLabel} from '../../Util/Labels'

class ParcelTrack extends Component {
    
    render() {
        const events = this.props.parcel.events ? this.props.parcel.events.sort((a, b) => b.time.getTime() - a.time.getTime()) : []
        const photos = this.props.parcel.photos || []
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
                    <h1>
                        {this.props.parcel.name || ''}
                    </h1>
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
                                    <td><AgeLabel date={e.time}/></td>
                                    <td>{e.event}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Panel>
                </Col>
                <Col xs={12} md={6}>
                    <Panel header="Current delivery">
                        <a href={`https://ropsten.etherscan.io/address/${this.props.parcel.LastContractAddress}`}>
                            {this.props.parcel.LastContractAddress}
                        </a>
                    </Panel>
                </Col>
                <Col xs={12} md={6}>
                    <Panel header="Parcel location">
                        <streamr-map
                            url={'https://eth.streamr.com/api/v1/canvases/Zac64v1SQzy7QlHIAm6ecA4a-0NYa5S2ShGkfSQazLAw/modules/1/keys/' + this.props.params.address + '/modules/2'}/>
                    </Panel>
                </Col>
                <Col xs={12} md={6}>
                    <Panel header="Parcel images">
                        <ListGroup>
                            {photos.map(img => (
                                <ListGroupItem href={`/parcels/${this.props.parcel.address}/photos/${img.ipfsHash}`}
                                               key={img.ipfsHash}>
                                    <AgeLabel date={img.createdAt}/>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Panel>
                </Col>
                <Col xs={12} md={6}>
                    <Panel header="Parcel metrics">
                        <streamr-chart
                            url={'https://eth.streamr.com/api/v1/canvases/Zac64v1SQzy7QlHIAm6ecA4a-0NYa5S2ShGkfSQazLAw/modules/1/keys/' + this.props.params.address + '/modules/1'}/>
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