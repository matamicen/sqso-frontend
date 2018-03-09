import React from "react";
import  {Button, Feed, Icon} from "semantic-ui-react";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';

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

            if (this.props.state.default.userData.isAuthenticated && (this.props.qso.likes.some(o => o.qra === this.props.state.default.userData.qra.toUpperCase()))) {
                this.setState({liked: true});
                this.setState({icon: "thumbs up"})
            }
        }
    }

    doLike() {

        var apigClient = window
            .apigClientFactory
            .newClient({});

        var params = {
            "Authorization": this.props.state.default.userData.token
        };
        var body = {
            "qso": this.props.qso.idqsos
        };
        var additionalParams = {};
        apigClient
            .qsoLikePost(params, body, additionalParams)
            .then(function (result) {

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

        var apigClient = window
            .apigClientFactory
            .newClient({});

        var params = {
            "Authorization": this.props.state.default.userData.token
        };
        var body = {
            "qso": this.props.qso.idqsos
        };
        var additionalParams = {};
        apigClient
            .qsoLikeDelete(params, body, additionalParams)
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
        if (!this.props.state.default.userData.isAuthenticated) 
            return null;
        
        if (!this.state.liked) {
            this.setState(previousState => ({
                likeCounter: previousState.likeCounter + 1
            }));
            if (this.props.state.default.userData.isAuthenticated) 
                this.doLike();
            
            this.setState({icon: "thumbs up"})

        } else {
            this.setState(previousState => ({
                likeCounter: previousState.likeCounter - 1
            }));
            if (this.props.state.default.userData.isAuthenticated) 
                this.doUnLike();
            
            this.setState({icon: "thumbs outline up"})
        }

        this.setState({
            liked: !this.state.liked
        })

    }

    render() {

        return (
            <Button icon active={false}>
                <Feed.Like
                    onClick={this
                    .handleOnLike
                    .bind(this)}>
                    < Icon name={this.state.icon}/> {this.state.likeCounter}
                    {' '} Likes
                </Feed.Like>
            </Button>
        );
    }
}

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(QSOLikeButton);
