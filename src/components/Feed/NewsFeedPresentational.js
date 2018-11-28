import FeedItem from './FeedItem'
import FeedItemShare from "./FeedItemShare"
import React from 'react';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
// import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'
import {CellMeasurer} from 'react-virtualized/dist/commonjs/CellMeasurer'
import {CellMeasurerCache} from 'react-virtualized/dist/commonjs/CellMeasurer'

import PropTypes from "prop-types";
export default class NewsFeed extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            loadedRowCount: 0,
            loadedRowsMap: {},
            scrollToIndex: undefined,
            loadingRowCount: 0,
            overscanRowCount: 10,
            randomScrollToIndex: null,
            rowCount: this.props.list.length
        };
      
        this._cache = new CellMeasurerCache({fixedWidth: true, minHeight: 100});
        this._setRef = this
            ._setRef
            .bind(this);
        this._onScrollToRowChange = this
            ._onScrollToRowChange
            .bind(this);
        this._isRowLoaded = this
            ._isRowLoaded
            .bind(this)
        this._loadMoreRows = this
            ._loadMoreRows
            .bind(this)
        this._rowRenderer = this
            ._rowRenderer
            .bind(this)
        this.recalculateRowHeight = this
            .recalculateRowHeight
            .bind(this)
    }

    _clearData() {
        this.setState({loadedRowCount: 0, loadedRowsMap: {}, loadingRowCount: 0})
    }

    _isRowLoaded({index}) {
        return true;
    }

    _loadMoreRows({startIndex, stopIndex}) {
        // console.log('load more rows', startIndex, stopIndex);

    }

    _setRef(windowScroller) {
        this._windowScroller = windowScroller;
    }

    _rowRenderer({index, isScrolling, key, parent, style}) {

        let row = this.props.list[index];
        if (row === null) return null;
        return (
            
            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={key}
                rowIndex={index}
                parent={parent}>
                {({measure}) => {
                    this.measure = measure.bind(this);
                return (<div style={style} key={key}>
                
                    
                            
                                {
                                 row.props.qso.type !== 'SHARE'    &&                                
                                <FeedItem
                                    key={key}
                                    qso={row.props.qso}
                                    measure={measure}
                                    recalculateRowHeight={this.recalculateRowHeight}
                                    index={index}/>
                                }
                                 {
                                 row.props.qso.type ==='SHARE'    &&                                
                                <FeedItemShare
                                    key={key}
                                    qso={row.props.qso}
                                    measure={measure}
                                    recalculateRowHeight={this.recalculateRowHeight}
                                    index={index}/>
                                }
                                <br/>
                         
                </div>)}
}
            </CellMeasurer>

        )
    }

    _onScrollToRowChange(event) {

        const {list} = this.props.list;
        let scrollToIndex = Math.min(list.length - 1, parseInt(event.target.value, 10),);

        if (isNaN(scrollToIndex)) {
            scrollToIndex = undefined;
        }
        setTimeout(() => {
            this.setState({scrollToIndex});
        }, 0);

    }
    _setListRef = ref => {
        this._list = ref;
        
      };
    recalculateRowHeight(index) {
        
        this
            ._cache
            .clear(index);
            
        this
            ._list
            .recomputeRowHeights(index);
            // this._list.forceUpdate()

    }   
    render() {
        const {rowCount, overscanRowCount} = this.state;
        
        return (
            <div className="WindowScrollerWrapper" >
                {/* <InfiniteLoader
                    isRowLoaded={this._isRowLoaded}
                    loadMoreRows={this._loadMoreRows}
                    rowCount={rowCount}
                    threshold={10}>
                    {({onRowsRendered, registerChild}) => ( */}
                        <WindowScroller ref={(ref) => this._windowScroller = ref}>
                            {({height, isScrolling, onChildScroll, scrollTop}) => (

                                <AutoSizer disableHeight>
                                    {({width}) => (
                                    <List
                                        autoHeight
                                        ref={this._setListRef}
                                        deferredMeasurementCache={this._cache}
                                        height={height}
                                        isScrolling={isScrolling}
                                        scrollTop={scrollTop}
                                        onScroll={onChildScroll}
                                        overscanRowCount={overscanRowCount}
                                        rowCount={rowCount}
                                        rowHeight={this._cache.rowHeight}
                                        rowRenderer={this._rowRenderer}
                                        width={width}/>)}
                                </AutoSizer>

                            )}
                        </WindowScroller>
                    {/* )} */}
                {/* </InfiniteLoader> */}

            </div>
        )
    }
}
NewsFeed.propTypes = {
    list: PropTypes.array.isRequired
}