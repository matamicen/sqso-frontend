import FeedItem from './FeedItem'
import React from 'react';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'
import {CellMeasurer} from 'react-virtualized/dist/commonjs/CellMeasurer'
import {CellMeasurerCache} from 'react-virtualized/dist/commonjs/CellMeasurer'

import PropTypes from "prop-types";
export default class NewsFeed extends React.Component {

    constructor(props) {

        super(props)
        var list = this.props.list;
        this.state = {
            loadedRowCount: 0,
            loadedRowsMap: {},
            scrollToIndex: undefined,
            loadingRowCount: 0,
            overscanRowCount: 10,
            list: list,
            randomScrollToIndex: null,
            rowCount: list.length
        };

        this._cache = new CellMeasurerCache({fixedWidth: true, defaultHeight: 40});
        this._setRef = this
            ._setRef
            .bind(this);
        this._onScrollToRowChange = this
            ._onScrollToRowChange
            .bind(this);
        // this._isRowLoaded = this
        //     ._isRowLoaded
        //     .bind(this)
        // this._loadMoreRows = this
        //     ._loadMoreRows
        //     .bind(this)
        this._rowRenderer = this
            ._rowRenderer
            .bind(this)
        this.recalculateRowHeight = this
            .recalculateRowHeight
            .bind(this)
            this.showComments = this.showComments.bind(this);
            this._setListRef = this._setListRef.bind(this);
    }

    _clearData() {
        this.setState({loadedRowCount: 0, loadedRowsMap: {}, loadingRowCount: 0})
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

    _rowRenderer({index, isScrolling, key, parent, style}) {

        let row = this.state.list[index];
        if (row === null) 
            return null;
            
        return (

            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={key}
                rowIndex={index}
                parent={parent}>
                {({measure}) => (
                        <div style={style} key={key}>
                            <div style={{marginBottom:'1vh'}}>
                                <FeedItem
                                    key={key}
                                    qso={row.qso}
                                    type={row.type}
                                    ad={row.ad}
                                    source={row.source}
                                    measure={measure}
                                    recalculateRowHeight={this.recalculateRowHeight}
                                    showComments={(index) =>this.showComments(index)}
                                    index={index}/>
                            
                            </div>
                        </div>
                    )
                
                }
            </CellMeasurer>

        )
    }

    _onScrollToRowChange(event) {

        const {list} = this.state.list;
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
    showComments = (index) => {
        console.log("showComments")
        let localList = this.state.list;
        localList[index].qso.showComments = true;        
        this.setState({list:localList})
        
    }

    recalculateRowHeight(index) {
        console.log("recalculateRowHeight" + index)
        this._cache.clearAll();

        // this
        //     ._list
        //     .recomputeRowHeights(index);
            this
            ._list
            .forceUpdateGrid();

    }
    static getDerivedStateFromProps(props, state) {
        if (props.list) 
            return {list: props.list}
        //Default
        return null;
    }
    // componentWillReceiveProps(nextProps) {     this.setState({list:
    // nextProps.list}); }
    componentDidUpdate(prevProps, prevState) {
        
        this._cache.clearAll();
        // this._list.recomputeRowHeights();
        this
        ._list
        .forceUpdateGrid();
    }
    componentWillUnmount() {

        this.setState({list: []});

    }
    render() {
        const {rowCount, overscanRowCount} = this.state;

        return (
            <div className="WindowScrollerWrapper">

                <WindowScroller ref={(ref) => this._windowScroller = ref}>
                    {({height, isScrolling, onChildScroll, scrollTop}) => (

                        <AutoSizer disableHeight>
                            {({width}) => (<List
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

            </div>
        )
    }
}
NewsFeed.propTypes = {
    list: PropTypes.array.isRequired
}