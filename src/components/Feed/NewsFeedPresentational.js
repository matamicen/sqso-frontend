import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer';
import List from 'react-virtualized/dist/commonjs/List';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import '../../styles/style.css';
import FeedItem from './FeedItem';
let cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 40
});
class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    var list = this.props.list;
    this.state = {
      loadedRowCount: 0,
      loadedRowsMap: {},
      scrollToIndex: undefined,
      loadingRowCount: 0,
      overscanRowCount: 3,
      list: list,
      randomScrollToIndex: null,
      rowCount: list.length,
      _list: null
    };
    this._ref = null;
    this._cache = cache;
    this._setRef = this._setRef.bind(this);
    this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
    // this._isRowLoaded = this
    //     ._isRowLoaded
    //     .bind(this)
    // this._loadMoreRows = this
    //     ._loadMoreRows
    //     .bind(this)
    this._rowRenderer = this._rowRenderer.bind(this);
    this.recalculateRowHeight = this.recalculateRowHeight.bind(this);
    this.showComments = this.showComments.bind(this);
    this._setListRef = this._setListRef.bind(this);
  }

  _clearData() {
    this.setState({ loadedRowCount: 0, loadedRowsMap: {}, loadingRowCount: 0 });
  }

  // _isRowLoaded({index}) {
  //     return true;
  // }

  // _loadMoreRows({startIndex, stopIndex}) {
  //     // console.log('load more rows', startIndex, stopIndex);

  // }

  _setRef(windowScroller) {
    this._windowScroller = windowScroller;
  }

  _rowRenderer({ index, isScrolling, key, parent, style }) {
    let row = this.state.list[index];
    if (row === null || row === undefined) return null;

    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure }) => (
          <div style={style} key={key}>
            <div style={{ marginBottom: '1vh' }}>
              <FeedItem
                key={key}
                qso={row.qso}
                type={row.type}
                ad={row.ad}
                source={row.source}
                measure={measure}
                recalculateRowHeight={this.recalculateRowHeight}
                showComments={index => this.showComments(index)}
                index={index}
              />
            </div>
          </div>
        )}
      </CellMeasurer>
    );
  }

  _onScrollToRowChange(event) {
    
    const { list } = this.state.list;
    let scrollToIndex = Math.min(
      list.length - 1,
      parseInt(event.target.value, 10)
    );
console.log(scrollToIndex)
    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined;
    }
    setTimeout(() => {
      this.setState({ scrollToIndex });
    }, 0);
  }
  _setListRef = ref => {
    this.setState({ _list: ref });
  };
  showComments = index => {
    let localList = this.state.list;
    localList[index].qso.showComments = !this.state.list[index].qso
      .showComments;
    this.setState({ list: localList });
    if (!localList[index].qso.showComments) this.recalculateRowHeight();
  };

  recalculateRowHeight(index) {
    this._cache.clearAll();

    // this
    //     ._list
    //     .recomputeRowHeights(index);
    this.state._list.forceUpdateGrid();
  }
  static getDerivedStateFromProps(props, state) {
    if (props.list.length !== state.list.length) {
     
      // this._cache.clearAll();
      // this._list.recomputeRowHeights();
      state._list.forceUpdateGrid();
    }
    if (props.list) return { list: props.list };
    //Default
    return null;
  }

  componentDidUpdate(prevProps, prevState) {

    if (
      prevProps.list.length > 0 &&
      prevProps.list.length !== prevState.list.length &&
      ((prevProps.qsosFetched && !prevProps.fetchingQsos) ||
        (prevProps.QRAFetched && !prevProps.FetchingQRA))
    ) {
      this._cache.clearAll();
      // this._list.recomputeRowHeights();
      this.state._list.forceUpdateGrid();
    }
  }
  componentWillUnmount() {
    this.setState({ list: [] });
  }
  render() {
    
    const { rowCount, overscanRowCount } = this.state;

    // if (
    //   this.props.list.length === 0 &&
    //   this.props.qsosFetched &&
    //   !this.props.fetchingQsos
    // ) {
    //   return (
    //     <Message negative>
    //       <Message.Header>{t('global.feedEmpty')}</Message.Header>
    //       <p>{t('qra.unfollow')}
    //         You are not following any CallSign, so we dont have anything to show
    //         you here.
    //       </p>
    //       <p>{t('qra.unfollow')}
    //         To start following a Callsign click <Link to={'/follow'}>{t('qra.unfollow')}here</Link>
    //       </p>
    //       <p>{t('qra.unfollow')}
    //         To see the tutorials click <Link to={'/tutorials'}>{t('qra.unfollow')}here</Link>
    //       </p>
    //     </Message>
    //   );
    // }

    return (
      <div className="WindowScrollerWrapper">
        <WindowScroller
          ref={ref => (this._windowScroller = ref)}
          style={{ overflow: 'visible' }}
        >
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <AutoSizer disableHeight style={{ overflow: 'visible' }}>
              {({ width }) => (
                <List
                  autoHeight
                  ref={this._setListRef}
                  deferredMeasurementCache={this._cache}
                  height={height}
                  isScrolling={isScrolling}
                  scrollTop={scrollTop}
                  // scrollToRow={this.state.scrollToIndex}
                  onScroll={onChildScroll}
                  overscanRowCount={overscanRowCount}
                  rowCount={rowCount}
                  rowHeight={this._cache.rowHeight}
                  rowRenderer={this._rowRenderer}
                  width={width}
                  style={{ overflow: 'visible' }}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>
    );
  }
}
NewsFeed.propTypes = {
  list: PropTypes.array.isRequired
};
export default withTranslation()(NewsFeed);
