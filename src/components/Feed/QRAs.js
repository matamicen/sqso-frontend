import React from "react";
import QRA from "./QRA";
import Slider from 'react-slick'

export default class QRAs extends React.Component {

    render() {
        var slidesToShow = Math.min(this.props.qras.length, 4);
        const settings = {
            // className: "center",
            infinite: true,

            
            slidesToShow: slidesToShow,
            
            
        };
        return (

            <Slider {...settings} >
                {this
                    .props
                    .qras
                    .map((qra, i) => <div
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        
                    }}>
                            <QRA key={i} profilepic={qra.profilepic} qra={qra.qra}/>
                    </div>)}

            </Slider>

        );
    }
}