import React from "react";
import {QSOFeedItem} from "./QSOFeedItem";
import {Feed} from "semantic-ui-react";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';


class QSOFeed extends React.Component {

    constructor() {
        super();
        this.state = {
        };
    }


    componentWillMount() {


    }
    componentWillUnmount() {

    }

    render() {

        let qsos = null;

        if (this.props.state.qsos && this.props.state.qsos.length > 0) {
            qsos = this.props.state.qsos.map((qso, i) =>
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
)(QSOFeed);

