import React, {Component} from 'react'
import {Row, Col, Panel, Button, Table} from 'react-bootstrap'
//import {CTable, Tbody, Thead, Th, Tr, Td} from '../../ClickableTable'
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
                        {/*<CTable striped bordered hover>*/}
                            {/*<Thead>*/}
                                {/*<Tr>*/}
                                    {/*<Th>Name</Th>*/}
                                    {/*<Th>Current holder</Th>*/}
                                {/*</Tr>*/}
                            {/*</Thead>*/}
                            {/*<Tbody>*/}
                            {/*{this.props.parcels.map(p => (*/}
                                {/*<Tr href={`/parcels/${p.id}`} key={p.id}>*/}
                                    {/*<Td>{p.name}</Td>*/}
                                    {/*<Td>{p.owner}</Td>*/}
                                {/*</Tr>*/}
                            {/*))}*/}
                            {/*</Tbody>*/}
                        {/*</CTable>*/}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Current holder</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.parcels.map(p => (
                                <tr href={`/parcels/${p.id}`} key={p.id}>
                                    <td>
                                        <Link to={`parcels/${p.id}`}>
                                            {p.name}
                                        </Link></td>
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

const mapStateToProps = state => ({
    user: state.user.user,
    parcels: state.parcels.parcels || []
})

export default connect(mapStateToProps, null)(ParcelsList)