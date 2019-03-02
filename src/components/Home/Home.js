import React from 'react'

import AppNavigation from './AppNavigation'
import FeedQSO from "../Feed/NewsFeedContainer";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import "../../styles/style.css";
import Ad from '../Ad/Ad';

// import AdSense from "react-adsense";
class Home extends React.PureComponent {
    componentDidMount() {
        if (this.props.isAuthenticated) 
            this.props.actions.doFetchUserFeed(this.props.token)
        else 
            this
                .props
                .actions
                .doFetchPublicFeed();
        }
    render() {

        return (
           
            <div className='global-container'>
                <div className='site-header'>
                    <AppNavigation/>
                </div>
                <div className='site-left'>

                    <Ad adslot='/21799560237/Home/Home_Left2' width={160} height={600}/>
                </div>

                <div className='site-main'>
                    {this.props.qsosFetched && <FeedQSO/>}
                </div>

                <div className='site-right'>
                    <Ad adslot='Home/Home_Right' width={160} height={600}/>
                </div>

            </div>
          )
    }
}
const mapStateToProps = (state) => ({
    // qsos: state.default.qsos,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
