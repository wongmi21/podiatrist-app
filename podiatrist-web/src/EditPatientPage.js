import React from 'react';

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Input, Form, DatePicker, Row, Col, Checkbox, Upload, Icon, message} from "antd";
import {editPatient, getPatientData} from "./util/APIUtils";

import './css/EditPatientPage.css';
import moment from "moment";
import SymptomsTable from "./SymptomsTable";
import TestResultsTable from "./TestResultsTable";
import EditPatientTextBox from "./EditPatientTextBox";
import EditPatientTextArea from "./EditPatientTextArea";

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

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class EditPatientPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageLoading: false,
            imageUrl: null,

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
            additionalSupplied: null,
            symptomsData: [],
            additionalNotes: null,
            testResultsData: [
                {
                    key: 0,
                    test: 'Relax Stance - Legs',
                    result: '-',
                    ideal: 'Straight'
                },
                {
                    key: 1,
                    test: 'Relax Stance - Patallae',
                    result: '-',
                    ideal: 'Straight'
                },
                {
                    key: 2,
                    test: 'Gait - Right Foot',
                    result: '-',
                    ideal: 'Straight/Parallel'
                },
                {
                    key: 3,
                    test: 'Gait - Left Foot',
                    result: '-',
                    ideal: 'Straight/Parallel'
                },
                {
                    key: 4,
                    test: 'Knees Bending - Right',
                    result: '-',
                    ideal: 'On 2nd Toe'
                },
                {
                    key: 5,
                    test: 'Knees Bending - Left',
                    result: '-',
                    ideal: 'On 2nd Toe'
                },
                {
                    key: 6,
                    test: 'Arches(Non Wt) - Right',
                    result: '-',
                    ideal: 'Medium'
                },
                {
                    key: 7,
                    test: 'Arches(Non Wt) - Left',
                    result: '-',
                    ideal: 'Medium'
                },
                {
                    key: 8,
                    test: 'Arches(Wt) - Right',
                    result: '-',
                    ideal: 'Medium'
                },
                {
                    key: 9,
                    test: 'Arches(Wt) - Left',
                    result: '-',
                    ideal: 'Medium'
                },
                {
                    key: 10,
                    test: 'Forefoot(Non Wt) - Right',
                    result: '-',
                    ideal: 'Neutral(Horizontal)'
                },
                {
                    key: 11,
                    test: 'Forefoot(Non Wt) - Left',
                    result: '-',
                    ideal: 'Neutral(Horizontal)'
                },
                {
                    key: 12,
                    test: 'Rear(Wt) - Right',
                    result: '-',
                    ideal: 'Neutral(Vertical)'
                },
                {
                    key: 13,
                    test: 'Rear(Wt) - Left',
                    result: '-',
                    ideal: 'Neutral(Vertical)'
                },
                {
                    key: 14,
                    test: "Jack's Test - Right",
                    result: '-',
                    ideal: '1-2'
                },
                {
                    key: 15,
                    test: "Jack's Test - Left",
                    result: '-',
                    ideal: '1-2'
                },
                {
                    key: 16,
                    test: "Supination - Right",
                    result: '-',
                    ideal: '1-2'
                },
                {
                    key: 17,
                    test: "Supination - Left",
                    result: '-',
                    ideal: '1-2'
                },
                {
                    key: 18,
                    test: "Subtalar Motion - Right",
                    result: '-',
                    ideal: 'Normal ROM'
                },
                {
                    key: 19,
                    test: "Subtalar Motion - Left",
                    result: '-',
                    ideal: 'Normal ROM'
                },
                {
                    key: 20,
                    test: "One Foot Balance - Right",
                    result: '-',
                    ideal: 'Steady'
                },
                {
                    key: 21,
                    test: "One Foot Balance - Left",
                    result: '-',
                    ideal: 'Steady'
                },
                {
                    key: 22,
                    test: "Forefoot Stability - Right",
                    result: '-',
                    ideal: 'Steady'
                },
                {
                    key: 23,
                    test: "Forefoot Stability - Right",
                    result: '-',
                    ideal: 'Steady'
                }
            ]
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleProblemsChange = this.handleProblemsChange.bind(this);
        this.handleOtherSignificantFindingsChange = this.handleOtherSignificantFindingsChange.bind(this);
        this.handleSuppliedChange = this.handleSuppliedChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleSymptomsTableUpdated = this.handleSymptomsTableUpdated.bind(this);
        this.handleTestResultsTableUpdated = this.handleTestResultsTableUpdated.bind(this);
    }

    componentDidMount() {
        getPatientData(this.props.match.params.id)
            .then(response => {
                this.setState({
                    imageUrl: response.imageUrl,
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
                    additionalSupplied: response.additionalSupplied,
                    additionalNotes: response.additionalNotes
                });
                if (response.symptomsData) {
                    this.setState({symptomsData: JSON.parse(response.symptomsData)});
                }
                if (response.testResultsData) {
                    this.setState({ testResultsData: JSON.parse(response.testResultsData) });
                }
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

    handleSymptomsTableUpdated(data) {
        this.setState({symptomsData: data});
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
            additionalSupplied: this.state.additionalSupplied,
            additionalNotes: this.state.additionalNotes,
            imageUrl: this.state.imageUrl,
            symptomsData: JSON.stringify(data),
            testResultsData: JSON.stringify(this.state.testResultsData)
        })
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleTestResultsTableUpdated(data) {
        this.setState({testResultsData: data});
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
            additionalSupplied: this.state.additionalSupplied,
            additionalNotes: this.state.additionalNotes,
            imageUrl: this.state.imageUrl,
            symptomsData: JSON.stringify(this.state.symptomsData),
            testResultsData: JSON.stringify(data)
        })
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleBlur(name, value) {
        this.setState({
            [name]: value
        }, this.handleInputBlur);
    }

    handleInputBlur() {
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
            additionalSupplied: this.state.additionalSupplied,
            additionalNotes: this.state.additionalNotes,
            imageUrl: this.state.imageUrl
        })
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleImageChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ imageLoading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                this.setState({
                    imageUrl,
                    imageLoading: false,
                });
                this.handleInputBlur();
            });
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                sm: { span: 4 }
            },
            wrapperCol: {
                sm: { span: 16 }
            }
        };

        const uploadButton = (
            <div>
                <Icon type={this.state.imageLoading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;

        return (
            <div>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    beforeUpload={beforeUpload}
                    onChange={this.handleImageChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
                <Form>
                    <Form.Item
                        {...formItemLayout}
                        label="ID"
                    >
                        <Input name='id' disabled value={this.state.id}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Patient ID"
                    >
                        <EditPatientTextBox name='pid' initialValue={this.state.pid} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Name"
                    >
                        <EditPatientTextBox name='name' initialValue={this.state.name} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="NRIC"
                    >
                        <EditPatientTextBox name='nric' initialValue={this.state.nric} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Sex"
                    >
                        <EditPatientTextBox name='sex' initialValue={this.state.sex} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Date of Birth"
                    >
                        <DatePicker value={yyyymmddToMoment(this.state.dateOfBirth)} onChange={this.handleDateChange} onBlur={this.handleInputBlur}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Phone Number"
                    >
                        <EditPatientTextBox name='phoneNumber' initialValue={this.state.phoneNumber} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="E-mail"
                    >
                        <EditPatientTextBox name='email' initialValue={this.state.email} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Address"
                    >
                        <EditPatientTextBox name='address' initialValue={this.state.address} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Postal Code"
                    >
                        <EditPatientTextBox name='postalCode' initialValue={this.state.postalCode} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Occupation"
                    >
                        <EditPatientTextBox name='occupation' initialValue={this.state.occupation} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Height (cm)"
                    >
                        <EditPatientTextBox name='height' initialValue={this.state.height} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Weight (kg)"
                    >
                        <EditPatientTextBox name='weight' initialValue={this.state.weight} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Shoe Size"
                    >
                        <EditPatientTextBox name='shoeSize' initialValue={this.state.shoeSize} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Problems"
                    >
                        <Checkbox.Group style={{ width: '100%' }} value={this.state.problems} onChange={this.handleProblemsChange} onBlur={this.handleInputBlur}>
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
                        <EditPatientTextArea name='additionalProblems' placeholder='Any additional problems' initialValue={this.state.additionalProblems} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Other Significant Findings"
                    >
                        <Checkbox.Group style={{ width: '100%' }} value={this.state.otherSignificantFindings} onChange={this.handleOtherSignificantFindingsChange} onBlur={this.handleInputBlur}>
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
                        <EditPatientTextArea name='additionalOtherSignificantFindings' placeholder='Any other significant findings' initialValue={this.state.additionalOtherSignificantFindings} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Supplied"
                    >
                        <Checkbox.Group style={{ width: '100%' }} value={this.state.supplied} onChange={this.handleSuppliedChange} onBlur={this.handleInputBlur}>
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
                        <EditPatientTextArea name='additionalSupplied' placeholder='Any additional supplied' initialValue={this.state.additionalSupplied} onBlur={this.handleBlur} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Symptoms"
                    >
                        <SymptomsTable onChange={this.handleSymptomsTableUpdated} dataSource={this.state.symptomsData} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Test Results"
                    >
                        <TestResultsTable onChange={this.handleTestResultsTableUpdated} dataSource={this.state.testResultsData} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Additional Notes"
                    >
                        <EditPatientTextArea name='additionalNotes' placeholder='Any additional notes' initialValue={this.state.additionalNotes} onBlur={this.handleBlur} />
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(EditPatientPage));