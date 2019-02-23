import React from 'react'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
import AppNavigation from './AppNavigation'
import FeedQSO from "../Feed/NewsFeedContainer";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import { DFPSlotsProvider, AdSlot } from 'react-dfp';
import * as Actions from '../../actions/Actions';
import "../../styles/style.css";

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
            <DFPSlotsProvider dfpNetworkId={'21799560237'}   >
            <div className='global-container'>
                <div className='site-header'>
                    <AppNavigation/>
                </div>
                <div className='site-left'>
                    <Advertisement unit='wide skyscraper'>
                    <AdSlot adUnit={"Home/Home_Left"} sizes={[ [160,600]]} />                     
                    </Advertisement>
                </div>

                <div className='site-main'>
                    {this.props.qsosFetched && <FeedQSO/>}
                </div>

                <div className='site-right'>

                    <Advertisement unit='wide skyscraper'>
                    <AdSlot adUnit={"Home/Home_Right"} sizes={[ [160,600]]} />    
                    </Advertisement>
                </div>

            </div>
            </DFPSlotsProvider>
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
