import React from "react";
import {Feed, Icon} from "semantic-ui-react";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';

class QSOLikeButton extends React.Component {
    constructor() {
        super();
        this.state = {
            icon: "thumbs outline up",
            liked: false,
            likeCounter: 0
        };

    }

    componentDidMount() {

        if (this.props.qso.likes) {

            this.setState({likeCounter: this.props.qso.likes.length});


            if (this.props.state.userData.isAuthenticated && (this.props.qso.likes.some(o => o.qra === this.props.state.userData.qra.toUpperCase()))) {
                this.setState({liked: true});
                this.setState({icon: "thumbs up"})
            }
        }
    }


    doLike() {
        console.log("doLike");
        var apigClient = window.apigClientFactory.newClient({});

        var params = {
            "Authorization": this.props.state.userData.token
        };
        var body = {"qso": this.props.qso.idqsos};
        var additionalParams = {};
        apigClient.qsoLikePost(params, body, additionalParams)
            .then(function (result) {
                console.log("updateCounter success");
                if (result.data.body.error > 0) {
                    console.error(result.data.body.message);
                } else {
                    this.setState({likeCounter: result.data.body.message});
                }
            }.bind(this))
            .catch(function (error) {
                console.log("error");
                console.error(error);
            });
    }

    doUnLike() {
        console.log("doUnLike");
        var apigClient = window.apigClientFactory.newClient({});

        var params = {
            "Authorization": this.state.token
        };
        var body = {"qso": this.props.qso.idqsos};
        var additionalParams = {};
        apigClient.qsoLikeDelete(params, body, additionalParams)
            .then(function (result) {
                console.log("updateCounter success");
                if (result.data.body.error > 0) {
                    console.error(result.data.body.message);
                } else {
                    this.setState({likeCounter: result.data.body.message});
                }
            }.bind(this))
            .catch(function (error) {
                console.log("error");
                console.error(error);
            });
    }

    handleOnLike() {
        if (!this.props.state.userData.isAuthenticated) return null;

        console.log("handleOnLike")

        if (!this.state.liked) {
            this.setState({likeCounter: this.state.likeCounter + 1});
            if (this.props.state.userData.isAuthenticated) this.doLike();

            this.setState({icon: "thumbs up"})

        }
        else {
            this.setState({likeCounter: this.state.likeCounter - 1});
            if (this.props.state.userData.isAuthenticated) this.doUnLike();

            this.setState({icon: "thumbs outline up"})
        }

        this.setState({liked: !this.state.liked})

    }

    render() {

        return (
            <Feed.Like onClick={this.handleOnLike}>
                < Icon name={this.state.icon}/>
                {this.state.likeCounter} Likes
            </Feed.Like>
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
)(QSOLikeButton);

