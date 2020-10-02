import React from 'react';
import Item from 'semantic-ui-react/dist/commonjs/views/Item';
import '../../styles/style.css';
import { FeedVideo } from './FeedVideo';

class FeedVideoList extends React.Component {
  render() {
    if (this.props.mediaList.length > 0) {
      return (
        <Item.Group style={{ margin: '0px' }}>
          {this.props.mediaList.map((m, i) => (
            <Item key={i}>
              <FeedVideo
                key={i}
                index={i}
                media={m}
                measure={() => {
                  console.log('measure');
                  this.props.measure();
                }}
                qso_owner={this.props.qso_owner}
                recalculateRowHeight={this.props.recalculateRowHeight}
              />
            </Item>
          ))}
        </Item.Group>
      );
    } else {
      return null;
    }
  }
}

export default FeedVideoList;
