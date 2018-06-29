import React from "react";
import PublicDashboard from "./PublicDashboard";
import UserDashboard from "./UserDashboard";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/Actions';

class Home extends React.Component {
    // shouldComponentUpdate(){
    //     return !this.props.fetchingQSOS && this.props.qsosFetched;
    // }

    render() {
        // console.log("home")
        // console.log(this.props.fetchingQSOS)
        // console.log(this.props.qsosFetched)
        // if (this.props.fetchingQSOS || !this.props.qsosFetched) return null;

        return (
            this.props.isAuthenticated ? <UserDashboard/> : <PublicDashboard/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.default.userData.isAuthenticated    
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,  null, { pure: true }
)(Home);

