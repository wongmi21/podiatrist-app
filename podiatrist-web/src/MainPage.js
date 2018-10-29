import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class MainPage extends React.Component {

    render() {
        return (
            <div>test</div>
        );
    }
}


const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));