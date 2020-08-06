/**
 * Created by TinySymphony on 2017-05-08.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from "react-native";
import Moment from "moment";
import styles from "./CalendarStyle";
import MonthList from "./MonthList";
const ICON = {
  close:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADGklEQVR4Xu3b3XXTMBTAcV1Leu8I3YAyAWECygSlE9BOQJmAdAK6QWGCphNQNmAE+mzZl6Mc5xzXtiLJ1r0STfLqJM3/Z9muPwTiwF9w4P3iCHAcAQ4BRDxt2/aDEOKkqqqfAPD0P2EZYy6EEJ/sbwaATVVVtwDwd9gwuQkYY+wHv9n43QcQca21vi4dARFPmqa5F0Ks+r8VEZ+UUu+HCCMAu+abpvnVj+990Z1S6rJUBBtvjHkAgLOp34iIX7XWN/1lI4Cmaa4Q0a5916tIBF+8jUHER631i5ExAqjr+gYAvnjWclEIIfHBAIh41m0CvpFeBEJofBdzqZS627sJ2IV1Xa8B4LNPQAiRFSEmfmr4b48QrkhjjJWyhxLfKwtCZPxvpdQq+DC4Ky4VIVX83hFQKkLK+CAA+6ZSRkLq+GCAEhAo4qMAciJQxUcD5ECgjJ8FwIlAHT8bgAOBI34RACUCV/xiAAoEzvgkACkRuOOTAaRAyBGfFGAJQq745ABzEHLGkwDEItgLMK5reP3zcER0ntL6ztf3LSe7MRJxAuX9/VTxZCNgxqm0E4EynhwgcnMYIVDHswDMReCIZwOIReCKZwOIOdR12wHbhVayo8Bug54Rv/soCwIpwIJ4NgQygATxLAgkAAnjyRGSA8TE27199+BFtjtQSQFi43e3qyL+bU6+Y0wGMDd+xr/NSRGSACyNz4mwGCBVfC6ERQCp43MgzAagiudGmAVAHc+JEA3AFc+FEAXAHc+BEAyQK54aIQggdzwlgheglHgqhL0ApcVTIDgBSo1PjTAJUHp8SgTXfIGH4fP2U3cuOK/euu6chJ5KI+Kt1vpq+D0jgG6yxHfnrZpuQQnxsSNBSvl2OPNl6nH5DQC82wdQUnwMAgBcSynX/bZogBLjIxA+KqV++ACcEyZKjg9AeJZSnobMGbLzbuxm8KYvZZ+3V0qdTz1y7ttfcC+fmO/wjIjnWuuNdydo39AdBu0eczu/BgDsdbgXMy24o2L/nn3wom3bFSL+kVLaFTqaMrdti/3i1/b+I8BrW6OxPQc/Av4BDSZYbnPWwJkAAAAASUVORK5CYII="
};
export default class Calendar extends Component {
  static propTypes = {
    i18n: PropTypes.string,
    format: PropTypes.string,
    customI18n: PropTypes.object,
    color: PropTypes.object,
    singleDate: PropTypes.bool,
    minDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  };
  static defaultProps = {
    format: "YYYY-MM-DD",
    i18n: "en",
    customI18n: {},
    color: {
      subColor: "#fff"
    },
    
    singleDate:false
  };
  static I18N_MAP = {
    zh: {
      w: ["", "一", "二", "三", "四", "五", "六", "日"],
      weekday: [
        "",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ],
      text: {
        start: "开 始",
        end: "结 束",
        date: "日 期",
        save: "保 存",
        clear: "清除"
      },
      date: "M月D日"
    },
    en: {
      w: ["", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
      weekday: [
        "",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      text: {
        start: "Start",
        end: "End",
        date: "Date",
        save: "Save",
        clear: "Reset"
      },
      date: "DD / MM"
    },
    ar: {
      w: [
        "",
        "الإثنين",
        "الثلاثاء",
        "الإربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
        "الأحد"
      ],
      weekday: [
        "",
        "الإثنين",
        "الثلاثاء",
        "الإربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
        "الأحد"
      ],
      text: {
        start: "تاريخ البداية",
        end: "تاريخ النهاية",
        date: "اليوم",
        save: "تأكيد",
        clear: "من جديد"
      },
      date: "DD / MM"
    },
    jp: {
      w: ["", "月", "火", "水", "木", "金", "土", "日"],
      weekday: [
        "",
        "月曜日",
        "火曜日",
        "水曜日",
        "木曜日",
        "金曜日",
        "土曜日",
        "日曜日"
      ],
      text: {
        start: "スタート",
        end: "エンド",
        date: "時　間",
        save: "確　認",
        clear: "クリア"
      },
      date: "M月D日"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
    this._today = Moment();
    this._year = this._today.year();
    this._i18n = this._i18n.bind(this);
    this._getDateRange = this._getDateRange.bind(this);
    this._onChoose = this._onChoose.bind(this);
    this._resetCalendar = this._resetCalendar.bind(this);
    this.close = this.close.bind(this);
    this.cancel = this.cancel.bind(this);
    this.open = this.open.bind(this);
    this.clear = this.clear.bind(this);
    this.confirm = this.confirm.bind(this);
    this._getDateRange();
  }
  componentDidMount () {
    this._resetCalendar();
  }
  _i18n (data, type) {
    const {
      i18n,
      customI18n
    } = this.props;
    if (~['w', 'weekday', 'text'].indexOf(type)) {
      return (customI18n[type] || {})[data] || Calendar.I18N_MAP[i18n][type][data];
    }
    if (type === 'date') {
      return data.format(customI18n[type] || Calendar.I18N_MAP[i18n][type]);
    }
  }
  _resetCalendar () {
    const {
      startDate,
      endDate,
      format
    } = this.props;
    let start = Moment(startDate, format);
    let end = Moment(endDate, format);
    let isStartValid = start.isValid() && start >= this._minDate && start <= this._maxDate;
    let isEndValid = end.isValid() && end >= this._minDate && end <= this._maxDate;
    this.setState({
      startDate: isStartValid ? start : null,
      startDateText: isStartValid ? this._i18n(start, 'date') : '',
      startWeekdayText: isStartValid ? this._i18n(start.isoWeekday(), 'weekday') : '',
      endDate: isEndValid ? end: null,
      endDateText: isEndValid ? this._i18n(end, 'date') : '',
      endWeekdayText: isEndValid ? this._i18n(end.isoWeekday(), 'weekday') : ''
    });
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
      max = Moment().add(24, 'months');
      min = Moment().subtract(11,'months');
    }
    if (!maxValid && minValid) {
      max = min.add(36, 'months');
    }
    if (maxValid && !minValid) {
      min = max.subtract(36, 'months');
    }
    if (min.isSameOrAfter(max)) return {};
    this._minDate = min;
    this._maxDate = max;
  }
  _onChoose (day) {
    const {
      startDate,
      endDate
    } = this.state;
    if(this.props.singleDate==true){
      this.setState({
        startDate: day,
        startDateText: this._i18n(day, 'date'),
        startWeekdayText: this._i18n(day.isoWeekday(), 'weekday'),
        endDate: day,
        endDateText: this._i18n(day, 'date'),
        endWeekdayText: this._i18n(day.isoWeekday(), 'weekday')
      });
    }else{
    if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
      this.setState({
        startDate: day,
        endDate: null,
        startDateText: this._i18n(day, 'date'),
        startWeekdayText: this._i18n(day.isoWeekday(), 'weekday'),
        endDateText: '',
        endWeekdayText: '',
      });
    } else if (startDate && !endDate && day > startDate) {
      this.setState({
        endDate: day,
        endDateText: this._i18n(day, 'date'),
        endWeekdayText: this._i18n(day.isoWeekday(), 'weekday')
      });
    }
    }
  }
  cancel () {
    this.close();
    this._resetCalendar();
  }
  close () {
    this.setState({
      isModalVisible: false
    });
  }
  open () {
    this.setState({
      isModalVisible: true
    });
  }
  clear () {
    this.setState({
      startDate: null,
      endDate: null,
      startDateText: '',
      startWeekdayText: '',
      endDateText: '',
      endWeekdayText: ''
    });
  }
  
  confirm () {
    const {
      startDate,
      endDate
    } = this.state;
    let startMoment = startDate ? startDate.clone() : null;
    let endMoment = endDate ? endDate.clone() : null;
    this.props.onConfirm && this.props.onConfirm({
      startDate: startMoment ? startMoment.toDate() : null,
      endDate: endMoment ? endMoment.toDate() : null,
      startMoment,
      endMoment
    });
    this.close();
  }
  _renderReturn(){
     const {
      startDate,
      endDate,
      startDateText,
      startWeekdayText,
      endDateText,
      endWeekdayText
    } = this.state;
     const {
      mainColor = '#15aaaa',
      subColor = '#fff',
      borderColor = 'rgba(255, 255, 255, 0.50)'
    } = this.props.color;
    let color = {mainColor, subColor, borderColor};
    let subFontColor = {color: subColor};
    let subBack = {backgroundColor: subColor};
    if(this.props.singleDate==true){
      return ( <View style={styles.result}>
            
            <View style={styles.resultPart}>
              <Text style={[styles.resultText, styles.endText, subFontColor]}>
                {endDateText || this._i18n('selected', 'text')}
              </Text>
              <Text style={[styles.resultText, styles.endText, subFontColor]}>
                {endWeekdayText || this._i18n('date', 'text')}
              </Text>
            </View>
          </View>)
    }else{
    return ( <View style={styles.result}>
            <View style={styles.resultPart}>
              <Text style={[styles.resultText, styles.startText, subFontColor]}>
                {startDateText || this._i18n('start', 'text')}
              </Text>
              <Text style={[styles.resultText, styles.startText, subFontColor]}>
                {startWeekdayText || this._i18n('date', 'text')}
              </Text>
            </View>
            <View style={[styles.resultSlash, subBack]}/>
            <View style={styles.resultPart}>
              <Text style={[styles.resultText, styles.endText, subFontColor]}>
                {endDateText || this._i18n('end', 'text')}
              </Text>
              <Text style={[styles.resultText, styles.endText, subFontColor]}>
                {endWeekdayText || this._i18n('date', 'text')}
              </Text>
            </View>
          </View>)
    }
  }
  render () {
    const {
      startDate,
      endDate,
      startDateText,
      startWeekdayText,
      endDateText,
      endWeekdayText
    } = this.state;
    const {
      mainColor = '#15aaaa',
      subColor = '#fff',
      borderColor = 'rgba(255, 255, 255, 0.50)'
    } = this.props.color;
    let color = {mainColor, subColor, borderColor};
    let mainBack = {backgroundColor: mainColor};
    let subBack = {backgroundColor: subColor};
    let mainFontColor = {color: mainColor};
    let subFontColor = {color: subColor};
    let isValid = (this.props.singleDate==true)? startDate!=null : !startDate || endDate;
    let isClearVisible = startDate || endDate;
    return (
      <Modal
        animationType={'none'}
        visible={this.state.isModalVisible}
        onRequestClose={this.close}>
        <View style={[styles.container, mainBack]}>
          <View style={styles.ctrl}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.cancel}
              >
              <Image
                style={styles.closeIcon}
                source={{uri: ICON.close}}
                resizeMode="cover"/>
            </TouchableHighlight>
            {isClearVisible && <TouchableHighlight
              underlayColor="transparent"
              activeOpacity={0.8}
              onPress={this.clear}>
              <Text style={[styles.clearText, subFontColor]}>{this._i18n('clear', 'text')}</Text>
            </TouchableHighlight>}
          </View>
          {this._renderReturn()}
          <View style={styles.week}>
            {[7, 1, 2, 3, 4, 5, 6].map(item =>
              <Text style={[styles.weekText, subFontColor]}　key={item}>{this._i18n(item, 'w')}</Text>
            )}
          </View>
          <View style={[styles.scroll, {borderColor}]}>
            <MonthList
              today={this._today}
              minDate={this._minDate}
              maxDate={this._maxDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChoose={this._onChoose}
              i18n={this.props.i18n}
              color={color}
            />
          </View>
          <View style={styles.btn}>
            {isValid ?
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.45)"
                style={styles.confirmContainer}
                onPress={this.confirm}>
                <View style={styles.confirmBtn}>
                  <Text
                    ellipsisMode="tail" numberOfLines={1}
                    style={[styles.confirmText, subFontColor]}>
                    {this._i18n('save', 'text')}
                  </Text>
                </View>
              </TouchableHighlight> :
              <View style={[styles.confirmContainer, styles.confirmContainerDisabled]}>
                <View style={styles.confirmBtn}>
                  <Text
                    ellipsisMode="tail" numberOfLines={1}
                    style={[styles.confirmText, styles.confirmTextDisabled]}>
                    {this._i18n('save', 'text')}
                  </Text>
                </View>
              </View>
            }
          </View>
        </View>
      </Modal>
    );
  }
}
