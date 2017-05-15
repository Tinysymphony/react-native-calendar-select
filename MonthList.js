/**
 * Created by TinySymphony on 2017-05-11.
 */

import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native';
import Moment from 'moment';
import styles from './CalendarStyle';
import Month from './Month';

export default class MonthList extends Component {
  constructor (props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r2.shouldUpdate;
      }
    });
    this.monthList = [];
    this.state = {
      dataSource: this.ds.cloneWithRows(this._getMonthList())
    };
    this._renderMonth = this._renderMonth.bind(this);
    this._shouldUpdate = this._shouldUpdate.bind(this);
    this._checkRange = this._checkRange.bind(this);
  }
  componentWillReceiveProps (nextProps) {
    let isDateUpdated = ['startDate', 'endDate', 'minDate', 'maxDate'].reduce((prev, next) => {
      if (prev || nextProps[next] !== this.props[next]) {
        return true;
      }
      return prev;
    }, false);
    if (isDateUpdated) {
      this.setState({
        dataSource:
          this.state.dataSource.cloneWithRows(this._getMonthList(nextProps))
      });
    }
  }
  _renderMonth (month) {
    return (
      <Month
        month={month.date || {}}
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
    let next = this._checkRange(date, startDate, endDate);
    let prev = this._checkRange(date, this.props.startDate, this.props.endDate);
    if (prev || next) return true;
    return false;
  }
  _getMonthList (props) {
    let minDate = (props || this.props).minDate.clone().date(1);
    let maxDate = (props || this.props).maxDate.clone();
    let monthList = [];
    if (!maxDate || !minDate) return monthList;
    while (maxDate > minDate || (
      maxDate.year() === minDate.year() &&
      maxDate.month() === minDate.month()
    )) {
      let month = {
        date: minDate.clone()
      };
      month.shouldUpdate = this._shouldUpdate(month, props);
      monthList.push(month);
      minDate.add(1, 'month');
    }
    return monthList;
  }
  render () {
    return (
      <ListView
        style={styles.scrollArea}
        dataSource={this.state.dataSource}
        renderRow={this._renderMonth}
        pageSize={2}
        initialListSize={2}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}
