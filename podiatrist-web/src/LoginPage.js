import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleAuth} from './actions';
import {Form, Input, Button, notification, Icon} from 'antd';

import './css/LoginPage.css'

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:8080/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({usernameOrEmail: this.state.username, password: this.state.password})
        })
            .then(response => response.json())
            .then(
                json => {
                    console.log(json);
                    if (json.accessToken) {
                        notification.success({
                            message: 'Login Successful',
                            description: "Welcome " + this.state.username + "!",
                        });
                        this.props.toggleAuth(true);
                        this.props.history.push('/app');
                    } else {
                        notification.error({
                            message: json.error,
                            description: json.message,
                        });
                    }
                });
    }

    render() {
        return (
            <div className='login-form-container'>
                <h1>Log In</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        <Input prefix={<Icon type="user" />} placeholder='Username or Email' name='username' value={this.state.username}
                               onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<Icon type="lock" />} type='password' placeholder='Password' name='password' value={this.state.password}
                               onChange={this.handleInputChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' className='login-form-button'>Log In</Button>
                        Or <a href="/register">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleAuth: (auth) => dispatch(toggleAuth(auth))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));