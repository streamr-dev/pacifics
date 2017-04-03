import React, {Component} from 'react'
import {Row, Col, FormGroup, Form, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

class PostboxesCreate extends Component {
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <h2>New Postbox</h2>
                </Col>
                <Col xs={4}>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Location</ControlLabel>
                            <FormControl type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Owner</ControlLabel>
                            <FormControl type="text" />
                        </FormGroup>
                        <Button type="submit">
                            Create
                        </Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

PostboxesCreate.propTypes = {
    user: React.PropTypes.object,
    params: React.PropTypes.object
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, null)(PostboxesCreate)