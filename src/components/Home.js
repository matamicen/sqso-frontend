import React from "react";
import {PublicDashboard} from "./PublicDashboard";
import {UserDashboard} from "./UserDashboard";
export class Home extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("home");
    }

    render() {
        return (
            this.props.isAuthenticated ? <UserDashboard/> : <PublicDashboard/>
        )
    }
}