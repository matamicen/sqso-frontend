import React from 'react';

export class Audio extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        console.log(this.props.url);
        if (this.props.url) {
            return (


                            < audio
                                ref = "audio_tag"
                                src = {this.props.url}
                                controls />
                       
                )


        }
        else
        { return null }

    }
}