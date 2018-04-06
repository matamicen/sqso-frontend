import React from "react";
import NewsFeed from "../Feed/NewsFeedContainer";
import {
    Card,
    Container,
    Feed,
    Grid,
   
    Segment,
    Sticky
} from "semantic-ui-react";
import {connect} from 'react-redux'
import FeedUser from '../Feed/FeedUser'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';

class UserDashboard extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {}
    handleContextRef = contextRef => this.setState({contextRef})
    render() {
        const {contextRef} = this.state
        return (
            <Segment attached='bottom'  ref={this.handleContextRef}>
            
                <Grid>
                    <Grid.Row columns={3} only='computer'>
                        <Grid.Column width={3} only="computer">

                            <Sticky context={contextRef}>
                                <FeedUser/>
                            </Sticky>

                        </Grid.Column>

                        <Grid.Column computer={10} tablet={5}>
                            <Segment>
                                < NewsFeed/>
                            </Segment>
                        </Grid.Column>

                        <Grid.Column width={3} only="computer">
                        <Sticky context={contextRef}>

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
                                                        You added
                                                        <a>Jenny Hess</a>
                                                        to your
                                                        <a>coworker</a>
                                                        group.
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>

                                            <Feed.Event>
                                                <Feed.Label
                                                    image='https://react.semantic-ui.com/assets/images/avatar/small/molly.png'/>
                                                <Feed.Content>
                                                    <Feed.Date content='3 days ago'/>
                                                    <Feed.Summary>
                                                        You added
                                                        <a>Molly Malone</a>
                                                        as a friend.
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>

                                            <Feed.Event>
                                                <Feed.Label
                                                    image='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg'/>
                                                <Feed.Content>
                                                    <Feed.Date content='4 days ago'/>
                                                    <Feed.Summary>
                                                        You added
                                                        <a>Elliot Baker</a>
                                                        to your
                                                        <a>musicians</a>
                                                        group.
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                        </Feed>
                                    </Card.Content>
                                </Card>

                            </Sticky>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1} only='mobile tablet'>
                        <Grid.Column>
                            <Container fluid>
                                < NewsFeed/>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
