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

function yyyymmddToMoment(yyyymmdd) {
    if (yyyymmdd) {
        return moment(String(yyyymmdd).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'), 'YYYY-MM-DD');
    } else {
        return null;
    }
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
            problems: [],
            additionalProblems: null,
            otherSignificantFindings: [],
            additionalOtherSignificantFindings: null,
            supplied: [],
            additionalSupplied: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleProblemsChange = this.handleProblemsChange.bind(this);
        this.handleOtherSignificantFindingsChange = this.handleOtherSignificantFindingsChange.bind(this);
        this.handleSuppliedChange = this.handleSuppliedChange.bind(this);
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
                    shoeSize: response.shoeSize,
                    additionalProblems: response.additionalProblems,
                    additionalOtherSignificantFindings: response.additionalOtherSignificantFindings,
                    additionalSupplied: response.additionalSupplied
                });
                let problems = [];
                for (const problem of response.problems) {
                    problems.push(problem.name);
                }
                let otherSignificantFindings = [];
                for (const otherSignificantFinding of response.otherSignificantFindings) {
                    otherSignificantFindings.push(otherSignificantFinding.name);
                }
                let supplied = [];
                for (const suppliedOne of response.supplied) {
                    supplied.push(suppliedOne.name);
                }
                this.setState({
                    problems: problems,
                    otherSignificantFindings: otherSignificantFindings,
                    supplied: supplied
                });
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
            this.setState({dateOfBirth: null});
        }
    }

    handleProblemsChange(checkedValues) {
        this.setState({problems: checkedValues});
    }

    handleOtherSignificantFindingsChange(checkedValues) {
        this.setState({otherSignificantFindings: checkedValues});
    }

    handleSuppliedChange(checkedValues) {
        this.setState({supplied: checkedValues});
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
            problems: this.state.problems,
            additionalProblems: this.state.additionalProblems,
            otherSignificantFindings: this.state.otherSignificantFindings,
            additionalOtherSignificantFindings: this.state.additionalOtherSignificantFindings,
            supplied: this.state.supplied,
            additionalSupplied: this.state.additionalSupplied
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
                sm: { span: 4 }
            },
            wrapperCol: {
                sm: { span: 12 }
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
                    <DatePicker value={yyyymmddToMoment(this.state.dateOfBirth)} onChange={this.handleDateChange}/>
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
                    <Input.TextArea placeholder="Any additional problems" name='additionalProblems' value={this.state.additionalProblems} onChange={this.handleInputChange} autosize />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Other Significant Findings"
                >
                    <Checkbox.Group style={{ width: '100%' }} value={this.state.otherSignificantFindings} onChange={this.handleOtherSignificantFindingsChange}>
                        <Row>
                            <Col span={12}><Checkbox value="CALLUS_UNDER_2_3_MPJ">Callus under 2/3 MPJ</Checkbox></Col>
                            <Col span={12}><Checkbox value="CALLUS_UNDER_2ND_MPJ">Callus under 2nd MPJ</Checkbox></Col>
                            <Col span={12}><Checkbox value="CALLUS_UNDER_3RD_MPJ">Callus under 3rd MPJ</Checkbox></Col>
                            <Col span={12}><Checkbox value="CALLUSES_LATERAL_BORDER_OF_FOOT">Calluses lateral border of foot</Checkbox></Col>
                            <Col span={12}><Checkbox value="CALLUSES_MEDIAL_BORDER_OF_HALLUX">Calluses medial border of hallux</Checkbox></Col>
                            <Col span={12}><Checkbox value="HAMMER_TOE">Hammer toe</Checkbox></Col>
                            <Col span={12}><Checkbox value="HAV">HAV</Checkbox></Col>
                            <Col span={12}><Checkbox value="HAV_MILD">HAV (Mild)</Checkbox></Col>
                            <Col span={12}><Checkbox value="LEFT_HIP_LOWER_THAN_RIGHT">Left hip lower than right</Checkbox></Col>
                            <Col span={12}><Checkbox value="LIMITED">Limited</Checkbox></Col>
                            <Col span={12}><Checkbox value="NORMAL">Normal</Checkbox></Col>
                            <Col span={12}><Checkbox value="RIGHT_HIP_LOWER_THAN_LEFT">Right hip lower than left</Checkbox></Col>
                            <Col span={12}><Checkbox value="SLIGHTY_LIMITED">Slightly limited</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                    <Input.TextArea placeholder="Any other significant findings" name='additionalOtherSignificantFindings' value={this.state.additionalOtherSignificantFindings} onChange={this.handleInputChange} autosize />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Supplied"
                >
                    <Checkbox.Group style={{ width: '100%' }} value={this.state.supplied} onChange={this.handleSuppliedChange}>
                        <Row>
                            <Col span={12}><Checkbox value="FORMTHOTICS_BLUE">Formthotics Blue</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_3_4_DD_BLUE">Formthotics 3/4 DD Blue</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_DD_BLUE">Formthotics DD Blue</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_RED">Formthotics Red</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_DD_RED">Formthotics DD Red</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_DD_RED_LP">Formthotics DD Red/LP</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_SHOCK_STOP">Formthotics Shock Stop</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_BURGUNDY">Formthotics Burgundy</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_LV_BLACK">Formthotics LV Black</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_LV_GOLF">Formthotics LV Golf</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_BLACK">Formthotics Black</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_GOLF">Formthotics Golf</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_JUNIOR_J1">Formthotics Junior J1</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_JUNIOR_J2">Formthotics Junior J2</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_JUNIOR_J3">Formthotics Junior J3</Checkbox></Col>
                            <Col span={12}><Checkbox value="FORMTHOTICS_JUNIOR_J4">Formthotics Junior J4</Checkbox></Col>
                            <Col span={12}><Checkbox value="EXPRESS_FL_RED">Express FL Red</Checkbox></Col>
                            <Col span={12}><Checkbox value="EXPRESS_FL_BLUE">Express FL Blue</Checkbox></Col>
                            <Col span={12}><Checkbox value="EXPRESS_3_4_RED">Express 3/4 Red</Checkbox></Col>
                            <Col span={12}><Checkbox value="EXPRESS_3_4_BLUE">Express 3/4 Blue</Checkbox></Col>
                            <Col span={12}><Checkbox value="COMFORT_3_4_CHARCOAL">Comfort 3/4 Charcoal</Checkbox></Col>
                            <Col span={12}><Checkbox value="RUBBER_3_4_INSOLES">Rubber 3/4 Insoles</Checkbox></Col>
                            <Col span={12}><Checkbox value="SILIPOS_WONDERSPUR">Silipos WonderSpur</Checkbox></Col>
                            <Col span={12}><Checkbox value="SILIPOS_WONDERCUP">Silipos WonderCup</Checkbox></Col>
                            <Col span={12}><Checkbox value="SILIPOS_WONDERSPORT">Silipos WonderSport</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                    <Input.TextArea placeholder="Any additional supplied" name='additionalSupplied' value={this.state.additionalSupplied} onChange={this.handleInputChange} autosize />
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