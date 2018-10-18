import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleAuth} from './actions';
import {Form, Input, Button} from 'antd';

import './css/LoginPage.css'

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit() {
        this.props.login();
        this.props.history.push('/app');
    }

    render() {
        return (
            <div className='login-form-container'>
                <Form onSubmit={() => this.handleSubmit()}>
                    <Form.Item>
                        <Input placeholder='Username'/>
                    </Form.Item>
                    <Form.Item>
                        <Input type='password' placeholder='Password'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' className='login-form-button'>Log In</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));