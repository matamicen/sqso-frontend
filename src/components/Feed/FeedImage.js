import React from "react";
import FeedOptionsMenu from "./FeedOptionsMenu";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";

import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";

import "../../styles/style.css";
import Slider from "react-slick";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

const styles = {
  margin: "0px",
  paddingTop: "0px",
  paddingBottom: "0px"
};

class FeedImage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
      error: null
    };
  }

  close = () => this.setState({ showModal: false });
  open = () => this.setState({ showModal: true });
  render() {
    var settings = {
      infinite: true,
      dots: true,
      arrows: true,
      speed: 150,
      centerPadding: "0px",
      centerMode: true
    };

    return (
      <Segment basic style={styles}>
        <Slider {...settings}>
          {this.props.img.map(m => (
            <div key={m.idqsos_media}>
              <h3>
                <img
                  className="image"
                  src={m.url}
                  key={m.idqsos_media}
                  alt={m.description ? m.description : "no description"}
                  onClick={() => this.open()}
                  style={{
                    objectFit: "cover",
                    // width: "100%",
                    margin: "0 auto"
                  }}
                />

                <p>{m.description}</p>
              </h3>
            </div>
          ))}
        </Slider>

        <Modal
          centered={false}
          closeIcon
          open={this.state.showModal}
          onClose={this.close}
          style={{ height: "90%", overflowY: "auto" }}
        >
          <Modal.Content image>
            <Modal.Description>
              {this.props.img.map(m => (
                <div key={m.idqsos_media} style={{ padding: "1vh" }}>
                  {this.props.isAuthenticated && (
                    <div
                      style={{
                        float: "right"
                      }}
                    >
                      <FeedOptionsMenu
                        idqsos_media={m.idqsos_media}
                        qso_owner={this.props.qso_owner}
                        idqso={this.props.idqso}
                        optionsCaller="FeedImage"
                      />
                    </div>
                  )}
                  <Image
                    key={m.idqsos_media}
                    centered
                    rounded
                    alt={m.description ? m.description : "no description"}
                    size="big"
                    src={m.url}
                  />

                  <p>{m.description}</p>
                </div>
              ))}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Segment>
    );
  }
}

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
