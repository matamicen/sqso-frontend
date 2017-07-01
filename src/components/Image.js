import React from 'react';
import {Picture} from './Picture'
export class Image extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        if (this.props.img) {
            return (


                            <Picture
                                img = {this.props.img}
                                />

                )


        }
        else
        { return null }

    }
}