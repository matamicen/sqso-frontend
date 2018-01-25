import React from "react";

import {Card, Icon, Image} from "semantic-ui-react";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';


class FeedUser extends React.Component {

    constructor() {
        super();
        this.state = {
            fetchingData: false
        };
    }


    componentDiDMount() {
        //if (!this.props.state.default.userData.FetchingUser)
      //  console.log("componentDiDMount");
        if (!this.state.fetchingData) {
            this.props.actions.doFetchUserInfo(this.props.state.default.userData.token);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({fetchingData: false});
    }

    componentWillUnmount() {

    }
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate");
        console.log(!this.state.fetchingData);
        return !this.state.fetchingData;
    }

    render() {
        let following = this.props.state.default.userData.following ? this.props.state.default.userData.following.length : 0;
        let followers = this.props.state.default.userData.followers ? this.props.state.default.userData.followers.length : 0;
        return (
            <Card>
                <Image
                    src={this.props.state.default.userData.profilepic}/>
                <Card.Content>
                    <Card.Header>{this.props.state.default.userData.qra}</Card.Header>
                    <Card.Meta>Joined in 2016</Card.Meta>
                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user'/>
                        Following {following}
                    </a>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user'/>
                        Followers {followers}
                    </a>
                </Card.Content>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedUser);

