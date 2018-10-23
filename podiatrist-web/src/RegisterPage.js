import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleAuth} from './actions';
import {Form, Input, Button} from 'antd';

import './css/RegisterPage.css'

class RegisterPage extends React.Component {

    handleSubmit() {
        // TODO
    }

    render() {
        return (
            <div className='register-form-container'>
                <h1>Register</h1>
                <Form onSubmit={() => this.handleSubmit()}>
                    <Form.Item>
                        <Input placeholder='Full Name'/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder='Username'/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder='Email'/>
                    </Form.Item>
                    <Form.Item>
                        <Input type='password' placeholder='Password'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' className='register-form-button'>Register</Button>
                        Already registered? <a href="/login">Login now!</a>
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
        login: () => dispatch(toggleAuth(true))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterPage));