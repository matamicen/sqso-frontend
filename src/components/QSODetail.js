import React from "react";
import QSOFeedItem from "./Feed/QSOFeedItem";
import {Container, Feed, Grid} from 'semantic-ui-react'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


class QSODetail extends React.Component {

    constructor() {
        super();
        this.state = {

        }        ;
    }
    componentWillMount() {
        console.log("componentWillMount");
        console.log(this.props.state.default.FetchingQSO);
        if (!this.props.state.default.FetchingQSO) this.props.actions.doFetchQSO(this.props.match.params.idqso);
    }
    componentWillUnMount() {
        console.log("componentWillUnMount");
    }


    render() {
        console.log(this.props.state.default.qso);
        if (!this.props.state.default.qso ) {
            return null;
        } else {
            return ( <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Container fluid>
                            <Feed>
                                <QSOFeedItem key={this.props.match.params.idqso} qso={this.props.state.default.qso}/>
                            </Feed>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid> );
        }
    }
}

const mapStateToProps = (state) => ({
    state: state
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QSODetail));