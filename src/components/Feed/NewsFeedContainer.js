import React, {Fragment} from "react";

import NewsFeed from './NewsFeedPresentational';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import * as Actions from '../../actions';
import 'react-virtualized/styles.css'; // only needs to be imported once

import "../../styles/style.css";
class NewsFeedContainer extends React.PureComponent {

    
   

    render() {
        let qsos = []
        if (this.props.qsos && this.props.qsos.length > 0) {

            for (let i = 0; i < this.props.qsos.length; i++) {

                qsos.push({
                    qso: this.props.qsos[i],
                    type: this.props.qsos[i].type,
                    source: this.props.qsos[i].source
                        ? this.props.qsos[i].source
                        : null
                   
                })

            }
        }

        return (
            <Fragment>
                
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
