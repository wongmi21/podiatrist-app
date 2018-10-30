import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Form, Icon, Input, Layout, Menu, Modal, notification, Radio, Table} from "antd";

import './css/MainPage.css'
import {addPatient, getAllPatientData} from "./util/APIUtils";

const {Sider, Content} = Layout;

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'NRIC',
    dataIndex: 'nric',
    key: 'nric',
}, {
    title: 'Sex',
    dataIndex: 'sex',
    key: 'sex',
}];

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            addPatientModalLoading: false,
            addPatientModalVisible: false,
            addPatientName: null,
            addPatientNric: null,
            addPatientSex: 'M'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    updateDataSource() {
        getAllPatientData()
            .then(response => {
                this.setState({
                    dataSource: response
                });
            }).catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.updateDataSource();
    }

    showModal = () => {
        this.setState({
            addPatientModalVisible: true,
        });
    };

    handleOk = () => {
        this.setState({ addPatientModalLoading: true });
        addPatient({name: this.state.addPatientName, nric: this.state.addPatientNric, sex: this.state.addPatientSex})
            .then(response => {
                notification.success({
                    message: 'Podiatrist App',
                    description: "Patient " + this.state.addPatientName + " added!",
                });
                this.setState({
                    addPatientName: null,
                    addPatientNric: null,
                    addPatientSex: 'M',
                    addPatientModalLoading: false,
                    addPatientModalVisible: false
                });
                this.updateDataSource();
            }).catch(error => {
                console.log(error);
            this.setState({ addPatientModalLoading: false });
        });
    };

    handleCancel = () => {
        this.setState({ addPatientModalVisible: false });
    };

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Layout className='layout-container'>
                <Sider className='layout-sider'>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="team" />
                            <span className="nav-text">Patients</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="setting" />
                            <span className="nav-text">User Management</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content className='layout-content'>
                        <Table dataSource={this.state.dataSource} columns={columns} pagination={{pageSize: Math.floor((Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 197)/54)}}/>
                        <Button type="primary" icon="user-add" onClick={this.showModal}>Add Patient</Button>
                        <Modal
                            title="Add Patient"
                            centered
                            visible={this.state.addPatientModalVisible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                                <Button key="submit" type="primary" loading={this.state.addPatientModalLoading} onClick={this.handleOk}>
                                    Submit
                                </Button>,
                            ]}
                        >
                            <Form>
                                <Form.Item
                                    {...formItemLayout}
                                    label="Name"
                                >
                                    <Input
                                        size="large"
                                        name="addPatientName"
                                        placeholder="Full Name"
                                        value={this.state.addPatientName}
                                        onChange={this.handleInputChange} />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="NRIC"
                                >
                                    <Input
                                        size="large"
                                        name="addPatientNric"
                                        placeholder="NRIC"
                                        value={this.state.addPatientNric}
                                        onChange={this.handleInputChange} />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="Sex"
                                >
                                    <Radio.Group name='addPatientSex' defaultValue="M" buttonStyle="solid" onChange={this.handleInputChange} value={this.state.addPatientSex}>
                                        <Radio.Button value="M">Male</Radio.Button>
                                        <Radio.Button value="F">Female</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));