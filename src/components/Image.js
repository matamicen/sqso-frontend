import React from 'react';
import {Picture} from './Picture'
export class Image extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        console.log(this.props.img);
        if (this.props.img) {
            return (

                    <tr>
                        <td>
                            <Picture
                                img = {this.props.img}
                                h = {'200'}
                                w = {'300'} />
                        </td>
                    </tr>
                )


        }
        else
        { return null }

    }
}