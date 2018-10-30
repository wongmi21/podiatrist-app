import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from './actions';
import {Form, Input, Button, notification, Icon} from 'antd';

import './css/LoginPage.css'
import {ACCESS_TOKEN} from "./constants";
import {getCurrentUser, apiLogin} from "./util/APIUtils";

const FormItem = Form.Item;

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };

        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
                this.props.login(response, true);
                this.props.history.push("/patients");
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    handleLogin() {
        notification.success({
            message: 'Podiatrist App',
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
    }

    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm);
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.handleLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                apiLogin(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
                    }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'Podiatrist App',
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });
                    } else {
                        notification.error({
                            message: 'Podiatrist App',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Please input your username or email!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" />}
                            size="large"
                            name="usernameOrEmail"
                            placeholder="Username or Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Password"  />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/register">register now!</Link>
                </FormItem>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (currentUser, isAuthenticated) => dispatch(login(currentUser, isAuthenticated))
    };
};

export default connect(null, mapDispatchToProps)(withRouter(LoginPage));