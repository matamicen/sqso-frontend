import React from "react";
import FeedQSO from "../Feed/NewsFeedContainer";

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import Feed from "semantic-ui-react/dist/commonjs/views/Feed";

class PublicDashboard extends React.Component {

    render() {

        return (
            <Grid>
                <Grid.Row >
                    <Grid.Column>
                       
                            < FeedQSO/>
                   
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