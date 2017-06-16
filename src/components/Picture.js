import React from 'react';

export class Picture extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        return (
            < img alt="" src ={this.props.img} height={this.props.h} width={this.props.w} />
        )
    }
}

