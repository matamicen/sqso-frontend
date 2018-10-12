import React from 'react';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import Feed from 'semantic-ui-react/dist/commonjs/views/Feed'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
import QSOFeedItem from "./FeedItem";
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
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
            .doFetchQSO(this.props.link.GUID_URL);
            this.setState({showModal: true});
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.qso) {            
            this.setState({active: false})
        }
    }
    close = () => {
        this.setState({showModal: false})
        this.setState({active: false})
        this
            .props
            .actions
            .doClearQSO();
    }
    render() {
        return (
            <div>

            <Modal
                basic
                closeIcon
                open={this.state.showModal}
                onClose={this
                .close
                .bind(this)}
                onOpen={this
                .onOpenModal
                .bind(this)}
                trigger={< a > QSO link created by {
                this.props.link.qra
            }.Click here for more details. </a>}>
                {!this.props.qso && <Loader/>}
                <Modal.Content>
                    <Modal.Description>
                        <Dimmer active={this.state.active}>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        {this.props.qso && <Grid>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <Container fluid>
                                        <Feed>
                                            <QSOFeedItem key={this.props.link.idqso_rel} qso={this.props.qso}/>
                                        </Feed>
                                    </Container>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
}
                    </Modal.Description>
                </Modal.Content>
            </Modal>
         </div>
        )

    }
}
const mapStateToProps = (state) => ({qso: state.default.qso, FetchingQSO: state.default.FetchingQSO});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedLink));