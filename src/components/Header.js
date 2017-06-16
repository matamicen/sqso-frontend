import React from 'react';
import {Search} from './Search';
import {Login} from './Login'
export class Header extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render() {
        return (
            <div className="Home">
                < Search/>
                < Login />
            </div>
        );
    }
}