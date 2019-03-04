import React from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

let instance = 0;

class Ads extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    adslot: PropTypes.string.isRequired
  }

  constructor(props) {
      super(props);
    this.__id = ++instance;
    this.displayAd = this.displayAd.bind(this);
   
  }

  get id() {
    return 'ads-instance-' + (this.props.id || this.__id);
  }

  componentDidMount() {
    console.log(this.id)
    window.googletag.cmd.push(() => {
     
      window.googletag
        .defineSlot(
            this.props.adslot, 
          [this.props.width, this.props.height], 
          this.id
        )
        .addService(window.googletag.pubads());
        window.googletag.enableServices();
        window.googletag.display(this.id);
    });
  }
  render() {
    return (
        
      <div style={{width:this.props.width, height:this.props.height, margin: '0 auto'}}>
        {/* <Waypoint onEnter={this.displayAd} /> */}
        
        <div id={this.id} ></div>
        
      </div>
    );
  }
  displayAd() {
    const id = this.id;
    window.googletag.cmd.push(function() {
        window.googletag.display(id);
    });
  }
}

export default Ads;