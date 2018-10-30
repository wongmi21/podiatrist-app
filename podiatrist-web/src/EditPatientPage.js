import React from 'react';

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Input, Form} from "antd";
import {editPatient, getPatientData} from "./util/APIUtils";

class EditPatientPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: null,
            nric: null,
            sex: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getPatientData(this.props.match.params.id)
            .then(response => {
                this.setState({
                    id: response.id,
                    name: response.name,
                    nric: response.nric,
                    sex: response.sex
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        editPatient({
            id: this.state.id,
            name: this.state.name,
            nric: this.state.nric,
            sex: this.state.sex
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                sm: { span: 2 }
            },
            wrapperCol: {
                sm: { span: 10 }
            }
        };

        return (
            <div >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="ID"
                    >
                        <Input name='id' disabled value={this.state.id} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Name"
                    >
                        <Input name='name' value={this.state.name} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="NRIC"
                    >
                        <Input name='nric' value={this.state.nric} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Sex"
                    >
                        <Input name='sex' value={this.state.sex} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(EditPatientPage));