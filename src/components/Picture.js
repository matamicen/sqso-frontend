import React from 'react';
import {Image} from 'semantic-ui-react'

export class Picture extends React.Component{
    render(){
        return (
            <Image src ={this.props.img} size='large' shape='rounded'/>
        )
    }
}

