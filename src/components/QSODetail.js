import React from "react";
import {QSOFeedItem} from "./QSOFeedItem";
import {Container, Feed, Grid} from 'semantic-ui-react'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class QSODetail extends React.Component {

    constructor() {
        super();
        this.state = {
            qso: null
        }        ;
    }
    componentWillMount() {
        this.getDataFromApi();
    }

    getDataFromApi() {

        var apigClient = window.apigClientFactory.newClient({});
        var params = {};
        var body = {"qso": this.props.match.params.idqso};
        var additionalParams = {};


        apigClient.qsoDetailPost(params, body, additionalParams)
            .then(function (result) {
                this.setState({qso: result.data});

            }.bind(this)).catch(function (error) {
            console.log("error");
            alert(error);
        });
    }

    render() {
        console.log(this.state.qso)
        if (!this.state.qso ) {
            return null;
        } else {
            return ( <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Container fluid>
                            <Feed>
                                <QSOFeedItem key={this.props.match.params.idqso} qso={this.state.qso}/>
                            </Feed>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid> );
        }
    }
}

const mapStateToProps = (state, ownProps) => ({state: state});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QSODetail));