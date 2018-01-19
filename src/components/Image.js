import React from 'react';
import {Picture} from './Picture'
import { Button, Modal } from 'semantic-ui-react'
import Slider from 'react-slick'
export class Image extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
            const settings = {
      dots: true,   
      slidesToShow: 1,
          infinite: true,   
        //  adaptiveHeight: true,
          arrows: true, 
         // autoplay: true, 
          centerMode: true,

 slidesToScroll: 1
    };
        if (this.props.img) {
            return (
                <Modal trigger={<Button><Picture
                                img='https://s3.amazonaws.com/sqso/us-east-1:29a10ff3-e4d7-45cf-a432-7821674b8d77/images/2018-01-15T141639.jpg'
                                measure={this.props.measure}
                            /></Button>} closeIcon>
                   
                    <Modal.Content>
                    <Slider {...settings}>
                        <div><Picture
                                img='https://s3.amazonaws.com/sqso/us-east-1:29a10ff3-e4d7-45cf-a432-7821674b8d77/images/2018-01-15T141639.jpg'
                                measure={this.props.measure}
                            /></div>
                        <div>  <Picture
                                img='https://s3.amazonaws.com/sqso/us-east-1:29a10ff3-e4d7-45cf-a432-7821674b8d77/images/2018-01-15T125628.jpg'
                            /></div>
                      </Slider>
                    </Modal.Content>                   
                </Modal>
        
   
            )
        }
        else {
            return null
        }

    }
}