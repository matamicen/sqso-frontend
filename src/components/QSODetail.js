import React from "react";
import FeedItem from './Feed/FeedItem'
import FeedItemShare from "./Feed/FeedItemShare"
import NewsFeed from './Feed/NewsFeedPresentational';
import AppNavigation from './Home/AppNavigation'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Immutable from 'immutable';
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
        let  qsos_aux = [];
        let qsos = Immutable.List([]);
        if (this.props.qso) {
            qsos_aux.push(this.props.qso);
            qsos = Immutable.List(qsos_aux);
            
            
            qsos = 
                qsos_aux
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

                    
                    {this.props.qso && <NewsFeed list={qsos}/>}

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