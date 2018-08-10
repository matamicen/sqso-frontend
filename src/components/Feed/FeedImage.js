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
        var height;
        let elWidth = '700px';
        console.log(this.props.img[0])
        if (this.props.img[0].width > 0) {      
        
        let ratio = elWidth / this.props.img[0].width;      
        height = this.props.img[0].height * ratio;
        height = height + 'px';

        } 
        height = '80vh';
        console.log(elWidth + height)
        return (
            <div style={{            
                width: {elWidth},                       
                 minHeight: height
               
             }}>
            <Modal                
                closeIcon               
                trigger=
                { 
                  
                   <Image  centered 
                  
                   src = {  this.props.img[0].url } 
                //    onLoad = { this.props.measure } 
                   onClick={this.handleOpenModal}
                   style={{            
                    width:  {elWidth},                       
                     minHeight : {height}
                   
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
            </div>

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

