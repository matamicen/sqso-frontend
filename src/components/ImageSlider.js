import React from 'react';


import Slider from 'react-slick'
export default class ImageSlider extends React.Component {
     render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className='container'>
        <Slider {...settings}>

        </Slider>
      </div>
    );
  }
}
