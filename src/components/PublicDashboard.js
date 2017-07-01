import React from "react";
import {QSOFeed} from "./QSOFeed";
import {Grid} from 'semantic-ui-react'
export class PublicDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            publicQsos: []
        };
    }

    componentDidMount() {


    }

    render() {
        return (
            <Grid celled='internally' >
                <Grid.Column width={3}/>
                <Grid.Column width={10}>
                    < QSOFeed />
                </Grid.Column>
                <Grid.Column width={3}/>

            </Grid>

        );
    }
}