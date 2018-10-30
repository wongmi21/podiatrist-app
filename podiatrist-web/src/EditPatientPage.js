import React from 'react';

import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {notification, Button, Input, Form} from "antd";
import {editPatient, getPatientData} from "./util/APIUtils";

import './css/EditPatientPage.css';

class EditPatientPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            pid: null,
            name: null,
            nric: null,
            sex: null,
            phoneNumber: null,
            email: null,
            address: null,
            postalCode: null,
            occupation: null,
            height: null,
            weight: null,
            shoeSize: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getPatientData(this.props.match.params.id)
            .then(response => {
                this.setState({
                    id: response.id,
                    pid: response.pid,
                    name: response.name,
                    nric: response.nric,
                    sex: response.sex,
                    phoneNumber: response.phoneNumber,
                    email: response.email,
                    address: response.address,
                    postalCode: response.postalCode,
                    occupation: response.occupation,
                    height: response.height,
                    weight: response.weight,
                    shoeSize: response.shoeSize
                });
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
            pid: this.state.pid,
            name: this.state.name,
            nric: this.state.nric,
            sex: this.state.sex,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            postalCode: this.state.postalCode,
            occupation: this.state.occupation,
            height: this.state.height,
            weight: this.state.weight,
            shoeSize: this.state.shoeSize
        })
            .then(response => {
                notification.success({
                    message: 'Podiatrist App',
                    description: response.message
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                sm: { span: 3 }
            },
            wrapperCol: {
                sm: { span: 13 }
            }
        };

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="ID"
                    >
                        <Input name='id' disabled value={this.state.id} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Patient ID"
                    >
                        <Input name='pid' value={this.state.pid} onChange={this.handleInputChange}/>
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
                    <Form.Item
                        {...formItemLayout}
                        label="Phone Number"
                    >
                        <Input name='phoneNumber' value={this.state.phoneNumber} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="E-mail"
                    >
                        <Input name='email' value={this.state.email} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Address"
                    >
                        <Input name='address' value={this.state.address} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Postal Code"
                    >
                        <Input name='postalCode' value={this.state.postalCode} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Occupation"
                    >
                        <Input name='occupation' value={this.state.occupation} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Height (cm)"
                    >
                        <Input name='height' value={this.state.height} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Weight (kg)"
                    >
                        <Input name='weight' value={this.state.weight} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Shoe Size"
                    >
                        <Input name='shoeSize' value={this.state.shoeSize} onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Link to='/patients'><Button>Back</Button></Link>
                        <Button type="primary" htmlType="submit" className='save-button'>Save</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(EditPatientPage));