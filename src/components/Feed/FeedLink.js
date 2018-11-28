import React from 'react';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader'

import QSOFeedItem from "./FeedItem";
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';

class FeedLink extends React.Component {
    state = {
        active: false,
        showModal: false

    }
    onOpenModal() {
        this.setState({active: true})
        this
            .props
            .actions
            .doFetchQsoLink(this.props.link.GUID_URL);
        this.setState({showModal: true});
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.qso_link) {
            this.setState({active: false})
        }
    }
    close = () => {
        this.setState({showModal: false})
        this.setState({active: false})
        this
            .props
            .actions
            .doClearQsoLink();
    }
    render() {
        return (
            
                <Modal
                    
                    closeIcon
                    open={this.state.showModal}
                    onClose={this
                    .close
                    .bind(this)}
                    onOpen={this
                    .onOpenModal
                    .bind(this)}
                    trigger={< p > QSO link created by {
                    this.props.link.qra
                }. Click here for more details. </p>}>
                    {!this.props.qso_link && <Loader/>}
                    <Modal.Content>
                        <Modal.Description>
                            <Dimmer active={this.state.active}>
                                <Loader>Loading</Loader>
                            </Dimmer>
                            {this.props.qso_link && <QSOFeedItem key={this.props.link.idqso_rel} qso={this.props.qso_link}/>
}
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            
        )

    }
}
const mapStateToProps = (state) => ({qso_link: state.default.qso_link, FetchingQSO: state.default.FetchingQSO});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedLink));