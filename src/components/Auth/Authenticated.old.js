import React from "react";
import {Route, Redirect} from "react-router-dom";

const Authenticated = ({authenticated, component, ...rest}) => (
    <Route {...rest} render={(props) => {
        if (!authenticated) return null;
        return authenticated ?
            (React.createElement(component, {authenticated})) :
            (<Redirect to="/login"/>);
    }}/>
);


export default Authenticated;