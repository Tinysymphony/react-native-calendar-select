/**
 * Created by TinySymphony on 2017-05-11.
 */

import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import Moment from 'moment';
import styles from './style';
import Day from '../Day';

export default class Month extends Component {
  constructor (props) {
    super(props);
    this._getDayList = this._getDayList.bind(this);
    this._renderDayRow = this._renderDayRow.bind(this);
  }
  shouldComponentUpdate (nextProps) {
    // return ['minDate', 'maxDate', 'today', 'timeStr'].reduce((prev, next) => {
    //   if (prev || nextProps[next] !== this.props[next]) return true;
    //   return prev;
    // }, false);
    return false;
  }
  _getDayList (date) {
    let dayList;
    let month = date.month();
    let weekday = date.weekday();
    if (weekday === 7) {
      dayList = [];
    } else {
      dayList = new Array(weekday).fill('');
    }
    while(date.month() === month) {
      dayList.push(date.clone());
      date.add(1, 'days');
    }
    date.subtract(1, 'days');
    weekday = date.weekday();
    if (weekday === 7) {
      return dayList.concat(new Array(6).fill(''));
    }
    return dayList.concat(new Array(Math.abs(weekday - 6)).fill(''));
  }
  _renderDayRow (dayList, index) {
    const {
      startDate,
      endDate,
      today
    } = this.props;
    return (
      <View style={styles.dayRow} key={'row' + index}>
        {dayList.map((item, i) =>
          <Day
            date={item}
            {...this.props}
            key={'day' + i}/>
        )}
      </View>
    );
  }
  render () {
    console.log('render month');
    const {
      timeStr,
      today
    } = this.props;
    let titleText = '';
    timeStr.replace(/(\d{4})-(\d{2})/, (str, year, month) => {
      month = Number(month);
      if (Number(year) === today.year()) {
        titleText = month + '月';
      } else {
        titleText = year + '年' + month + '月';
      }
    });
    let dayList = this._getDayList(Moment(timeStr, 'YYYY-MM'));
    let rowArray = new Array(dayList.length / 7).fill('');
    return (
      <View style={styles.month}>
        <View style={styles.monthTitle}>
          <Text style={styles.monthTitleText}>{titleText}</Text>
        </View>
        <View style={styles.days}>
          {rowArray.map((item, i) =>
            this._renderDayRow(dayList.slice(i * 7, i * 7 + 7), i)
          )}
        </View>
      </View>
    );
  }
}
