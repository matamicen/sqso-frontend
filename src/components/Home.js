import React from "react";
import PublicDashboard from "./PublicDashboard";
import UserDashboard from "./UserDashboard";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/Actions';

class Home extends React.Component {
    shouldComponentUpdate(){
        return !this.props.fetchingQSOS;
    }

    render() {
        if (this.props.fetchingQSOS) return null;

        return (
            this.props.isAuthenticated ? <UserDashboard/> : <PublicDashboard/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.default.userData.isAuthenticated,
    fetchingQSOS: state.default.fetchingQSOS
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,  null, { pure: true }
)(Home);

