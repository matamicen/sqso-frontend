import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import '../../styles/style.css';
const Right = props => (
  
  <div
    className="slick-next"
    style={{
      ...props.style,
      display: 'block',
      right: '10px',
      zIndex: 1
    }}
    onClick={props.onClick}
  >
    <Button
      circular
      icon="arrow circle right"
      size="mini"
      style={{ background: '#8BD8BD', color: '#243665' }}
    />
  </div>
);

const Left = props => (
  <div
    className="slick-prev"
    style={{ ...props.style, display: 'block', left: '-10px', zIndex: 1 }}
    onClick={props.onClick}
  >
    <Button
      circular
      icon="arrow circle left"
      size="mini"
      style={{ background: '#8BD8BD', color: '#243665' }}
    />
  </div>
);
var settings = {
  // dots: false,
  infinite: false,
  // speed: 500,
  // adaptiveHeight: false,
  slidesToShow: 4,

  slidesToScroll: 4,
  // initialSlide: 0,
  nextArrow: <Right />,
  prevArrow: <Left />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 4,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 360,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
const FollowCarrousel = ({
  t,
  followed,
  follow,
  following,
  followers,
  doFollow,
  currentQRA
}) => (
  <Segment>
    <Header as="h3" attached="top" textAlign="left">
      {t('navBar.exploreUsers')}
    </Header>
    <Slider {...settings}>
      {follow.map((qra, i) => {
        if (currentQRA !== qra.qra)
          return (
            <div
              key={i}
              style={{
                marginTop: '1em',
                marginLeft: '1em'
              }}
            >
              <Card raised>
                <Card.Content>
                  <Card.Header>
                    <div
                      key={qra.qra}
                      style={{ display: 'flex', paddingBottom: '10px' }}
                    >
                      <div
                        style={{
                          flex: '0 1 auto',
                          alignSelf: 'center'
                          // justifyContent: 'center',
                          // paddingRigth: '5px'
                        }}
                      >
                        <Image
                          size="mini"
                          avatar
                          style={{
                            width: '50px',
                            height: '50px'
                          }}
                          src={
                            qra.avatarpic ? qra.avatarpic : '/emptyprofile.png'
                          }
                        />
                      </div>
                      <div
                        style={{
                          flex: '1 1 auto',
                         
                          // paddingRigth: '5px'
                        }}
                      >
                        <Link to={'/' + qra.qra}>
                          <span style={{ fontSize: '1.5rem' }}>{qra.qra}</span>
                          <br />
                          <span style={{ fontSize: '1rem' }}>
                            {qra.firstname ? qra.firstname : ''}
                          </span>
                          <br />
                          <span style={{ fontSize: '1rem' }}>
                            {qra.lastname ? qra.lastname : ''}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Card.Header>

                  <Card.Description>
                    <Icon name="edit outline" />
                    {qra.qsos_counter} {t('exploreUsers.qsosCreated')}
                    {/* <br /> */}
                    {/* <Icon name="user" />
                    {qra.followers_counter} {t('qra.followers')} */}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {(following.some(o => o.qra === qra.qra)|| followed.some(o => o === qra.qra)) ? (
                    <Button
                      basic
                      color="grey"
                      style={{ paddingLeft: '1em', paddingRight: '1em' }}
                    >
                      {t('qra.following')}
                    </Button>
                  ) : (
                    <Button
                      positive
                      onClick={() => doFollow(qra.qra)}
                      style={{ paddingLeft: '1em', paddingRight: '1em' }}
                    >
                      {followers.some(o => o.qra === qra.qra)
                        ? t('qra.followToo')
                        : t('qra.follow')}
                    </Button>
                  )}
                </Card.Content>
              </Card>
            </div>
          );
        else return null;
      })}
    </Slider>
  </Segment>
);
export default withTranslation()(FollowCarrousel);
