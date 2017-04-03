import React, {Component} from 'react'
import {Row, Col, Table, Panel, Button} from 'react-bootstrap'
import {Link} from 'react-router'
import FontAwesome from 'react-fontawesome'
import {connect} from 'react-redux'

class ParcelsList extends Component {
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <h1>My parcels</h1>
                </Col>
                <Col xs={12}>
                    <Button>
                        <Link to="/parcels/create">
                            <FontAwesome name="plus"/> New parcel
                        </Link>
                    </Button>
                </Col>
                <Col xs={12}>
                    <Panel>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Current holder</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.parcels.forEach((p) => (
                                <tr>
                                    <td>{p.name}</td>
                                    <td>{p.owner}</td>
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

ParcelsList.propTypes = {
    user: React.PropTypes.object,
    children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.arrayOf(React.PropTypes.element)]),
    parcels: React.PropTypes.array
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        parcels: state.parcels.parcels
    }
}

export default connect(mapStateToProps, null)(ParcelsList)