import React from "react";
import {QSOFeed} from "./QSOFeed";
import {Grid, Container} from 'semantic-ui-react'
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
            <Grid  >

                <Grid.Column >
                    <Container fluid>
                    < QSOFeed />
                    </Container>
                </Grid.Column>


            </Grid>

        );
    }
}