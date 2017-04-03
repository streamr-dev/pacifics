import React, {Component} from 'react'
import {Row, Col, Panel, Table} from 'react-bootstrap'
import {connect} from 'react-redux'

class ParcelsTrack extends Component {
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <h1>Parcel1</h1>
                </Col>
                <Col xs={12} md={6}>
                    <h1>Event log</h1>
                    <Panel>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sent</td>
                                    <td>2017-03-15 14:30:31</td>
                                </tr>
                                <tr>
                                    <td>Taken</td>
                                    <td>2017-03-15 14:31:31</td>
                                </tr>
                                <tr>
                                    <td>Delivered</td>
                                    <td>1 hour ago</td>
                                </tr>
                                <tr>
                                    <td>Photo added</td>
                                    <td>5 minutes ago</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Panel>
                </Col>
                <Col xs={12} md={6}>
                    <h1>Location</h1>
                    <div style={{
                        height: '300px',
                        background: 'green'
                    }}/>
                </Col>
                <Col xs={12}>
                    <h1>Measurements</h1>
                    <div style={{
                        height: '300px',
                        background: 'green'
                    }}/>
                </Col>
            </Row>
        )
    }
}

ParcelsTrack.propTypes = {
    user: React.PropTypes.object,
    params: React.PropTypes.object
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, null)(ParcelsTrack)