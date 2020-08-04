import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { bindActionCreators } from "redux";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import * as Actions from "../../actions";
import "../../styles/style.css";
import FeedOptionsMenu from "./FeedOptionsMenu";


const styles = {
  margin: "0px",
  paddingTop: "0px",
  paddingBottom: "0px"
};
// declare component
const Right = props => (
  <div
    className="slick-next"
    style={{
      ...props.style,
      display: "block",
      right: "-10px"
    }}
    onClick={props.onClick}
  >
    <Button circular icon="arrow circle right" />
  </div>
);

const Left = props => (
  <div
    className="slick-prev"
    style={{ ...props.style, display: "block", left: "-25px" }}
    onClick={props.onClick}
  >
    <Button circular icon="arrow circle left" />
  </div>
);
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
      // arrows: true,
      speed: 150,
      centerPadding: "0px",
      centerMode: true,
      nextArrow: <Right />,
      prevArrow: <Left />
    };

    return (
      <Segment basic style={styles}>
        <Slider {...settings}>
          {this.props.img.map(m => (
            <div key={m.idqsos_media}>
              <h3>
                <img
                  // className="image"
                  src={m.url}
                  key={m.idqsos_media}
                  alt={m.description ? m.description : "no description"}
                  onClick={() => this.open()}
                  onLoad={()=> this.props.measure()}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    margin: "0 auto"
                  }}
                />

                <p style={{textAlign: "center"}}>{m.description}</p>
              </h3>
            </div>
          ))}
        </Slider>

        <Modal
          centered={false}
          closeIcon={{
            style: { top: "0.0535rem", right: "0rem" },
            color: "black",
            name: "close"
          }}
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
                    size="large"
                    src={m.url}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      margin: "0 auto"
                    }}
                  />

                  <p style={{fontSize: 'medium', textAlign :"center"}}>{m.description}</p>
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
