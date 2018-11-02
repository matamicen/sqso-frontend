import React from "react";
import QSOFeedItem from "./Feed/FeedItem";
import AppNavigation from './Home/AppNavigation'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import "../styles/style.css";
class QSODetail extends React.Component {
    state = {
        active: true,
        showModal: false

    }
    componentWillReceiveProps(nextProps) {
        
        if (nextProps.qso) {
            this.setState({active: false})
        }

    }
    componentDidMount() {
        if (!this.props.FetchingQSO) 
            this.props.actions.doFetchQSO(this.props.match.params.idqso);
        }
    
    render() {

        return (
            <div className='qsoDetail-container'>
                {!this.props.qso && <Dimmer active={this.state.active} page>
                    <Loader>Loading</Loader>
                </Dimmer>}

                <div className='site-header'>
                    <AppNavigation/>
                </div>
                <div className='site-left'>
                    <Advertisement className="left" unit='wide skyscraper' test='Wide Skyscraper'/>
                </div>

                <div className='qsoDetail-main'>

                    <div></div>
                    {this.props.qso && <QSOFeedItem key={this.props.match.params.idqso} qso={this.props.qso}/>
}

                </div>

                <div className='site-right'>
                    <Advertisement unit='wide skyscraper' test='Wide Skyscraper'/>
                </div>

            </div>

        );
    }
}
const mapStateToProps = (state) => ({qso: state.default.qso, FetchingQSO: state.default.FetchingQSO});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QSODetail));