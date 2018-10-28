import React from 'react';
import {Route} from "react-router-dom";

import 'antd/dist/antd.css';
import {notification} from "antd";
import {getCurrentUser} from "./util/APIUtils";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import {withRouter} from "react-router";

class App extends React.Component {

    constructor(props) {
        super(props);

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
            }).catch(error => {
                alert(console.log(error))
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
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <Route path="/login" render={(props) => <LoginPage onLogin={this.handleLogin} {...props} />}/>
                <Route path='/register' component={RegisterPage} />
            </div>
        );
    }
}

export default withRouter(App);