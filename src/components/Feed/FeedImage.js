import React from "react";
import PropTypes from 'prop-types';
import {Modal, Segment, Image} from 'semantic-ui-react'

export const FeedImage = ({img, measure}) => 
            <Modal
                trigger={<Image src={img[0].url} 
                    onLoad={measure} />}
                closeIcon>
                 <Modal.Content image scrolling>
                    <Modal.Description>
                        {img.map(m =>
                        <Segment raised textAlign='center'>
                            <Image
                                wrapped
                                centered
                                src={m.url}/>
                            <p>{m.description}</p>
                        </Segment>
                        )}                       
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        
FeedImage.propTypes = {
    img: PropTypes.array.IsRequired,
    measure: PropTypes.func.IsRequired
}