import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Divider, Form, Icon, Input, Layout, Menu, Modal, notification, Popconfirm, Radio, Table} from "antd";

import './css/MainPage.css'
import {addPatient, deletePatient, getAllPatientData} from "./util/APIUtils";
import {ACCESS_TOKEN} from "./constants";

const {Sider, Content} = Layout;

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
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push('/login');

        notification.success({
            message: 'Podiatrist App',
            description: "You're successfully logged out.",
        });
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
            notification.error({
                message: 'Podiatrist App',
                description: error.message,
            });
            this.setState({ addPatientModalLoading: false });
        });
    };

    handleCancel = () => {
        this.setState({ addPatientModalVisible: false });
    };

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => () => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleDelete = (key, name, nric) => {
        deletePatient({name: name, nric: nric})
            .then(response => {
                console.log(response);
                notification.success({
                    message: 'Podiatrist App',
                    description: response.message,
                });
            }).catch(error => {
                console.log(error);
        });
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => { return a.name.localeCompare(b.name)},
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={this.handleSearch(selectedKeys, confirm)}
                    />
                    <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
                    <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
                </div>
            ),
            filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    });
                }
            },
            render: (text) => {
                const { searchText } = this.state;
                return searchText ? (
                    <span>
                {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                    fragment.toLowerCase() === searchText.toLowerCase()
                        ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
                ))}
              </span>
                ) : text;
            }
        }, {
            title: 'NRIC',
            dataIndex: 'nric',
            key: 'nric',
            sorter: (a, b) => { return a.nric.localeCompare(b.nric)},
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search NRIC"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={this.handleSearch(selectedKeys, confirm)}
                    />
                    <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
                    <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
                </div>
            ),
            filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
            onFilter: (value, record) => record.nric.toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    });
                }
            },
            render: (text) => {
                const { searchText } = this.state;
                return searchText ? (
                    <span>
                {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                    fragment.toLowerCase() === searchText.toLowerCase()
                        ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
                ))}
              </span>
                ) : text;
            }
        }, {
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex',
        }, {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                  <a href="javascript:;">Edit</a>
                  <Divider type="vertical" />
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key, record.name, record.nric)}>
                    <a href="javascript:;">Delete</a>
                  </Popconfirm>
                </span>
            )
        }];

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
                    <Layout>
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
                    </Layout>
                    <Layout className='layout-log-out'><Button onClick={this.handleLogout}>Log Out</Button></Layout>
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