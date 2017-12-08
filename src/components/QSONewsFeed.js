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
            randomScrollToIndex: null,


        };

        this._cache = new CellMeasurerCache({
            fixedWidth: true,
            minHeight: 100,
        });

        this._timeoutIdMap = {}

        this._clearData = this._clearData.bind(this)
        this._isRowLoaded = this._isRowLoaded.bind(this)
        this._loadMoreRows = this._loadMoreRows.bind(this)
        this._rowRenderer = this._rowRenderer.bind(this)
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        Object.keys(this._timeoutIdMap).forEach(timeoutId => {
            clearTimeout(timeoutId)
        })
    }

    _clearData() {
        this.setState({
            loadedRowCount: 0,
            loadedRowsMap: {},
            loadingRowCount: 0
        })
    }

    _isRowLoaded({index}) {
        return !!this.props.list[index] // STATUS_LOADING or STATUS_LOADED
    }

    _loadMoreRows({startIndex, stopIndex}) {
        console.log('load more rows', startIndex, stopIndex);


    }

    _rowRenderer({index, isScrolling, key, parent, style}) {

        const row = this.props.list[index]
        return (
            <CellMeasurer
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
                            measure={measure}/>
                    </div>

                }
            </CellMeasurer>

        )
    }

    render() {
        const
            rowCount = this.props.list.length + 1;
        return (
            <div className="WindowScrollerWrapper">
                <InfiniteLoader
                    isRowLoaded={this._isRowLoaded}
                    loadMoreRows={this._loadMoreRows}
                    rowCount={rowCount}
                    threshold={10}>
                    {({onRowsRendered, registerChild}) => (
                        <WindowScroller>
                            {({height, isScrolling, scrollTop}) => (

                                <AutoSizer disableHeight>
                                    {({width}) => (
                                        <List
                                            autoHeight
                                            ref={registerChild}
                                      //      deferredMeasurementCache={this._cache}
                                            height={height}
                                            onRowsRendered={onRowsRendered}
                                      //      overscanRowCount={1}
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