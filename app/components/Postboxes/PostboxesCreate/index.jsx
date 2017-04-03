import React, {Component} from 'react'
import {Row, Col, FormGroup, Form, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {replace} from 'react-router-redux'
import {createPostbox} from '../../../actions/postbox'

class PostboxesCreate extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            description: new Date(),
            gLocation: '',
            owner: null
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillMount() {
        this.props.dispatch(getAllPostboxes())
        this.props.location.state && this.setState({
            ...this.state,
            ...this.props.location.state
        })
    }
    handleInputChange(e) {
        const changedPart = {
            [e.target.name]: e.target.value
        }
        this.setState({
            ...this.state,
            ...changedPart
        })
        this.props.dispatch(replace({
            ...this.props.location,
            state: {
                ...this.props.location.state,
                ...changedPart
            }
        }))
    }
    handleSubmit(e) {
        e.preventDefault()
        this.props.dispatch(createPostbox(this.state))
    }
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
                            <FormControl
                                name="name"
                                onChange={this.handleInputChange}
                                value={this.state.name}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                name="description"
                                onChange={this.handleInputChange}
                                value={this.state.description}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Location</ControlLabel>
                            <FormControl
                                name="gLocation"
                                onChange={this.handleInputChange}
                                value={this.state.location}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Owner</ControlLabel>
                            <FormControl
                                name="owner"
                                onChange={this.handleInputChange}
                                value={this.state.owner}
                            />
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
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    location: React.PropTypes.string
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, null)(PostboxesCreate)