import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import '../../styles/style.css';
import NewsFeed from './NewsFeedPresentational';

class NewsFeedContainer extends React.PureComponent {
  state = { qsos: this.props.qsos };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.qsos &&
      JSON.stringify(this.props.qsos) !== JSON.stringify(prevProps.qsos)
    )
      this.setState({ qsos: this.props.qsos });
  }
  render() {
    let qsos = [];
    // if (this.props.qsos && this.props.qsos.length > 0) {
    for (let i = 0; i < this.state.qsos.length; i++) {
      qsos.push({
        qso: this.state.qsos[i],
        type: this.state.qsos[i].type,
        source: this.state.qsos[i].source ? this.state.qsos[i].source : null
      });
    }
    // }

    return (
      <Fragment>
        {this.state.qsos && (
          <NewsFeed
            list={qsos}
            fetchingQSOS={this.props.fetchingQSOS}
            qsosFetched={this.props.qsosFetched}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  qsos: state.qsos,
  FetchingQSOS: state.FetchingQSOS,
  qsosFetched: state.qsosFetched,
  authenticating: state.userData.authenticating,
  isAuthenticated: state.userData.isAuthenticated,
  token: state.userData.token,
  public: state.userData.public
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsFeedContainer);
