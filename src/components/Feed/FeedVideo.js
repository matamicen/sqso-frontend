import React from 'react';
// import ReactPlayer from 'react-player';
// import '~video-react/dist/video-react.css';
import videojs from 'video.js';
import '../../styles/style.css';
class FeedVideo extends React.PureComponent {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(
      this.videoNode,
      this.props,
      function onPlayerReady() {
        // this.aspectRatio('4:3');
        console.log('onPlayerReady', this);
      }
    );
    this.player.on('ready', function() {
      //   this.props.measure()
    });
  }
  render() {
    return (
      <div className="data-vjs-player">
        <video
          ref={node => (this.videoNode = node)}
          id="my-video"
          className="video-js"
          controls
          onLoadStart={() => this.props.measure()}
          onCanPlay={() => this.props.measure()}
          preload="auto"
          // responsive="true"
          // fluid="true"
          width="auto"
          height="auto"
          // poster="MY_VIDEO_POSTER.jpg"
          // data-setup="{}"
        >
          <source src={this.props.media.url} type="video/mp4" />
          {/* <source src="MY_VIDEO.webm" type="video/webm" /> */}
          {/* <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank"
        >supports HTML5 video</a
      >
    </p> */}
        </video>
        {/* <Player
          onLoadStart={() => this.props.measure()}
          onCanPlay={() => this.props.measure()}
          controls
          ref={player => {
            this.player = player;
          }}
        >
          <source src={this.props.media.url} />
        </Player> */}
        {/* <ReactPlayer
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
        />*/}
      </div>
    );
  }
}

export default FeedVideo;
