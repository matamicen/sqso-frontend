import React, {Fragment} from "react";
import {bindActionCreators} from 'redux';
import QRAProfile from './QRAProfilePresentational'
import * as Actions from '../../actions/Actions';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'

import "../../styles/style.css";
class QRAProfileContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            active: true,
            followed: false,
            tab: 1
        };
        this.handleButtonClick = this
            .handleButtonClick
            .bind(this);
        this.handleTabClick = this
            .handleTabClick
            .bind(this);
    }

    componentDidMount() {
        let qraInMemory = this.props.qra
            ? this.props.qra.qra.qra
            : "";

        if ((!this.props.fetchingQRA && !this.props.QRAFetched) || (this.props.QRAFetched && (this.props.match.params.qra !== qraInMemory))) {
            this
                .props
                .actions
                .doFetchQRA(this.props.match.params.qra);
        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.QRAFetched) {
            this.setState({active: false})
        }

        if (nextProps.following) 
            this.setState({
                followed: nextProps
                    .following
                    .some(o => o.qra === this.props.match.params.qra)
            });
        }
    // shouldComponentUpdate(nextProps) {          return nextProps.QRAFetched; }
    handleTabClick(i) {
        //  e.preventDefault();
        this.setState({tab: i});
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

        let qraInfo = null;
        if (this.props.qra) 
            qraInfo = this.props.qra.qra;
        return (
            <Fragment>
                {< QRAProfile
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
                    this.state.followed
                }
                handleTabClick = {
                    this.handleTabClick
                } 
                tab = {this.state.tab}/>
}
               
            </Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(QRAProfileContainer));