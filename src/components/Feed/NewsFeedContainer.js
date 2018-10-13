import React from "react";
import FeedItem from "./FeedItem";
import FeedItemShare from "./FeedItemShare"
import NewsFeed from './NewsFeedPresentational';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import * as Actions from '../../actions/Actions';
import 'react-virtualized/styles.css'; // only needs to be imported once
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";

class NewsFeedContainer extends React.Component {

    state = {
        active: true,
        showModal: false

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.qsosFetched) {
            this.setState({active: false})
        }
    }
    componentDidMount() {
        if (!this.props.FetchingQSOS && !this.props.qsosFetched) {
            //  this.setState({fetchingData: true});
            this.props.isAuthenticated
                ? this
                    .props
                    .actions
                    .doFetchUserFeed(this.props.token)
                : this
                    .props
                    .actions
                    .doFetchPublicFeed(this.props.token);
        }
    }

    // shouldComponentUpdate(nextProps) {
    //     return !nextProps.FetchingQSOS && nextProps.qsosFetched;
    // }

    render() {

        // if (this.props.FetchingQSOS || !this.props.qsosFetched ||
        // this.props.qsos.length === 0)     return null;
        let qsos = []

        if (this.props.qsos && this.props.qsos.length > 0) {

            qsos = this
                .props
                .qsos
                .map((qso, i) => {
                    switch (qso.type) {
                        case "QSO":
                            return <FeedItem key={i} qso={qso}/>;
                        case "SHARE":
                            return <FeedItemShare key={i} qso={qso}/>;
                        default:
                            return null;
                    }
                })
        }
        return (
            <div>

                <Dimmer active={this.state.active} page>
                    <Loader>Loading</Loader>
                </Dimmer>
                {this.props.qsos && this.props.qsos.length > 0 && <NewsFeed list={qsos}/>
}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({qsos: state.default.qsos, FetchingQSOS: state.default.FetchingQSOS, qsosFetched: state.default.qsosFetched, isAuthenticated: state.default.userData.isAuthenticated, token: state.default.userData.token});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(NewsFeedContainer);
