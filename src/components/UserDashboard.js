import React from "react";
import {QSOFeed} from "./QSOFeed";
import {Grid, Card, Image, Feed, Icon, Segment, Container} from "semantic-ui-react";
export class UserDashboard extends React.Component {
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
            <Grid >
                <Grid.Row columns={3} only='computer'>
                    <Grid.Column width={3} only="computer">
                        <Segment>
                            <Card>
                                <Image
                                    src="https://s3.amazonaws.com/sqso/us-east-1:7382470b-8c80-4b59-a183-b6112ff08712/profile/profile.jpg"/>
                                <Card.Content>
                                    <Card.Header>LU2ACH</Card.Header>
                                    <Card.Meta>Joined in 2016</Card.Meta>
                                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>
                                        <Icon name='user'/>
                                        10 Friends
                                    </a>
                                </Card.Content>
                            </Card>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column computer={10} tablet={5}>
                        <Segment>
                            < QSOFeed />
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={3} only="computer">
                        <Segment>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        Recent Activity
                                    </Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Feed>
                                        <Feed.Event>
                                            <Feed.Label
                                                image='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg'/>
                                            <Feed.Content>
                                                <Feed.Date content='1 day ago'/>
                                                <Feed.Summary>
                                                    You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>

                                        <Feed.Event>
                                            <Feed.Label
                                                image='https://react.semantic-ui.com/assets/images/avatar/small/molly.png'/>
                                            <Feed.Content>
                                                <Feed.Date content='3 days ago'/>
                                                <Feed.Summary>
                                                    You added <a>Molly Malone</a> as a friend.
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>

                                        <Feed.Event>
                                            <Feed.Label
                                                image='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg'/>
                                            <Feed.Content>
                                                <Feed.Date content='4 days ago'/>
                                                <Feed.Summary>
                                                    You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>
                                    </Feed>
                                </Card.Content>
                            </Card>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='mobile tablet'>
                    <Grid.Column >
                        <Container fluid>
                            < QSOFeed />
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        );
    }
}