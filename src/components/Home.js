import React from 'react';
import {PublicDashboard} from './PublicDashboard'
export class Home extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    componentDidMount(){
        console.log("home");
    }
    render() {
        return (
                    < PublicDashboard/>
        );
    }
}