import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Icon, Layout, Menu, Table} from "antd";

import './css/MainPage.css'

const {Sider, Content} = Layout;

const dataSource = [{
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
}, {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}, {
    key: '3',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}, {
    key: '4',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}, {
    key: '5',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}, {
    key: '6',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}, {
    key: '7',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}, {
    key: '8',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}, {
    key: '9',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}, {
    key: '10',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}, {
    key: '11',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}, {
    key: '12',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}];

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}];

class MainPage extends React.Component {

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
                        <Table dataSource={dataSource} columns={columns} pagination={{pageSize: Math.floor((Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 197)/54)}}/>
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