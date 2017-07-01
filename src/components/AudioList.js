import React from 'react';
import {Audio} from './Audio';
import {Grid} from 'semantic-ui-react'
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
                    <Grid>
                    {this.props.mediaList.map((m, i) =>
                    <Grid.Row key={i}>
                        <Grid.Column >
                            <Audio key = {i}
                                url = {m.url}/>
                        </Grid.Column>
                    </Grid.Row>
                )}
                    </Grid>
                </div>

        )
        }
        else
        { return null }

    }
}