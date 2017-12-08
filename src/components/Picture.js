import React from 'react';
import {Image} from 'semantic-ui-react'

export class Picture extends React.Component{
    render(){
        if (this.props.measure) {
            return (
                <Image
                    src={this.props.img}
                    size='large'
                    shape='rounded'
                    onLoad={this.props.measure}/>
            )
        } else {
            return (
                <Image
                    src={this.props.img}
                    size='large'
                    shape='rounded'/>
            )
        }
    }
}

