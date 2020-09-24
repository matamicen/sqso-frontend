import React from 'react';
import ReactPlayer from 'react-player';
import '../../styles/style.css';
class FeedVideo extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactPlayer
          ref={player => {
            this.player = player;
          }}
          url={this.props.media.url}
          config={{
            file: {
              attributes: {
                crossOrigin: 'anonymous'
              }
            }
          }}
          controls
          light
          onLoadedData={() => this.props.measure()}
          width="100%"
          height="100%"
        />
      </div>
    );
  }
}

export default FeedVideo;
