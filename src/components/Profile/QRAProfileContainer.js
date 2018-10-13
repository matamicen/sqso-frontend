import React from "react";
import {bindActionCreators} from 'redux';
import QRAProfile from './QRAProfilePresentational'
import * as Actions from '../../actions/Actions';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";

class QRAProfileContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            active: true,
            followed: false
        };
        this.handleButtonClick = this
            .handleButtonClick
            .bind(this);
    }

    componentDidMount() {
        let qraInMemory = this.props.qra
            ? this.props.qra.qra.qra
            : "";
        if (!this.props.fetchingUser && !this.props.userFetched && this.props.token) {
            this
                .props
                .actions
                .doFetchUserInfo(this.props.token);
        }
        if ((!this.props.fetchingQRA && !this.props.QRAFetched) || (this.props.QRAFetched && (this.props.match.params.qra !== qraInMemory))) {
            this
                .props
                .actions
                .doFetchQRA(this.props.match.params.qra);
        }

        this.setState({
            followed: this
                .props
                .following
                .some(o => o.qra === this.props.match.params.qra)
        });

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.QRAFetched) {
            this.setState({active: false})
        }
    }
    // shouldComponentUpdate(nextProps) {          return nextProps.QRAFetched; }

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
            <div>

                <Dimmer active={this.state.active} page>
                    <Loader>Loading</Loader>
                </Dimmer>
                {(this.props.QRAFetched) && <QRAProfile
                    qraInfo={qraInfo}
                    qra={this.props.qra}
                    onClick={this.handleButtonClick}
                    isAuthenticated={this.props.isAuthenticated}
                    currentQRA={this.props.currentQRA}
                    followed={this.state.followed}/>
}
            </div>
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