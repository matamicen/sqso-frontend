import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { bindActionCreators } from 'redux';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import * as Actions from '../../actions';
import '../../styles/style.css';
import FeedOptionsMenu from './FeedOptionsMenu';

const styles = {
  margin: '0px',
  paddingTop: '0px',
  paddingBottom: '0px'
};
// declare component
const Right = props => (
  <div
    className="slick-next"
    style={{
      ...props.style,
      display: 'block',
      right: '-10px'
    }}
    onClick={props.onClick}
  >
    <Button circular icon="arrow circle right" />
  </div>
);

const Left = props => (
  <div
    className="slick-prev"
    style={{ ...props.style, display: 'block', left: '-25px' }}
    onClick={props.onClick}
  >
    <Button circular icon="arrow circle left" />
  </div>
);
const useResize = (myRef, measure) => {
  const [ imageWidth , setWidth] = useState(0);

  const measureAgain = useCallback(measure, []);
  useEffect(() => {
    setWidth(myRef.current.offsetWidth);

    const handleResize = () => {
      measureAgain();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef, measureAgain]);

  return {  imageWidth };
};
// class FeedImage extends React.Component {
export const FeedImage = props => {
  const [showModal, setModal] = useState(false);
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     showModal: false,
  //     error: null
  //   };
  // }
  const componentRef = useRef();
  const {  imageWidth } = useResize(componentRef, props.measure);
  useEffect(() => {
    props.measure();
  });
  var settings = {
    infinite: true,
    dots: false,
    // arrows: true,
    // adaptiveHeight: true,
    speed: 150,
    centerPadding: '0px',
    centerMode: true,
    nextArrow: <Right />,
    prevArrow: <Left />
  };

  return (
    <div style={{ width: '100%' }} ref={componentRef}>
    <Segment basic style={styles} >
      <Slider {...settings} >
        {props.img.map(m => (
          <div key={m.idqsos_media} >
            <h3>
              
              <img
                // className="image"
                src={m.url}
                key={m.idqsos_media}
                alt={m.description ? m.description : 'no description'}
                onClick={() => {
                  if (process.env.REACT_APP_STAGE === 'production')
                    window.gtag('event', 'qsoImageModalOpen_WEBPRD', {
                      event_category: 'qso',
                      event_label: 'imageModalOpen'
                    });
                  setModal(true);
                }}
                onLoad={() => props.measure()}
                style={{
                  // objectFit: 'contain',
                  // width: '100%',
                  width: {  imageWidth },
                  height: (m.height *  imageWidth) / m.width,
                  margin: '0 auto'
                }}
              />

              <p style={{ textAlign: 'center' }}>{m.description}</p>
            </h3>
          </div>
        ))}
      </Slider>

      <Modal
        centered={false}
        closeIcon={{
          style: { top: '0.0535rem', right: '0rem' },
          color: 'black',
          name: 'close'
        }}
        open={showModal}
        onClose={() => setModal(false)}
        style={{ height: '90%', overflowY: 'auto' }}
      >
        <Modal.Content image>
          <Modal.Description>
            {props.img.map(m => (
              <div key={m.idqsos_media} style={{ padding: '1vh' }}>
                {props.isAuthenticated && (
                  <div
                    style={{
                      float: 'right'
                    }}
                  >
                    <FeedOptionsMenu
                      idqsos_media={m.idqsos_media}
                      qso_owner={props.qso_owner}
                      idqso={props.idqso}
                      optionsCaller="FeedImage"
                    />
                  </div>
                )}
                <Image
                  key={m.idqsos_media}
                  centered
                  rounded
                  alt={m.description ? m.description : 'no description'}
                  size="large"
                  src={m.url}
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    margin: '0 auto'
                  }}
                />

                <p style={{ fontSize: '1rem', textAlign: 'center' }}>
                  {m.description}
                </p>
              </div>
            ))}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Segment>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.userData.token,
  isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.userData.currentQRA
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(FeedImage);
