import React from 'react';
import {Audio} from './Audio';
export class AudioList extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        if (this.props.mediaList.length > 0 ) {
            return (
                <div className="AudioList">
                    {this.props.mediaList.map((m, i) =>
                    <Audio key = {i}
                        url = {m.url}/>
                )}
                </div>

        )
        }
        else
        { return null }

    }
}