import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Icon, Layout, Menu, notification} from "antd";

import './css/MainPage.css'
import {ACCESS_TOKEN} from "./constants";
import ListPatientsPage from "./ListPatientsPage";

const {Sider, Content} = Layout;

class MainPage extends React.Component {

    constructor(props) {
        super(props);
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

    render() {
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
                        <ListPatientsPage />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default connect(null, null)(withRouter(MainPage));