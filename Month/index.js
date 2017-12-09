/**
 * Created by TinySymphony on 2017-05-11.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet,
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
    this._getMonthText = this._getMonthText.bind(this);
  }
  static I18N_MAP = {
    'zh': [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    'jp': [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    'en': [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
  }
  _getMonthText () {
    const {
      month,
      today,
      i18n
    } = this.props;
    let y = month.year();
    let m = month.month();
    let year = today.year();
    if (year === y) {
      return Month.I18N_MAP[i18n][m];
    } else {
      if (i18n === 'en') {
        return `${Month.I18N_MAP[i18n][m]}, ${y}`;
      }
      return month.format('YYYY年M月');
    }
  }
  _getDayList (date) {
    let dayList;
    let month = date.month();
    let weekday = date.isoWeekday();
    if (weekday === 7) {
      dayList = [];
    } else {
      dayList = new Array(weekday).fill({
        empty: date.clone().subtract(1, 'h')
      });
    }
    while (date.month() === month) {
      dayList.push({
        date: date.clone()
      });
      date.add(1, 'days');
    }
    date.subtract(1, 'days');
    weekday = date.isoWeekday();
    if (weekday === 7) {
      return dayList.concat(new Array(6).fill({
        empty: date.clone().hour(1)
      }));
    }
    return dayList.concat(new Array(Math.abs(weekday - 6)).fill({
      empty: date.clone().hour(1)
    }));
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
            date={item.date}
            empty={item.empty}
            {...this.props}
            key={'day' + i}/>
        )}
      </View>
    );
  }
  render () {
    const {
      month,
      today,
      color
    } = this.props;
    let subColor = {color: color.subColor};
    let titleText = this._getMonthText();
    let dayList = this._getDayList(month.clone());
    let rowArray = new Array(dayList.length / 7).fill('');
    return (
      <View style={styles.month}>
        <View style={styles.monthTitle}>
          <Text style={[styles.monthTitleText, subColor]}>{titleText}</Text>
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
