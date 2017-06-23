import React from 'react';
import {Main} from './Main';

export class Home extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render() {
        return (
            <div className="Home">
                <Main/>
            </div>
        );
    }
}