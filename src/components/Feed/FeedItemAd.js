import React from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import '../../styles/style.css';
import Ad from '../Ad/Ad';

export default class FeedItemAd extends React.PureComponent {
  render() {
    return (
      <Segment raised secondary>
        <Ad
          adslot="/22031658057/Home/home_feed"
          width={336}
          height={280}
          id="div-ads-instance-home-feed"
          displayOnly={true}
        />
      </Segment>
    );
  }
}
