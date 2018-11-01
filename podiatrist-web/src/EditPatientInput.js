import React from 'react';
import {Input} from "antd";

class EditPatientInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: props.initialValue
        });
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleBlur() {
        this.props.onBlur(this.props.name, this.state.value);
    }

    render() {
        return (
            <Input name={this.props.name} value={this.state.value} onChange={this.handleChange} onBlur={this.handleBlur}/>
        );
    }
}

export default EditPatientInput;