import React from 'react';

import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {notification, Button, Input, Form, DatePicker, Row, Col, Checkbox} from "antd";
import {editPatient, getPatientData} from "./util/APIUtils";

import './css/EditPatientPage.css';
import moment from "moment";

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
}

class EditPatientPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            pid: null,
            name: null,
            nric: null,
            sex: null,
            dateOfBirth: null,
            phoneNumber: null,
            email: null,
            address: null,
            postalCode: null,
            occupation: null,
            height: null,
            weight: null,
            shoeSize: null,
            problems: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleProblemsChange = this.handleProblemsChange.bind(this);
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
                    dateOfBirth: response.dateOfBirth,
                    phoneNumber: response.phoneNumber,
                    email: response.email,
                    address: response.address,
                    postalCode: response.postalCode,
                    occupation: response.occupation,
                    height: response.height,
                    weight: response.weight,
                    shoeSize: response.shoeSize
                });
                let problems = [];
                for (const problem of response.problems) {
                    problems.push(problem.name);
                }
                this.setState({problems});
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleDateChange(e) {
        if (e) {
            this.setState({dateOfBirth: formatDate(e._d)});
        } else {
            this.setState({dateOfBirth: 20000101});
        }
    }

    handleProblemsChange(checkedValues) {
        this.setState({problems: checkedValues});
    }

    handleSubmit(e) {
        e.preventDefault();
        editPatient({
            id: this.state.id,
            pid: this.state.pid,
            name: this.state.name,
            nric: this.state.nric,
            sex: this.state.sex,
            dateOfBirth: this.state.dateOfBirth,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            postalCode: this.state.postalCode,
            occupation: this.state.occupation,
            height: this.state.height,
            weight: this.state.weight,
            shoeSize: this.state.shoeSize,
            problems: this.state.problems
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
                    label="Date of Birth"
                >
                    <DatePicker value={moment(String(this.state.dateOfBirth).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'), 'YYYY-MM-DD')} onChange={this.handleDateChange}/>
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
                <Form.Item
                    {...formItemLayout}
                    label="Problems"
                >
                    <Checkbox.Group style={{ width: '100%' }} value={this.state.problems} onChange={this.handleProblemsChange}>
                        <Row>
                            <Col span={12}><Checkbox value="ACHILLES_TENDINITIS">Achilles tendinitis</Checkbox></Col>
                            <Col span={12}><Checkbox value="COXA_VALGUS">Coxa valgus</Checkbox></Col>
                            <Col span={12}><Checkbox value="COXA_VARUS">Coxa varus</Checkbox></Col>
                            <Col span={12}><Checkbox value="EXCESSIVE_SUBTALAR_PRONATION">Excessive subtalar pronation</Checkbox></Col>
                            <Col span={12}><Checkbox value="HALLUX_ABDUCTO_VALGUS">Hallux abducto valgus</Checkbox></Col>
                            <Col span={12}><Checkbox value="HYPER_MOBILE_FEET">Hyper mobile feet</Checkbox></Col>
                            <Col span={12}><Checkbox value="ILLIO_TIBIAL_BAND_FRICTION_SYNDROME">IT band friction Syndrome</Checkbox></Col>
                            <Col span={12}><Checkbox value="LOWER_BACK_PAIN">Lower back pain</Checkbox></Col>
                            <Col span={12}><Checkbox value="MALALIGNMENT_LOWER_LIMBS">Malalignment lower limbs</Checkbox></Col>
                            <Col span={12}><Checkbox value="METATARSALGIA">Metatarsalgia</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item>
                    <Link to='/patients'><Button>Back</Button></Link>
                    <Button type="primary" htmlType="submit" className='save-button'>Save</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default connect(null, null)(withRouter(EditPatientPage));