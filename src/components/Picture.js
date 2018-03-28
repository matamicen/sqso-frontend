import React from 'react';
import {Image} from 'semantic-ui-react'
import PropTypes from 'prop-types'
export class Picture extends React.Component{
    render(){
        if (this.props.measure) {
            return (
                <Image
                    src={this.props.img}
                    size='large'
                    shape='rounded'
                    alt=""
                    centered
                    onLoad={this.props.measure}/>
            )
        } else {
            return (
                <Image
                    src={this.props.img}
                    alt=""
                    size='large'                    
                    shape='rounded'/>
            )
        }
    }
}
Picture.propTypes = {
    img : PropTypes.string.isRequired,
    measure : PropTypes.func
}
