import React, {Component} from 'react'
import {Row, Col, FormGroup, Form, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {replace} from 'react-router-redux'
import {createParcel} from '../../../actions/parcel'

class ParcelsCreate extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            description: new Date(),
            owner: '',
            temperatureLimit: 0
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillReceiveProps() {   // TODO: currently this won't update the address into UI
        this.setState({
            owner: this.props.user.address
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
    componentWillMount() {
        // This saves the form state
        this.props.location.state && this.setState({
            ...this.state,
            ...this.props.location.state
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        this.props.dispatch(createParcel(this.state))
    }
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <h2>New Parcel</h2>
                </Col>
                <Col xs={4}>
                    <Form onSubmit={this.handleSubmit}>
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
                            <ControlLabel>Owner</ControlLabel>
                            <FormControl
                                name="owner"
                                onChange={this.handleInputChange}
                                value={this.state.owner}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Temperature limit</ControlLabel>
                            <FormControl
                                type="number"
                                name="temperatureLimit"
                                onChange={this.handleInputChange}
                                value={this.state.temperatureLimit}
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

ParcelsCreate.propTypes = {
    user: React.PropTypes.object,
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    location: React.PropTypes.object
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, null)(ParcelsCreate)