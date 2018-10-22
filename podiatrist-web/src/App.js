import React from 'react';
import {toggleAuth} from './actions';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router';
import {Button} from 'antd';

class App extends React.Component {

    handleClick() {
        this.props.logout();
        this.props.history.push('/login');
    }

    render() {
        return (
            <Button type='primary' onClick={() => this.handleClick()}>Log Out</Button>
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
        logout: () => dispatch(toggleAuth(false))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));