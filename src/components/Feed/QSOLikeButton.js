import React from "react";
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import API from '@aws-amplify/api';
import ReactGA from 'react-ga';
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
        let apiName = 'superqso';
        let path = '/qso-like';
        let myInit = {
            body: {
                "qso": this.props.qso.idqsos
            }, // replace this with attributes you need
            headers: {
                "Authorization": this.props.state.default.userData.token
            } // OPTIONAL
        }
        API
            .post(apiName, path, myInit)
            .then(response => {
                if (response.body.error > 0) {
                    console.error(response.body.message);
                } else {
                    this.setState({likeCounter: response.body.message});
                }
            })
            .catch(error => {
                console.log(error)
            });

    }

    doUnLike() {

        let apiName = 'superqso';
        let path = '/qso-like';
        let myInit = {
            body: {
                "qso": this.props.qso.idqsos
            }, // replace this with attributes you need
            headers: {
                "Authorization": this.props.state.default.userData.token
            } // OPTIONAL
        }
        API
            .del(apiName, path, myInit)
            .then(response => {
                if (response.body.error > 0) {
                    console.error(response.body.message);
                } else {
                    this.setState({likeCounter: response.body.message});

                    ReactGA.event({category: 'QSO', action: 'liked'});
                }
            })
            .catch(error => {
                console.log(error)
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
            <Button
                icon
                active={false}
                onClick={this
                .handleOnLike
                .bind(this)}>
                < Icon name={this.state.icon}/> {this.state.likeCounter}
                {' '}

            </Button>
        );
    }
}

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(QSOLikeButton);
