import React, {Component} from 'react'
import {Row, Col, FormGroup, Form, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {createPostbox} from '../../../actions/postbox'
import serialize from 'form-serialize'
import {replace} from 'react-router-redux'
import FontAwesome from 'react-fontawesome'

class PostboxCreate extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        const form = serialize(e.target, {
            hash: true
        })
        this.props.dispatch(createPostbox(form)).then(() => {
            const url = this.props.location.query.parcelAddress ? `/parcels/${this.props.location.query.parcelAddress}/deliveries/create` : '/'
            this.props.dispatch(replace(url))
        })
    }
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <h2>New Postbox</h2>
                </Col>
                <Col xs={4}>
                    <Form onSubmit={this.handleSubmit}>
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
                            <FormGroup>
                                <Button type="submit">
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