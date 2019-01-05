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
    componentWillReceiveProps(nextProps) {       
        if (nextProps.qsosFetched) {
            this.setState({active: false})
        }

        if (!nextProps.FetchingQSOS && !nextProps.qsosFetched && !nextProps.autheticating) {

            if (nextProps.isAuthenticated) 
                this.props.actions.doFetchUserFeed(this.props.token)
            if (nextProps.public) 
                this.props.actions.doFetchPublicFeed(this.props.token);
            }
        }

    render() {

        let qsos = []

        if (this.props.qsos && this.props.qsos.length > 0) {

            qsos = this
                .props
                .qsos
                .map((qso, i) => {
                    return <FeedItem key={i} qso={qso}/>
                })
        }

        return (
            <Fragment>
                {!this.props.qsos && <Dimmer active={this.state.active} page>
                    <Loader>Loading</Loader>
                </Dimmer>}
                {this.props.qsos && this.props.qsos.length > 0 && <NewsFeed list={qsos}/>}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    qsos: state.default.qsos,
    FetchingQSOS: state.default.FetchingQSOS,
    qsosFetched: state.default.qsosFetched,
    autheticating: state.default.userData.autheticating,
    isAuthenticated: state.default.userData.isAuthenticated,
    token: state.default.userData.token,
    public: state.default.userData.public
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(NewsFeedContainer);
