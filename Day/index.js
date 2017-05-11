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

export default class Day extends Component {
  constructor (props) {
    super(props);
    this._chooseDay = this._chooseDay.bind(this);
  }
  shouldComponentUpdate () {
    // return ['minDate', 'maxDate', 'today', 'timeStr', 'date', 'startDate', 'endDate'].reduce((prev, next) => {
    //   if (prev || nextProps[next] !== this.props[next]) return true;
    //   return prev;
    // }, false);
    return false;
  }
  _chooseDay () {
    this.props.onChoose(this.props.date);
  }
  render () {
    console.log('render day');
    const {
      startDate,
      endDate,
      today,
      date,
      minDate,
      maxDate
    } = this.props;
    let text = date ? date.date() : '';
    let isToday = today.isSame(date, 'd');
    let isValid = date &&
      (date >= minDate || date.isSame(minDate, 'd')) &&
      (date <= maxDate || date.isSame(maxDate, 'd'));
    let isMid = date > startDate && date < endDate;
    let isStart = date && date.isSame(startDate, 'd');
    let isStartPart = isStart && endDate;
    let isEnd = date && date.isSame(endDate, 'd');
    let isFocus = isMid || isStart || isEnd;
    return (
      <View
        style={[
          styles.dayContainer,
          isMid && styles.midDay,
          isStartPart && styles.startContainer,
          isEnd && styles.endContainer
        ]}>
        {isValid ?
          <TouchableHighlight
            style={[styles.day, isToday && styles.today, isFocus && styles.startDay]}
            underlayColor="rgba(255, 255, 255, 0.35)"
            onPress={this._chooseDay}>
            <Text style={[styles.dayText, isFocus && styles.focusText]}>{text}</Text>
          </TouchableHighlight> :
          <View style={[styles.day, isToday && styles.today]}>
            <Text style={styles.dayTextDisabled}>{text}</Text>
          </View>
        }
      </View>
    );
  }
}
