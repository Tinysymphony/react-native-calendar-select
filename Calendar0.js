/**
 * Created by TinySymphony on 2017-05-08.
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
import styles from './CalendarStyle';
const ICON = {
  close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADGklEQVR4Xu3b3XXTMBTAcV1Leu8I3YAyAWECygSlE9BOQJmAdAK6QWGCphNQNmAE+mzZl6Mc5xzXtiLJ1r0STfLqJM3/Z9muPwTiwF9w4P3iCHAcAQ4BRDxt2/aDEOKkqqqfAPD0P2EZYy6EEJ/sbwaATVVVtwDwd9gwuQkYY+wHv9n43QcQca21vi4dARFPmqa5F0Ks+r8VEZ+UUu+HCCMAu+abpvnVj+990Z1S6rJUBBtvjHkAgLOp34iIX7XWN/1lI4Cmaa4Q0a5916tIBF+8jUHER631i5ExAqjr+gYAvnjWclEIIfHBAIh41m0CvpFeBEJofBdzqZS627sJ2IV1Xa8B4LNPQAiRFSEmfmr4b48QrkhjjJWyhxLfKwtCZPxvpdQq+DC4Ky4VIVX83hFQKkLK+CAA+6ZSRkLq+GCAEhAo4qMAciJQxUcD5ECgjJ8FwIlAHT8bgAOBI34RACUCV/xiAAoEzvgkACkRuOOTAaRAyBGfFGAJQq745ABzEHLGkwDEItgLMK5reP3zcER0ntL6ztf3LSe7MRJxAuX9/VTxZCNgxqm0E4EynhwgcnMYIVDHswDMReCIZwOIReCKZwOIOdR12wHbhVayo8Bug54Rv/soCwIpwIJ4NgQygATxLAgkAAnjyRGSA8TE27199+BFtjtQSQFi43e3qyL+bU6+Y0wGMDd+xr/NSRGSACyNz4mwGCBVfC6ERQCp43MgzAagiudGmAVAHc+JEA3AFc+FEAXAHc+BEAyQK54aIQggdzwlgheglHgqhL0ApcVTIDgBSo1PjTAJUHp8SgTXfIGH4fP2U3cuOK/euu6chJ5KI+Kt1vpq+D0jgG6yxHfnrZpuQQnxsSNBSvl2OPNl6nH5DQC82wdQUnwMAgBcSynX/bZogBLjIxA+KqV++ACcEyZKjg9AeJZSnobMGbLzbuxm8KYvZZ+3V0qdTz1y7ttfcC+fmO/wjIjnWuuNdydo39AdBu0eczu/BgDsdbgXMy24o2L/nn3wom3bFSL+kVLaFTqaMrdti/3i1/b+I8BrW6OxPQc/Av4BDSZYbnPWwJkAAAAASUVORK5CYII='
};
export default class Calendar extends Component {
  static propTypes = {
    format: PropTypes.string,
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  }
  static defaultProps = {
    format: 'YYYY-MM-DD'
  }
  constructor (props) {
    super(props);
    this.state = {
      isModalVisible: false,
      startDate: null,
      endDate: null
    };
    this._today = Moment();
    this._year = this._today.year();
    this._renderDay = this._renderDay.bind(this);
    this._renderDayRow = this._renderDayRow.bind(this);
    this._renderMonth = this._renderMonth.bind(this);
    this._getDayList = this._getDayList.bind(this);
    this._getMonthList = this._getMonthList.bind(this);
    this._getDateRange = this._getDateRange.bind(this);
    this._focusDay = this._focusDay.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.confirm = this.confirm.bind(this);
  }
  _getDateRange () {
    const {
      maxDate,
      minDate,
      format
    } = this.props;
    let max = Moment(maxDate, format);
    let min = Moment(minDate, format);
    let maxValid = max.isValid();
    let minValid = min.isValid();
    if (!maxValid && !minValid) {
      max = Moment().add(3, 'months');
      min = Moment();
    }
    if (!maxValid && minValid) {
      max = min.add(3, 'months');
    }
    if (maxValid && !minValid) {
      min = max.subtract(3, 'months');
    }
    if (min.isSameOrAfter(max)) return {};
    this._minDate = min.clone();
    this._maxDate = max.clone();
    return {
      minDate: min,
      maxDate: max
    };
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
  _getMonthList () {
    let {
      maxDate,
      minDate
    } = this._getDateRange();
    let monthList = [];
    if (!maxDate || !minDate) return monthList;
    while (maxDate > minDate || (
      maxDate.year() === minDate.year() &&
      maxDate.month() === minDate.month()
    )) {
       monthList.push(minDate.format('YYYY-MM'));
       minDate.add(1,'month');
    }
    return monthList;
  }
  _focusDay (day) {
    const {
      startDate,
      endDate
    } = this.state;
    if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
      this.setState({
        startDate: day,
        endDate: null
      });
    } else if (startDate && !endDate && day > startDate) {
      this.setState({
        endDate: day
      });
    }
  }
  _renderDay (day, index) {
    const {
      startDate,
      endDate
    } = this.state;
    let text = day ? day.date() : '';
    let isToday = this._today.isSame(day, 'd');
    let isValid = day &&
      (day >= this._minDate || day.isSame(this._minDate, 'd')) &&
      (day <= this._maxDate || day.isSame(this._maxDate, 'd'));
    let isMid = day > startDate && day < endDate;
    let isStart = day && day.isSame(startDate, 'd');
    let isStartPart = isStart && endDate;
    let isEnd = day && day.isSame(endDate, 'd');
    let isFocus = isMid || isStart || isEnd;
    return (
      <View
        style={[
          styles.dayContainer,
          isMid && styles.midDay,
          isStartPart && styles.startContainer,
          isEnd && styles.endContainer
        ]}
        key={'day' + index} >
        {isValid ?
          <TouchableHighlight
            style={[styles.day, isToday && styles.today, isFocus && styles.startDay]}
            underlayColor="rgba(255, 255, 255, 0.35)"
            onPress={() => {this._focusDay(day)}}>
            <Text style={[styles.dayText, isFocus && styles.focusText]}>{text}</Text>
          </TouchableHighlight> :
          <View style={[styles.day, isToday && styles.today]}>
            <Text style={styles.dayTextDisabled}>{text}</Text>
          </View>
        }
      </View>
    );
  }
  _renderDayRow (dayList, index) {
    return (
      <View style={styles.dayRow} key={'row' + index}>
        {dayList.map((item, i) =>
          this._renderDay(item, i)
        )}
      </View>
    );
  }
  _renderMonth (timeStr, index) {
    let titleText = '';
    timeStr.replace(/(\d{4})-(\d{2})/, (str, year, month) => {
      month = Number(month);
      if (Number(year) === this._year) {
        titleText = month + '月';
      } else {
        titleText = year + '年' + month + '月';
      }
    });
    let dayList = this._getDayList(Moment(timeStr, 'YYYY-MM'));
    let rowArray = new Array(dayList.length / 7).fill('');
    return (
      <View style={styles.month} key={'month' + index}>
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
  close() {
    this.setState({
      isModalVisible: false
    });
  }
  open () {
    this.setState({
      isModalVisible: true
    });
  }
  confirm () {
    this.close();
  }
  render () {
    const {
      startDate,
      endDate
    } = this.state;
    let isValid = startDate && endDate;
    return (
      <Modal
        animationType={"slide"}
        visible={this.state.isModalVisible}
        onRequestClose={this._onClose}>
        <View style={styles.container}>
          <View style={styles.ctrl}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.close}
              >
              <Image
                style={styles.closeIcon}
                source={{uri: ICON.close}}
                resizeMode="cover"/>
            </TouchableHighlight>
          </View>
          <View style={styles.result}>
            <View style={styles.resultPart}>
              <Text style={styles.resultText}>开 始</Text>
              <Text style={styles.resultText}>日 期</Text>
            </View>
            <View style={styles.resultPart}>
              <Text style={styles.resultText}>结 束</Text>
              <Text style={styles.resultText}>日 期</Text>
            </View>
          </View>
          <View style={styles.week}>
            <Text style={styles.weekText}>日</Text>
            <Text style={styles.weekText}>一</Text>
            <Text style={styles.weekText}>二</Text>
            <Text style={styles.weekText}>三</Text>
            <Text style={styles.weekText}>四</Text>
            <Text style={styles.weekText}>五</Text>
            <Text style={styles.weekText}>六</Text>
          </View>
          <View style={styles.scroll}>
            <ScrollView style={styles.scrollArea}>
              {this._getMonthList().map((item, index) =>
                this._renderMonth(item, index)
              )}
            </ScrollView>
          </View>
          <View style={styles.btn}>
            {isValid ?
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.34)"
                style={styles.confirmContainer}
                onPress={this.confirm}>
                <View style={styles.confirmBtn}>
                  <Text style={styles.confirmText}>保   存</Text>
                </View>
              </TouchableHighlight> :
              <View style={[styles.confirmContainer, styles.confirmContainerDisabled]}>
                <View style={styles.confirmBtn}>
                  <Text style={[styles.confirmText, styles.confirmTextDisabled]}>保   存</Text>
                </View>
              </View>
            }
          </View>
        </View>
      </Modal>
    );
  }
}
