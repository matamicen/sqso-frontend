import React from "react";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import QRAProfile from './QRAProfile'
import * as Actions from '../actions/Actions';


class QRAProfileContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            fetchingData: false,
            followed: false
        }
        ;
    }

    componentWillMount() {
        if (!this.props.fetchingQRA && !this.props.QRAFetched) {
            // this.setState({fetchingData: true});
            this.props.actions.doFetchQRA(this.props.match.params.qra, this.props.token);
        }
    }

    shouldComponentUpdate(nextProps) {
        //     console.log("shouldComponentUpdate FEEDQRA" + this.props.QRAFetched);
        return this.props.QRAFetched;
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
        let followed = this.props.state.default.userData.following.filter(o => o.qra === this.props.state.router.location.pathname.substr(1));
        if (followed) {
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
        if (this.props.fetchingQRA || !this.props.QRAFetched) return null;

       // console.log("render")
        let followed = this.props.state.default.userData.following.includes(this.props.match.params.qra);


        let buttonText;
        if (followed) {
            //  this.setState({followed: true});
            buttonText = "Unfollow";
        }
        else {
            buttonText = "Follow";
        }
        console.log(this.props.qra);
        let qraInfo = null;
        if (this.props.qra) qraInfo= this.props.qra.qra;
        return <QRAProfile qraInfo={qraInfo} qra={this.props.qra}/>;
        /*return (
            <div>
                <Grid centered columns={3}>

                    <Grid.Column>
                        <QRAProfile/>
                        <Card
                            image='/assets/images/avatar/large/elliot.jpg'
                            header={this.props.match.params.qra}
                            meta='Friend'
                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                            extra={extra}
                        />
                        <Button positive={!followed}
                                onClick={this.handleButtonClick.bind(this)}> {buttonText} </ Button>
                    </Grid.Column>
                </Grid>
            </ div>

        );*/
    }
}

const mapStateToProps = (state, ownProps) => ({
    state: state,
    //qra: state.default.userData.qra,
    token: state.default.userData.token,
    fetchingQRA: state.default.FetchingQRA,
    QRAFetched: state.default.QRAFetched,
    qra: state.default.qra

});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps, null, {
        pure: false
    })(QRAProfileContainer));