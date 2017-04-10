import React, {Component} from 'react'
import {Row, Col, Panel, Button, Table} from 'react-bootstrap'
import {Link} from 'react-router'
import FontAwesome from 'react-fontawesome'
import {connect} from 'react-redux'
import styles from './parcelList.pcss'
import commonStyles from '../../../commonStyles.pcss'
import {ClickableTr, ClickableTd} from '../../ClickableTable'

class ParcelList extends Component {
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <h1>My parcels</h1>
                </Col>
                <Col xs={12} className={commonStyles.buttonContainer}>
                    <Link to="/parcels/create">
                        <Button>
                            <FontAwesome name="plus"/> New parcel
                        </Button>
                    </Link>
                </Col>
                <Col xs={12}>
                    <Panel>
                        <Table striped bordered hover className={styles.parcelTable}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Owner</th>
                                    <th>Current holder</th>
                                    <th>Transmission date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.parcels.map(p => (
                                <ClickableTr href={`/parcels/${p.address}`} key={p.address}>
                                    <ClickableTd>{p.name}</ClickableTd>
                                    <ClickableTd>{p.Owner.slice(0, 10)}</ClickableTd>
                                    <ClickableTd>{p.TransmittedTo.slice(0, 10)}</ClickableTd>
                                    <ClickableTd>{p.transmissionDate}</ClickableTd>
                                </ClickableTr>
                            ))}
                            </tbody>
                        </Table>
                        {this.props.fetching && (
                            <div className={styles.spinnerContainer}>
                                <FontAwesome
                                    name="spinner"
                                    size='2x'
                                    pulse
                                />
                            </div>
                        )}
                    </Panel>
                </Col>
            </Row>
        )
    }
}

ParcelList.propTypes = {
    user: React.PropTypes.object,
    children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.arrayOf(React.PropTypes.element)]),
    parcels: React.PropTypes.array,
    fetching: React.PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user.user,
    parcels: state.parcels.parcels || [],
    fetching: Boolean(state.parcels.fetching)
})

export default connect(mapStateToProps, null)(ParcelList)