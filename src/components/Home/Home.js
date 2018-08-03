import React from "react";
import PublicDashboard from "./PublicDashboard";
import UserDashboard from "./UserDashboard";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/Actions';

class Home extends React.Component {
   

    render() {       
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

