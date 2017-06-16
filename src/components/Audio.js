import React from 'react';

export class Audio extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        if (this.props.media[0]) {
            return (
                <tr>
                    <td>
                < audio
                    ref = "audio_tag"
                    src = {this.props.media[0].url}
                    controls
                    autoPlay = "false" />
                    </td>
                </tr>
        )
        }
        else
        { return null }

    }
}