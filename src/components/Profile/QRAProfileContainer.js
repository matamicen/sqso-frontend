import React, {
    Fragment
} from "react";

import QRAProfile from './QRAProfilePresentational'
import * as Actions from '../../actions/Actions';
import {
    withRouter
} from "react-router-dom";
import {
    connect
} from 'react-redux'
import {
    bindActionCreators
} from 'redux';
import "../../styles/style.css";

class QRAProfileContainer extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            active: true,

            tab: null
        };
        this.handleButtonClick = this
            .handleButtonClick
            .bind(this);
        this.handleTabClick = this
            .handleTabClick
            .bind(this);

    }
    componentWillUnmount() {

        this
            .props
            .actions
            .clearQRA();
    }
    componentDidMount() {

        let qraInMemory = this.props.qra ?
            this.props.qra.qra.qra :
            "";

        if ((!this.props.fetchingQRA && !this.props.QRAFetched) || (this.props.QRAFetched && (this.props.match.params.qra !== qraInMemory))) {
            
            this
                .props
                .actions
                .doFetchQRA(this.props.match.params.qra);
        }
        switch (this.props.tab) {
            case 'BIO':
                this.setState({
                    tab: 2
                });
                break;
            case 'INFO':
                this.setState({
                    tab: 3
                });
                break;
            case 'FOLLOWING':
                this.setState({
                    tab: 4
                });
                break;
            default:
                this.setState({
                    tab: 1
                });
                break;
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.QRAFetched)
            return {
                active: false
            }
        if (!props.qra)
            return {
                active: true
            }
        //Default
        return null;
    }
    // componentWillReceiveProps(nextProps) {     if (nextProps.QRAFetched) {
    //  this.setState({active: false})     }     if (nextProps.following)
    // this.setState({             followed: nextProps                 .following
    //              .some(o => o.qra === this.props.match.params.qra)         });
    //  }

    handleTabClick(i) {
        switch (i) {
            case 2:
                this
                    .props
                    .history
                    .push('/' + this.props.match.params.qra + '/bio');
                break;
            case 3:
                this
                    .props
                    .history
                    .push('/' + this.props.match.params.qra + '/info');
                break;
            case 4:
                this
                    .props
                    .history
                    .push('/' + this.props.match.params.qra + '/following');
                break;
            default:
                this
                    .props
                    .history
                    .push('/' + this.props.match.params.qra);
                break;
        }
        this.setState({
            tab: i
        });
    }
    handleButtonClick() {

        if (!this.props.token)
            return null;
        this.setState((prevState) => {
            return {
                followed: !prevState.followed
            };
        });
        if (!this.state.followed) {
            if (this.props.isAuthenticated) {
                this
                    .props
                    .actions
                    .doFollowQRA(this.props.token, this.props.match.params.qra);
            }
        } else {
            this
                .props
                .actions
                .doUnfollowQRA(this.props.token, this.props.match.params.qra);
        }
    }

    render() {
        let followed = this.props
            .following
            .some(o => o.qra === this.props.match.params.qra);

        let qraInfo = null;
        if (this.props.qra)
            qraInfo = this.props.qra.qra;

        return ( <
            Fragment > {
                < QRAProfile
                qraInfo = {
                    qraInfo
                }
                active = {
                    this.state.active
                }
                qra = {
                    this.props.qra
                }
                onClick = {
                    this.handleButtonClick
                }
                isAuthenticated = {
                    this.props.isAuthenticated
                }
                currentQRA = {
                    this.props.currentQRA
                }
                followed = {
                    followed
                }
                handleTabClick = {
                    this.handleTabClick
                }
                tab = {
                    this.state.tab
                }
                />
            }

            <
            /Fragment>
        )

    }
}

const mapStateToProps = (state, ownProps) => ({
    //state: state,
    currentQRA: state.default.userData.qra,
    isAuthenticated: state.default.userData.isAuthenticated,
    following: state.default.userData.following,
    token: state.default.userData.token,
    fetchingQRA: state.default.FetchingQRA,
    QRAFetched: state.default.QRAFetched,
    qra: state.default.qra,
    fetchingUser: state.default.userData.fetchingUser,
    userFetched: state.default.userData.userFetched

});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
    pure: false
})(QRAProfileContainer));