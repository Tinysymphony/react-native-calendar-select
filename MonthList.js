/**
 * Created by TinySymphony on 2017-05-11.
 */

import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  ListView,
  Dimensions
} from 'react-native';
import Moment from 'moment';
import styles from './CalendarStyle';
import Month from './Month';
import { FlatList } from 'react-native-gesture-handler';
import {_getMonthList,_checkRange,_getWeekNums} from './utils'
const {width} = Dimensions.get('window');


export default class MonthList extends Component {
  constructor (props) {
    super(props);
    
    this.monthList = [];
    this.state = {
      dataSource: _getMonthList(this.props)
    };
 
    this._shouldUpdate = this._shouldUpdate.bind(this)
    this._scrollToSelecetdMonth = this._scrollToSelecetdMonth.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState){
    let isDateUpdated = ['startDate', 'endDate', 'minDate', 'maxDate'].reduce((prev, next) => {
      if (prev || nextProps[next] !== prevState[next]) {
        return true;
      }
      return prev;
    }, false);
    if (isDateUpdated) {
      return{
        ...prevState,
        dataSource:_getMonthList(nextProps)
      };
    }
    return {
      ...prevState
    }
  }
  

   
  _renderMonth =({item,index})=> {
    return (
      <Month
        month={item.date || {}}
        {...this.props}
      />
    );
  }
  _checkRange (date, start, end) {
    if (!date || !start) return false;
    if (!end) return date.year() === start.year() && date.month() === start.month();
    if (date.year() < start.year() || (date.year() === start.year() && date.month() < start.month())) return false;
    if (date.year() > end.year() || (date.year() === end.year() && date.month() > end.month())) return false;
    return true;
  }
  _shouldUpdate (month, props) {
    if (!props) return false;
    const {
      startDate,
      endDate
    } = props;
    const {
      date
    } = month;
    let next = _checkRange(date, startDate, endDate);
    let prev = _checkRange(date, this.props.startDate, this.props.endDate);
    if (prev || next) return true;
    return false;
  }
 

  _scrollToSelecetdMonth () {
    const {
      startDate,
      minDate
    } = this.props;
    let monthOffset = 12 * (startDate.year() - minDate.year()) +
      startDate.month() - minDate.month();
    let weekOffset = _getWeekNums(minDate, startDate);
    setTimeout(() => {
      this.list && this.list.scrollToOffset({
        offset: monthOffset * (24 + 25) + (monthOffset ? weekOffset * Math.ceil(width / 7 + 10) : 0),
        animated: true
      });
    }, 400);
  }
  componentDidMount () {
    this.props.startDate && this._scrollToSelecetdMonth();
  }
  render () {
    return (
      <FlatList
        ref={(list) => {this.list = list;}}
        style={styles.scrollArea}
        data={this.state.dataSource}
        renderItem={this._renderMonth}
        pageSize={2}
        initialListSize={2}
        keyExtractor={(item,index)=> item.date.format('X')}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}
