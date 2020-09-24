import React from 'react';
import ReactPlayer from 'react-player';
import '../../styles/style.css';
class FeedVideo extends React.PureComponent {
  render() {
    return (
      <div>
        {/* <video controls>
          <source src={this.props.media.url} type="video/mp4" preload="none" onLoad={()=> this.props.measure()}/>
          {/* <source src="movie.ogg" type="video/ogg" /> */}
        {/* Your browser does not support the video tag. */}
        {/* </video>  */}
        <ReactPlayer
          url={this.props.media.url}
          controls
          light
          // width="100%"
          // height="100%"
        />
      </div>
    );
  }
}

export default FeedVideo;
