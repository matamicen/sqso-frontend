import React from "react";
import FeedQSO from "./FeedQSO";
import {Container, Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';

class PublicDashboard extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {


    }

    getFeedFromApi() {
        var apigClient = window.apigClientFactory.newClient({});
        var params = {};
        var body = {};
        var additionalParams = {};


//TODO: pasar como parametro la fecha de ahora o del ultimo qso para que traiga los 50 siguientes.
        this.props.actions.doRequestFeed();
        apigClient.qsoPublicListGet(params, body, additionalParams)
            .then(function (result) {
                this.props.actions.doReceiveFeed(result.data);

            }.bind(this)).catch(function (error) {
            console.log("error");
            alert(error);
        });


    }

    render() {
        if (this.props.state.default.qsos.length === 0) this.getFeedFromApi()
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
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PublicDashboard);