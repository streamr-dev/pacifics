import React, {Component} from 'react'
import {Row, Col, FormGroup, Form, ControlLabel, FormControl, Button, Breadcrumb} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {createPostbox} from '../../../actions/postbox'
import serialize from 'form-serialize'
import {replace} from 'react-router-redux'
import FontAwesome from 'react-fontawesome'
import {getAddress} from '../../../../src/user'

class PostboxCreate extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            url: this.props.location.query.parcelAddress ? `/parcels/${this.props.location.query.parcelAddress}/deliveries/create` : '/'
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        const form = serialize(e.target, {
            hash: true
        })
        this.props.dispatch(createPostbox(form)).then(() => {
            this.props.dispatch(replace(this.state.url))
        })
    }
    render() {
        return (
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item active>
                        Postboxes
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Create
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Col xs={12}>
                    <h2>New Postbox</h2>
                </Col>
                <Col xs={4}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <ControlLabel>Owner</ControlLabel>
                            <FormControl name="owner" disabled={this.props.fetching} placeholder="0x" defaultValue={getAddress()}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl name="name" disabled={this.props.fetching}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl name="description" disabled={this.props.fetching}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Location</ControlLabel>
                            <FormControl name="location" disabled={this.props.fetching}/>
                        </FormGroup>
                        {this.props.fetching ?
                            <Col xs={12}>
                                <FontAwesome
                                    name="spinner"
                                    size="3x"
                                    pulse
                                />
                                <span style={{
                                    padding: '15px'
                                }}>
                                    Creating postbox
                                </span>
                            </Col>
                            :
                            <FormGroup className="pull-right">
                                <Link to={this.state.url} style={{
                                    marginRight: '10px'
                                }}>
                                    <Button>
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" bsStyle="primary">
                                    Create
                                </Button>
                            </FormGroup>
                        }
                    </Form>
                </Col>
            </Row>
        )
    }
}

PostboxCreate.propTypes = {
    dispatch: React.PropTypes.func,
    postbox: React.PropTypes.object,
    location: React.PropTypes.object,
    fetching: React.PropTypes.bool
}

const mapStateToProps = state => ({
    fetching: Boolean(state.postboxes.fetching)
})

export default connect(mapStateToProps)(PostboxCreate)