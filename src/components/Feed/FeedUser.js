import React from "react";

import {Card, Icon, Image} from "semantic-ui-react";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import PropTypes from 'prop-types';

class FeedUser extends React.Component {

    constructor() {
        super();
        this.state = {
            fetchingData: false
        };
    }
    componentDiDMount() {
        if (!this.state.fetchingData) {
            this.props.actions.doFetchUserInfo(this.props.userData.token);
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({fetchingData: false});
    }
    shouldComponentUpdate(){        
      //  console.log(!this.state.fetchingData);
        return !this.state.fetchingData;
    }

    render() {
        let following = this.props.userData.following ? this.props.userData.following.length : 0;
        let followers = this.props.userData.followers ? this.props.userData.followers.length : 0;
        return (
            <Card>
                <Image
                    src={this.props.userData.profilepic}/>
                <Card.Content>
                    <Card.Header>{this.props.userData.qra}</Card.Header>                                        
                </Card.Content>
                <Card.Content extra>
                    
                        <Icon name='user'/>
                        Following {following}
                   
                </Card.Content>
                <Card.Content extra>
                    
                        <Icon name='user'/>
                        Followers {followers}
                    
                </Card.Content>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    //state: state,
    userData: state.default.userData,    
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedUser);

FeedUser.PropTypes = {
    userData: PropTypes.object.isRequired
}
