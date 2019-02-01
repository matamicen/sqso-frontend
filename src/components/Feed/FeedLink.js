import React, {Fragment} from 'react';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader'
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import QSOFeedItem from "./FeedItem";
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
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
            .doFetchQsoLink(this.props.link.GUID_URL);

    }
    static getDerivedStateFromProps(props, state) {    
        if (props.qso_link) 
            return {active: false, showModal: true}
        return null;
    }

    // componentWillReceiveProps(nextProps) {     if (nextProps.qso_link) {
    // this.setState({active: false})         this.setState({showModal: true}); } }
    close = () => {       
console.log("close")
        this.setState({showModal: false})
        this.setState({active: false})
        this
                    .props
                    .actions
                    .doClearQsoLink()
    }
    render() {
        console.log(this.state.showModal)
        return (
            <Fragment>
                <Dimmer active={this.state.active} page>
                    <Loader>Loading</Loader>
                </Dimmer>
                
                <Segment>
                    <Image
                        src={this.props.link.avatarpic}
                        size='mini'
                        avatar
                        style={{
                        width: '35px',
                        height: '35px'
                    }}/> {this.props.link.qra} created a linked QSO. <Button size='mini' onClick={()=> this.onOpenModal()}>See Details</Button>
                
                <Modal
                    
 
                    closeIcon
                    open={this.state.showModal}
                    onClose={()=>{
                    this
                    .close()}}
                    
                    >

                    <Modal.Content>
                        <Modal.Description>

                            {this.props.qso_link && <QSOFeedItem key={this.props.link.idqso_rel} qso={this.props.qso_link} type={this.props.qso_link.type}/>
}
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
                </Segment>
            </Fragment>
        )

    }
}
const mapStateToProps = (state) => ({qso_link: state.default.qso_link, FetchingQSO: state.default.FetchingQSO});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedLink));