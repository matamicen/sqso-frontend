import React, { Fragment } from "react";
import FeedOptionsMenu from "./FeedOptionsMenu";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";

import "../../styles/style.css";
import Slider from "react-slick";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

const styles = {
  textAlign: "center",
  padding: "20px"
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
      centerMode: true
    };

    return (
      <Fragment>
        <Divider />
        <div style={styles}>
          <Slider {...settings}>
            {this.props.img.map(m => (
              <div key={m.idqsos_media}>
                <h3>
                  <img
                    src={m.url}
                    key={m.idqsos_media}
                    alt={m.description}
                    onClick={() => this.open()}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      margin: "0 auto"
                    }}
                  />
                  <p>{m.description}</p>
                </h3>
              </div>
            ))}
          </Slider>

          <Modal closeIcon open={this.state.showModal} onClose={this.close}>
            <Modal.Content image scrolling>
              <Modal.Description>
                {this.props.img.map(m => (
                  <Segment key={m.idqsos_media} raised textAlign="center">
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
                      wrapped
                      centered
                      rounded
                      src={m.url}
                    />

                    <p>{m.description}</p>
                  </Segment>
                ))}
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
      </Fragment>
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
