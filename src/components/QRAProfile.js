import React from "react";
import {Button, Card, Icon} from "semantic-ui-react";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';

class QRAProfile extends React.Component {
    constructor() {
        super();
        this.state = {
                   followed: false
        }
        ;


    }



    doFollow(f) {
        console.log("doFollow");
        var apigClient = window.apigClientFactory.newClient({});

        var params = {
            "Authorization": this.props.state.default.userData.token
        };
        var body = {
            "qra": f.qra,
            "datetime": f.datetime
        };
        var additionalParams = {};
        apigClient.qraFollowerPost(params, body, additionalParams)
            .then(function (result) {
                console.log("Follower added");
                if (result.data.body.error > 0) {
                    console.error(result.data.body.message);
                } else {
                    console.log(result.data.body.message);
                    this.setState({followed: true});
                }
            }.bind(this))
            .catch(function (error) {
                console.log("error");
                console.error(error);
            });
    }

    handleButtonClick(e) {
        console.log("handleAddComment");
        e.preventDefault();

        if (!this.state.followed) {
            var datetime = new Date();
            var follow = {
                qra: this.props.state.router.location.pathname.substr(1),
                datetime: datetime
            };
            this.setState({followed: !this.state.followed});

            if (this.props.state.default.userData.isAuthenticated) {
                this.doFollow(follow);
            }
        }
    }

    render() {
        const extra = <a>
            <Icon name='user'/>
            16 Friends
        </a>;
        let buttonText;

        if (this.state.followed) {
            buttonText = "Unfollow";
        }
        else {
            buttonText = "Follow";
        }

        return (
            <div>
                <Card
                    image='/assets/images/avatar/large/elliot.jpg'
                    header={this.props.state.router.location.pathname.substr(1)}
                    meta='Friend'
                    description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                    extra={extra}
                />
                <Button positive={!this.state.followed}
                        onClick={this.handleButtonClick.bind(this)}> {buttonText} </ Button>
            </ div>

        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    state: state
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(QRAProfile);