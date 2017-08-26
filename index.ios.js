/**
 * Created by TinySymphony on 2017-05-08.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Calendar from './Calendar';

export default class calendar extends Component {
  constructor(props) {
    super(props);
    this.calendar = null;
    this.state = {
      startDate: new Date(2017, 7, 12),
      endDate: new Date(2017, 8, 23)
    };
    this.openCalendar = this.openCalendar.bind(this);
    this.confirmDate = this.confirmDate.bind(this);
  }
  // when confirm button is clicked, an object is conveyed to outer component
  // contains following property:
  // startDate [Date Object], endDate [Date Object]
  // startMoment [Moment Object], endMoment [Moment Object]
  confirmDate ({startDate, endDate, startMoment, endMoment}) {
    console.log(startDate, endDate, startMoment, endMoment);
    this.setState({
      startDate,
      endDate
    });
  }
  openCalendar() {
    !!this.calendar && this.calendar.open();
  }
  render() {
    // It's an optional property, I use this to show the structure of customI18n object.
    let customI18n = {
      'firstWeekday': 1,
      'w': ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
      'm': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      'weekday': ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      'text': {
        'start': 'Entrada',
        'end': 'Salida',
        'date': 'Fecha',
        'save': 'Confirmar',
        'clear': 'Limpiar'
      },
      'date': 'DD / MM'  // date format
    };
    // optional property, too.
    let color = {
      mainColor: '#138691'
    };
    // custom styles
    let customStyles = {
      clearText : {
        fontFamily: 'Damascus'
      },
      selectedDate : {
        fontFamily: 'Arial'
      },
      selectedDateDayName : {
        fontFamily: 'Damascus'
      },
      weekDay : {
        fontFamily: 'Damascus'
      },
      monthName : {
        fontFamily: 'Damascus',
        fontSize: 20
      },
      validDay : {
        fontFamily: 'Arial'
      },
      invalidDay : {
        fontFamily: 'Arial'
      },
      confirmBtnWrapper : {
        flex : 2,
      },
      confirmBtn : {
        borderRadius: 0,
      },
      confirmBtnText : {
        fontFamily: 'Damascus',
        fontWeight: 'normal'
      }
    };
    const {
      startDate,
      endDate
    } = this.state;
    let text = startDate && endDate ? startDate.toLocaleDateString() + '  /  ' + endDate.toLocaleDateString() :
      'Please select a period';
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.btn}
          title="press"
          onPress={this.openCalendar}
          >
          <Text style={styles.btnFont}>Choose Dates</Text>
        </TouchableHighlight>
        <View>
          <Text style={styles.font}>{text}</Text>
        </View>
        <Calendar
          color={color}
          ref={(calendar) => {this.calendar = calendar;}}
          customI18n={customI18n}
          customStyles={customStyles}
          format="YYYYMMDD"
          minDate="20170510"
          maxDate="20180412"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onConfirm={this.confirmDate}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: 'hidden',
    borderRadius: 6,
    marginBottom: 30,
    backgroundColor: '#138691'
  },
  btnFont: {
    color: '#fff',
    fontSize: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  font: {
    fontSize: 24,
    fontWeight: '400',
    color: '#304853'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('calendar', () => calendar);
