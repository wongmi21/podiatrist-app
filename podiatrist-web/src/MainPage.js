import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Icon, Layout, Menu, Table} from "antd";

import './css/MainPage.css'
import {getAllPatientData} from "./util/APIUtils";

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
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
}];

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }

    componentDidMount() {
        getAllPatientData()
            .then(response => {
                this.setState({
                    dataSource: response
                });
                console.log(response);
            }).catch(error => {
                console.log(error);
        });
    }

    render() {
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
                        <Button type="primary" icon="user-add">Add User</Button>
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