import React from "react";
import QSOFeedItem from "./QSOFeedItem";
import {Feed} from "semantic-ui-react";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';


class FeedQSO extends React.Component {

    componentWillMount() {
        if (!this.props.fetchingQSOS && !this.props.qsosFetched) {
            this.setState({fetchingData: true});
            this.props.isAuthenticated ?
                this.props.actions.doFetchUserFeed(this.props.token)
                :
                this.props.actions.doFetchPublicFeed(this.props.token);
        }
    }
    shouldComponentUpdate(nextProps) {
    //    console.log("shouldComponentUpdate FEEDQSO" + this.props.qsosFetched);
        return this.props.qsosFetched;
    }

    render() {
        if (this.props.fetchingQSOS || !this.props.qsosFetched) return null;
        let qsos = null;
        if (this.props.qsos && this.props.qsos.length > 0) {
            qsos = this.props.qsos.map((qso, i) =>

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

const mapStateToProps = (state, qsos) => ({
    qsos: state.default.qsos,
    fetchingQSOS: state.default.FetchingQSOS,
    qsosFetched: state.default.qsosFetched,
    isAuthenticated: state.default.userData.isAuthenticated,
    token: state.default.userData.token
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps, null, {
        pure: false
    }
)(FeedQSO);

