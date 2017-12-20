import QSOFeedItem from './QSOFeedItem'
import React, {PureComponent} from 'react';
import {AutoSizer, List, InfiniteLoader, WindowScroller, CellMeasurer, CellMeasurerCache} from 'react-virtualized'

export default class QSONewsFeed extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            loadedRowCount: 0,
            loadedRowsMap: {},
            scrollToIndex: undefined,
            loadingRowCount: 0,
            overscanRowCount: 10,
            randomScrollToIndex: null,
            rowCount: this.props.list.length,


        };

        this._cache = new CellMeasurerCache({
            fixedWidth: true,
            minHeight: 100,
        });
        this._setRef = this._setRef.bind(this);
        this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
        this._isRowLoaded = this._isRowLoaded.bind(this)
        this._loadMoreRows = this._loadMoreRows.bind(this)
        this._rowRenderer = this._rowRenderer.bind(this)
        this.recalculateRowHeight = this.recalculateRowHeight.bind(this)
    }


    _clearData() {
        this.setState({
            loadedRowCount: 0,
            loadedRowsMap: {},
            loadingRowCount: 0
        })
    }

    _isRowLoaded({index}) {
        // console.log("_isRowLoaded", index, !!this.props.list[index])
        //    return !!this.props.list[index] // STATUS_LOADING or STATUS_LOADED
        return true;
    }

    _loadMoreRows({startIndex, stopIndex}) {
        console.log('load more rows', startIndex, stopIndex);


    }

    _setRef(windowScroller) {
        this._windowScroller = windowScroller;
    }

    _rowRenderer({index, isScrolling, key, parent, style}) {


        let row = this.props.list[index];
   //     console.log("_rowRenderer", index, "-",  row.props.qso.idqsos)
        return (
            <CellMeasurer
             //   ref={(CellMeasurer) => this.cellMeasurer = CellMeasurer}
                cache={this._cache}
                columnIndex={0}
                key={key}
                rowIndex={index}
                parent={parent}
            >
                {({measure}) =>
                    <div
                        style={style}
                        key={key}
                    >
                        <QSOFeedItem
                            key={key}
                            qso={row.props.qso}
                            measure={measure}
                            recalculateRowHeight={this.recalculateRowHeight}
                            index={index}/>
                        <div></div>
                    </div>

                }
            </CellMeasurer>

        )
    }

    _onScrollToRowChange(event) {
        console.log("onScrollToRowChange")
        const {list} = this.props.list;
        let scrollToIndex = Math.min(
            list.length - 1,
            parseInt(event.target.value, 10),
        );

        if (isNaN(scrollToIndex)) {
            scrollToIndex = undefined;
        }
        setTimeout(() => {
            this.setState({scrollToIndex});
        }, 0);

    }
    recalculateRowHeight(index){
        console.log(this.list);
        console.log(index);
 //       console.log(this.cellMeasurer)
  //      this.cellMeasurer.resetMeasurements()
        this._cache.clear(index);
     //   this.measure();
        this.list.recomputeRowHeights(index);

    }
    render() {
        const {

            rowCount,
            overscanRowCount

        } = this.state;
        return (
            <div className="WindowScrollerWrapper">
                <InfiniteLoader
                    isRowLoaded={this._isRowLoaded}
                    loadMoreRows={this._loadMoreRows}
                    rowCount={rowCount}
                    threshold={10}>
                    {({onRowsRendered, registerChild}) => (
                        <WindowScroller
                            ref={(ref) => this._windowScroller = ref}>
                            {({height, isScrolling, onChildScroll, scrollTop}) => (

                                <AutoSizer disableHeight>
                                    {({width}) => (
                                        <List
                                            autoHeight
                                            ref={(list) => this.list = list}
                                            deferredMeasurementCache={this._cache}
                                            height={height}
                                            //      onRowsRendered={onRowsRendered}
                                            //       scrollToIndex={scrollToIndex}
                                            isScrolling={isScrolling}
                                            scrollTop={scrollTop}
                                            onScroll={onChildScroll}
                                            overscanRowCount={overscanRowCount}
                                            rowCount={rowCount}
                                            rowHeight={this._cache.rowHeight}
                                            rowRenderer={this._rowRenderer}
                                            width={width}
                                        />)}
                                </AutoSizer>

                            )}
                        </WindowScroller>
                    )}
                </InfiniteLoader>

            </div>)
    }
}