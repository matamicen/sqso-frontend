import React, {Fragment} from "react";
import FeedItem from "./FeedItem";

import NewsFeed from './NewsFeedPresentational';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import * as Actions from '../../actions/Actions';
import 'react-virtualized/styles.css'; // only needs to be imported once
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import "../../styles/style.css";
class NewsFeedContainer extends React.PureComponent {

    state = {
        active: true,
        showModal: false

    }
    static getDerivedStateFromProps(props, state) {

        if (props.qsosFetched) 
            return {active: false, showModal: true}
        
        // if (!props.FetchingQSOS && !props.qsosFetched && !props.authenticating) { if
        // (props.isAuthenticated) this.props.actions.doFetchUserFeed(props.token) if
        // (props.public) this.props.actions.doFetchPublicFeed();     } Return null to
        // indicate no change to state.
        return null;

    }
    // componentWillReceiveProps(nextProps) {     if (nextProps.qsosFetched) {
    // this.setState({active: false})     }     if (!nextProps.FetchingQSOS &&
    // !nextProps.qsosFetched && !nextProps.authenticating) {         if
    // (nextProps.isAuthenticated)
    // this.props.actions.doFetchUserFeed(nextProps.token)         if
    // (nextProps.public)             this.props.actions.doFetchPublicFeed();  } }

    render() {

        let qsos = []

        if (this.props.qsos && this.props.qsos.length > 0) {
            for (let i = 0; i < this.props.qsos.length; i++) {
                if (i % 2 === 0) 
                    qsos.push(<FeedItem key={1} type='AD' source='FEED'/>)
                qsos.push(<FeedItem key={i} qso={this.props.qsos[i]} type={this.props.qsos[i].type}/>)
            }
            // qsos = this     .props     .qsos     .map((qso, i) => {         return     })
        }

        return (
            <Fragment>
                {< Dimmer active = {
                    this.state.active
                }
                page > <Loader>Loading</Loader> < /Dimmer>}
                {this.props.qsos && this.props.qsos.length > 0 && <NewsFeed list={qsos}/>}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    qsos: state.default.qsos,
    FetchingQSOS: state.default.FetchingQSOS,
    qsosFetched: state.default.qsosFetched,
    authenticating: state.default.userData.authenticating,
    isAuthenticated: state.default.userData.isAuthenticated,
    token: state.default.userData.token,
    public: state.default.userData.public
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedContainer);
