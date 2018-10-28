import React from 'react';
import {toggleAuth} from './actions';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router';
import {Layout} from 'antd';

class App extends React.Component {

    render() {
        return (
            <Layout>
                <Layout>Header</Layout>
                <Layout>Content</Layout>
            </Layout>
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