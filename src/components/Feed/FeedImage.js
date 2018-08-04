import React from "react";
import FeedOptionsMenu from './FeedOptionsMenu'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal'


import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';

class FeedImage extends React.Component {
    
    render() {  
       
        
        return (
            <Modal                
                closeIcon               
                trigger=
                { 
                   <Image  centered 
                   src = { this.props.img[0].url } 
                //    onLoad = { this.props.measure } 
                   onClick={this.handleOpenModal}
                   style={{
                    'height':'70vh',
                    'minHeight':'70vh',
                    'width': 'auto'

                    
                    }}
                   />}
                    >
                  
                
                <Modal.Content image scrolling>
                    <Modal.Description>
                        {this
                            .props
                            .img
                            .map(m => 
                            <Segment key={m.idqsos_media} raised textAlign='center'>
                                <div
                                            style={{
                                            float: 'right'
                                        }}>                                    
                                            <FeedOptionsMenu idqsos_media={m.idqsos_media} qso_owner={this.props.qso_owner} idqso={this.props.idqso} optionsCaller="FeedImage"/>                                    
                                        </div>
                                <Image key={m.idqsos_media} wrapped centered src={m.url}/>
                                
                                <p>{m.description}</p>
                            </Segment>)}
                    </Modal.Description>
                </Modal.Content>
            </Modal>

        )
    }
}

const mapStateToProps = (state) => (
    
    {token: state.default.userData.token,  
        currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FeedImage);

