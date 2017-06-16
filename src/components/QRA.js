import React from 'react';
import {Picture} from './Picture'
export class QRA extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render() {
        return (
            <td>
                <Picture
                    img = {this.props.qra.profilepic}
                    h = {'50'}
                    w = {'50'} />
            </td>
        )
    }
}