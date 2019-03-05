import React from "react";

import NewsFeed from './Feed/NewsFeedPresentational';
import AppNavigation from './Home/AppNavigation'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Ad from './Ad/Ad';
import "../styles/style.css";
class QSODetail extends React.PureComponent {
    state = {
        active: true,
        showModal: false,
        idqso: null

    }
    static getDerivedStateFromProps(props, state) {
        if (props.qso) {
            return {active: false}
        }
        return null;
    }
    // componentWillReceiveProps(nextProps) {     if (nextProps.qso) {
    // this.setState({active: false})     }     //
    // console.log(nextProps.FetchingQSO) if (!nextProps.FetchingQSO)     //
    // this.props.actions.doFetchQSO(this.props.match.params.idqso); }
    componentDidMount() {

        if (!this.props.FetchingQSO && !this.props.QSOFetched) {

            this
                .props
                .actions
                .doRequestQSO()
            this
                .props
                .actions
                .doFetchQSO(this.props.match.params.idqso)
            this.setState({idqso: this.props.match.params.idqso})
        }
    }

    render() {

        
        let qsos = [];
        if (this.props.qso) {
          
            qsos.push({qso:this.props.qso,
                        type:this.props.qso.type})
                       

            
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
                    <Advertisement unit='wide skyscraper'>
                    <Ad adslot='/21799560237/qsoDetail/left' width={160} height={600}/>
                    </Advertisement>
                </div>

                <div className='qsoDetail-main'>

                    {this.props.qso && <NewsFeed list={qsos}/>}

                </div>

                <div className='site-right'>
                    <Advertisement unit='wide skyscraper'>
                    <Ad adslot='/21799560237/qsoDetail/right' width={160} height={600}/>
                    </Advertisement>
                </div>

            </div>

        );
    }
}
const mapStateToProps = (state) => ({qso: state.default.qso, FetchingQSO: state.default.FetchingQSO, QSOFetched: state.default.QSOFetched});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QSODetail));