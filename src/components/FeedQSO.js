import React from "react";
import {QSOFeedItem} from "./QSOFeedItem";
import {Feed} from "semantic-ui-react";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';


class FeedQSO extends React.Component {

    constructor() {
        super();
        this.state = {
        };
    }


    componentWillMount() {
        if (!this.props.state.default.FetchingQSOS) {
            this.props.state.default.userData.isAuthenticated ?
                this.props.actions.doFetchUserFeed(this.props.state.default.userData.token)
        :
            this.props.actions.doFetchPublicFeed(this.props.state.default.userData.token);
        }
    }
    componentWillUnmount() {

    }

    render() {

        let qsos = null;

        if (this.props.state.default.qsos && this.props.state.default.qsos.length > 0) {
            qsos = this.props.state.default.qsos.map((qso, i) =>
                <QSOFeedItem key={i} qso={qso}/>
            )
        }

        return (
            <Feed>
                {qsos}
            </Feed>
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
)(FeedQSO);

