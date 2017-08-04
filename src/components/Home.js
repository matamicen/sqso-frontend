import React from "react";
import PublicDashboard from "./PublicDashboard";
import UserDashboard from "./UserDashboard";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/Actions';
class Home extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            this.props.state.userData.isAuthenticated ? <UserDashboard/> : <PublicDashboard/>
        )
    }
}

const mapStateToProps = (state) => ({
    state: state
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

