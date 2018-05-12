import React from "react";
import NewsFeed from "../Feed/NewsFeedContainer";

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
// import  Sticky from 'semantic-ui-react/dist/commonjs/modules/Sticky'
import {connect} from 'react-redux'

import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';

class UserDashboard extends React.PureComponent {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {}

    render() {

        return (

            <Grid>
                <Grid.Row columns={3} only='computer'>
                    <Grid.Column width={3} only="computer">
                    <Advertisement unit='wide skyscraper' test='Wide Skyscraper' centered/>
                    </Grid.Column>

                    <Grid.Column computer={10} tablet={5}>

                        < NewsFeed/>

                    </Grid.Column>

                     <Grid.Column width={3} only="computer">
                        <Advertisement unit='wide skyscraper' test='Wide Skyscraper' centered/>
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row columns={1} only='mobile tablet'>
                    <Grid.Column>

                        < NewsFeed/>

                    </Grid.Column>
                </Grid.Row>
            </Grid>

        );
    }
}

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
