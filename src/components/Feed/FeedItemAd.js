import React from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import '../../styles/style.css';
import Ad from '../Ad/Ad';

export default class FeedItemAd extends React.PureComponent {
  render() {
    return (
      <Segment raised secondary style={{ padding: "none" }}>
        <div className="adDesktop">
          <Ad
            adslot="/22031658057/Home/home_feed"
            width={600}
            height={500}
            // id="div-ads-instance-home-feed"
            displayOnly={false}
          />
        </div>
        <div className="adMobile">
          <Ad
            adslot="/22031658057/Home/home_feed"
            width={300}
            height={250}
            // id="div-ads-instance-home-feed"
            displayOnly={false}
          />
        </div>
      </Segment>
    );
  }
}
