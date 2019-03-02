import React, {Component} from "react";

import PublicNavigation from "./PublicNavigation.js";
import AuthenticatedNavigation from "./AuthenticatedNavigation.js";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions';

class AppNavigation extends Component {
    renderNavigation()
    {
        return (this.props.isAuthenticated
            ? <AuthenticatedNavigation/>
            : <PublicNavigation/>);
    }
    render()
    {

        return (this.renderNavigation());
    }

}
const mapStateToProps = (state) => ({isAuthenticated: state.default.userData.isAuthenticated});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
