import React from "react";
import QSOFeedItem from "./Feed/FeedItem";
import {Container, Feed, Grid} from 'semantic-ui-react'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


class QSODetail extends React.Component {

    componentWillMount() {
        if (!this.props.FetchingQSO) this.props.actions.doFetchQSO(this.props.match.params.idqso);
    }



    render() {

        if (!this.props.qso ) {
            return null;
        } else {
            return ( <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Container fluid>
                            <Feed>
                                <QSOFeedItem key={this.props.match.params.idqso} qso={this.props.qso}/>
                            </Feed>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid> );
        }
    }
}

const mapStateToProps = (state) => ({    
    qso: state.default.qso,
    FetchingQSO: state.default.FetchingQSO
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QSODetail));