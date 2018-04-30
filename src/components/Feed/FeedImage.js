import React from "react";

import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal'

export const FeedImage = ({img, measure}) => (
    <Modal
        trigger = {<Image size='large' centered src = {
        img[0].url
    }
    onLoad = {
        measure
    } />}    
        closeIcon>
        <Modal.Content image scrolling>
            <Modal.Description>
               
                {img.map(m => <Segment key={m.idqsos_media} raised textAlign='center'>
                    <Image key={m.idqsos_media} wrapped centered src={m.url}/>
                    <p>{m.description}</p>
                </Segment>)}
            </Modal.Description>
        </Modal.Content>
    </Modal>
)