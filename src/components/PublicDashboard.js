import React from "react";
import FeedQSO from "./QSONewsFeedContainer";
import {Container, Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';

class PublicDashboard extends React.Component {

    render() {

        return (
            <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Container fluid>
                            < FeedQSO/>
                        </Container>
                    </Grid.Column>
                </Grid.Row>

            </Grid>

        );
    }
}

const mapStateToProps = (state) => ({
    state: state
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,  null, { pure: true }
)(PublicDashboard);