import React from 'react';
import {PublicDashboard} from './PublicDashboard'
export class Main extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render() {
      //  if (!this.props.isLoggedIn) {
            return (
                <div className="Main">
                    { this.props.children }
                    < PublicDashboard/>
                </div>
            );
     //   }
    }
}