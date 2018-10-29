import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Icon, Layout, Menu} from "antd";

import './css/MainPage.css'

const {Sider, Content} = Layout;

class MainPage extends React.Component {

    render() {
        return (
            <Layout className='layout-container'>
                <Sider className='layout-sider'>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="team" />
                            <span className="nav-text">List Patients</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="user-add" />
                            <span className="nav-text">Add Patient</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="edit" />
                            <span className="nav-text">Edit Patient Info</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="user-delete" />
                            <span className="nav-text">Delete Patient</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="setting" />
                            <span className="nav-text">User Management</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content className='layout-content'>Content</Content>
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