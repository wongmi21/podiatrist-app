import React from 'react';

import 'antd/dist/antd.css';
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import {Redirect, withRouter, Switch, Route} from "react-router-dom";
import MainPage from "./MainPage";
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, authenticated, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            authenticated ? (
                <Component {...rest} {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path='/register' component={RegisterPage}/>
                {/* <PrivateRoute authenticated={this.props.isAuthenticated} path="/" component={MainPage}/> */}
                <Route path='/' component={MainPage}/>
            </Switch>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated
    };
};

export default connect(mapStateToProps, null, null, {pure: false})(withRouter(App));