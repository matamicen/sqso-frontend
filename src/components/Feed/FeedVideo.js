import React from 'react';
import '../../styles/style.css';

class FeedVideo extends React.PureComponent {
  render() {
    return (
      <div style={{width: this.props.media.width, height: this.props.media.height}}>
        <video controls>
          <source src={this.props.media.url} type="video/mp4" preload="none" onLoad={()=> this.props.measure()}/>
          {/* <source src="movie.ogg" type="video/ogg" /> */}
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
}

export default FeedVideo;
