import React from 'react';
import {Route} from "react-router-dom";

import 'antd/dist/antd.css';
import {notification} from "antd";
import {getCurrentUser} from "./util/APIUtils";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import {Redirect, withRouter, Switch} from "react-router";
import {ACCESS_TOKEN} from "./constants";
import MainPage from "./MainPage";

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

        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };

        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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
                this.props.history.push("/");
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

    handleLogout(redirectTo = "/login", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Podiatrist App',
            description: description,
        });
    }

    render() {
        return (
            <Switch>
                <Route path="/login" render={(props) => <LoginPage onLogin={this.handleLogin} {...props} />}/>
                <Route path='/register' component={RegisterPage}/>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/" component={MainPage}
                              handleLogout={this.handleLogout}/>
            </Switch>
        );
    }
}

export default withRouter(App);