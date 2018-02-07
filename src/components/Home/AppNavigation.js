import React, {Component} from "react";

import PublicNavigation from "./PublicNavigation.js";
import AuthenticatedNavigation from "./AuthenticatedNavigation.js";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/Actions';

class AppNavigation extends Component{
    componentDidMount() {
   //     this.props.store.subscribe(this.forceUpdate.bind(this))
    }
    renderNavigation()
    {
         return (this.props.isAuthenticated ? <AuthenticatedNavigation /> : <PublicNavigation />);
    }
    render()
    {

        return (
                 this.renderNavigation()
        );
    }

}
/**
 * This function maps the state to a
 * prop called `state`.
 *
 * In larger apps it is often good
 * to be more selective and only
 * map the part of the state tree
 * that is necessary.
 */
const mapStateToProps = (state) => ({
    isAuthenticated: state.default.userData.isAuthenticated
});

/**
 * This function maps actions to props
 * and binds them so they can be called
 * directly.
 *
 * In this case all actions are mapped
 * to the `actions` prop.
 */
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

/**
 * Finally the Redux store is connected
 * to the component with the `connect()`
 * function.
 */

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppNavigation);


