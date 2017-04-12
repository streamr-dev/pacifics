import React, {Component} from 'react'
import FontAwesome from 'react-fontawesome'

export default class Spinner extends Component {
    render() {
        return (
           <div style={{
               display: this.props.show ? 'block' : 'none'
           }}>
                {this.props.show && (
                    <div style={{
                        padding: '15px',
                        textAlign: 'center'
                    }}>
                        <FontAwesome
                            name="spinner"
                            size='2x'
                            pulse
                        />
                    </div>
                )}
           </div>
        )
    }
}

Spinner.propTypes = {
    show: React.PropTypes.bool
}