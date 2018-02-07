import React from "react";
import PropTypes from 'prop-types';
import {Modal, Segment, Image} from 'semantic-ui-react'

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
                {img.map(m => <Segment raised textAlign='center'>
                    <Image key={m.url} wrapped centered src={m.url}/>
                    <p>{m.description}</p>
                </Segment>)}
            </Modal.Description>
        </Modal.Content>
    </Modal>
)