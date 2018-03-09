import React from "react";
import FeedItem from "./FeedItem";
import NewsFeed from './NewsFeedPresentational';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import * as Actions from '../../actions/Actions';
import 'react-virtualized/styles.css'; // only needs to be imported once

class NewsFeedContainer extends React.Component {
// This example assumes you have a way to know/load this information

    componentWillMount() {
        if (!this.props.fetchingQSOS && !this.props.qsosFetched) {
            //  this.setState({fetchingData: true});
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
        let qsos = Immutable.List(this.props.qsos);
        if (this.props.qsos && this.props.qsos.length > 0) {
            qsos = this.props.qsos.map((qso, i) =>

                <FeedItem key={i} qso={qso}/>
            )
        }
        return (
            <NewsFeed list={qsos}/>
        )
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
)(NewsFeedContainer);

