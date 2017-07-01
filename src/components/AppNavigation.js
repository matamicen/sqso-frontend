import React, {Component} from "react";

import PublicNavigation from "./PublicNavigation.js";
import AuthenticatedNavigation from "./AuthenticatedNavigation.js";


export default class AppNavigation extends Component{

    renderNavigation()
    {
        return (this.props.isAuthenticated ? <AuthenticatedNavigation /> : <PublicNavigation />);
    }
    render()
    {
        return (
                 this.renderNavigation(this.props.isAuthenticated)
        );
    }

}


