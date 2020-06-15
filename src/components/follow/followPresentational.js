import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import "../../styles/style.css";
import Ad from "../Ad/Ad";
import AppNavigation from "../Home/AppNavigation";


var settings = {
  // dots: false,
  infinite: false,
  // speed: 500,
  // adaptiveHeight: false,
  slidesToShow: 4,

  slidesToScroll: 4,
  // initialSlide: 0,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
const qraFollowRecommendPresentational = ({t, active, follow, following, doFollow}) => (
  <div className="profile-container">
    <Dimmer active={active} page>
      <Loader>{t('qra.loading')}</Loader>
    </Dimmer>
    {/* <Dimmer
      active={props.adActive}
      onClick={props.handleClose}
      page
      // verticalAlign="center"
    >
      <Ad
        adslot="/21799560237/qraDetail/intersitial"
        width={640}
        height={480}
        id="qradetail-intersitial"
        displayOnly={true}
      />
    </Dimmer> */}
    <div className="site-header">
      <AppNavigation />
    </div>
    <div className="site-left">
      <Ad
        adslot="/21799560237/qraDetail/left"
        width={160}
        height={600}
        id="qradetail-left"
        displayOnly={true}
      />
    </div>

    <div className="profile-main">
      <Header as="h1" attached="top" textAlign="center">
        Who to Follow
      </Header>
      {follow.followingMe && follow.followingMe.length > 0 && (
        <Segment>
          <Header as="h3" block>
            Callsigns that follow you
          </Header>
          <Slider {...settings}>
            {follow.followingMe.map((qra, i) => (
              <div key={i}>
                <Card raised style={{ height: "14em" }}>
                  <Card.Content>
                    <Card.Header style={{ width: "max-content" }}>
                      <Link to={"/" + qra.qra}>{qra.qra}</Link>
                      <Image floated="right" size="mini" src={qra.avatarpic} />
                    </Card.Header>
                    <Card.Meta>
                      {(qra.firstname ? qra.firstname : "") +
                        " " +
                        (qra.lastname ? qra.lastname : "")}
                    </Card.Meta>
                    <Card.Description>
                      <Icon name="microphone" />
                      {qra.qsos_counter} Qsos Created
                      <br />
                      <Icon name="user" />
                      {qra.followers_counter} Followers
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      {following.some(o => o.qra === qra.qra) ? (
                        <Button basic color="grey">
                          Following
                        </Button>
                      ) : (
                        <Button
                          basic
                          color="green"
                          onClick={() => doFollow(qra.qra)}
                        >
                          Follow
                        </Button>
                      )}
                    </div>
                  </Card.Content>
                </Card>
              </div>
            ))}
          </Slider>
        </Segment>
      )}
      {follow.taggedMe && follow.taggedMe.length > 0 && (
        <Segment>
          <Header as="h3" block>
            Callsigns that already tagged you
          </Header>
          <Slider {...settings}>
            {follow.taggedMe.map((qra, i) => (
              <div key={i}>
                <Card raised style={{ height: "14em" }}>
                  <Card.Content>
                    <Card.Header style={{ width: "max-content" }}>
                      <Link to={"/" + qra.qra}>{qra.qra}</Link>
                      <Image floated="right" size="mini" src={qra.avatarpic} />
                    </Card.Header>
                    <Card.Meta>
                      {(qra.firstname ? qra.firstname : "") +
                        " " +
                        (qra.lastname ? qra.lastname : "")}
                    </Card.Meta>
                    <Card.Description>
                      <Icon name="microphone" />
                      {qra.qsos_counter} Qsos Created
                      <br />
                      <Icon name="user" />
                      {qra.followers_counter} Followers
                    </Card.Description>
                  </Card.Content>

                  <Card.Content extra>
                    <div className="ui two buttons">
                      {following.some(o => o.qra === qra.qra) ? (
                        <Button basic color="grey">
                          Following
                        </Button>
                      ) : (
                        <Button
                          basic
                          color="green"
                          onClick={() => doFollow(qra.qra)}
                        >
                          Follow
                        </Button>
                      )}
                    </div>
                  </Card.Content>
                </Card>
              </div>
            ))}
          </Slider>
        </Segment>
      )}
      {follow.taggedByMe && follow.taggedByMe.length > 0 && (
        <Segment>
          <Header as="h3" block>
            Callsigns that you have already tagged
          </Header>
          <Slider {...settings}>
            {follow.taggedByMe.map((qra, i) => (
              <div
                key={i}
                style={{
                  marginTop: "1em",
                  marginLeft: "1em",
                  paddingRight: "1em",
                  padding: "5px"
                }}
              >
                <Card raised style={{ height: "14em" }}>
                  <Card.Content>
                    <Card.Header style={{ width: "max-content" }}>
                      <Link to={"/" + qra.qra}>{qra.qra}</Link>
                      <Image
                        floated="right"
                        size="mini"
                        src={
                          qra.avatarpic ? qra.avatarpic : "/emptyprofile.png"
                        }
                      />
                    </Card.Header>
                    <Card.Meta>
                      {(qra.firstname ? qra.firstname : "") +
                        " " +
                        (qra.lastname ? qra.lastname : "")}
                    </Card.Meta>
                    <Card.Description>
                      <Icon name="microphone" />
                      {qra.qsos_counter} Qsos Created
                      <br />
                      <Icon name="user" />
                      {qra.followers_counter} Followers
                    </Card.Description>
                  </Card.Content>

                  <Card.Content extra>
                    <div className="ui two buttons">
                      {following.some(o => o.qra === qra.qra) ? (
                        <Button basic color="grey">
                          Following
                        </Button>
                      ) : (
                        <Button
                          basic
                          color="green"
                          onClick={() => doFollow(qra.qra)}
                        >
                          Follow
                        </Button>
                      )}
                    </div>
                  </Card.Content>
                </Card>
              </div>
            ))}
          </Slider>
        </Segment>
      )}
      {follow.topFollowed && (
        <Segment>
          <Header as="h3" block>
            Callsigns most followed
          </Header>
          <Slider {...settings}>
            {follow.topFollowed.map((qra, i) => (
              <div
                key={i}
                style={{
                  marginTop: "1em",
                  marginLeft: "1em"
                }}
              >
                <Card raised style={{ height: "14em" }}>
                  <Card.Content>
                    <Card.Header style={{ width: "max-content" }}>
                      <Link to={"/" + qra.qra}>{qra.qra}</Link>
                      <Image
                        floated="right"
                        size="mini"
                        src={
                          qra.avatarpic ? qra.avatarpic : "/emptyprofile.png"
                        }
                      />
                    </Card.Header>

                    <Card.Meta>
                      {(qra.firstname ? qra.firstname : "") +
                        " " +
                        (qra.lastname ? qra.lastname : "")}
                    </Card.Meta>
                    <Card.Description>
                      <Icon name="microphone" />
                      {qra.qsos_counter} Qsos Created
                      <br />
                      <Icon name="user" />
                      {qra.followers_counter} Followers
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      {following.some(o => o.qra === qra.qra) ? (
                        <Button basic color="grey">
                          Following
                        </Button>
                      ) : (
                        <Button
                          basic
                          color="green"
                          onClick={() => doFollow(qra.qra)}
                        >
                          Follow
                        </Button>
                      )}
                    </div>
                  </Card.Content>
                </Card>
              </div>
            ))}
          </Slider>
        </Segment>
      )}
    </div>

    <div className="site-right">
      <Ad
        adslot="/21799560237/qraDetail/right"
        width={160}
        height={600}
        id="qradetail-right"
        displayOnly={true}
      />
    </div>
  </div>
);
export default qraFollowRecommendPresentational;
