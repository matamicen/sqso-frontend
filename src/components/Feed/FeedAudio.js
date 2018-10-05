import React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import FeedOptionsMenu from './FeedOptionsMenu';
class FeedAudio extends React.Component {

    constructor() {
        super();
        this.state = {
            showReportContent: false,
            showMessage: false,
            audioNotVisible: true
        }
        this.onClick = this
            .onClick
            .bind(this)
    }

   
    onClick() {
        this.setState({audioNotVisible: false})
    }
    render() {

     
        if (this.props.media.url) {

            if (this.state.audioNotVisible) {
                return (
                    <Button icon onClick={this.onClick}>
                        <Icon name='play circle'/>
                    </Button>
                )
            } else {
                return (
                    <div>

                        < audio ref="audio_tag" src={this.props.media.url} controls autoPlay preload="none" controlsList="nodownload"/>

                        <div
                            style={{
                            float: 'right'
                        }}>
                                 
                            {/* <FeedOptionsMenu idqsos_media={this.props.media.idqsos_media} qso_owner={this.props.qso_owner} idqso={this.props.media.idqso} optionsCaller="FeedAudio"/>                                                    */}
                      </div>
                    </div>
                )
            }
        } else {
            return null
        }

    }
}
Audio.propTypes = {
    url: PropTypes.string.isRequired
}
const mapStateToProps = (state) => ({token: state.default.userData.token, currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FeedAudio);