import {
  StyleSheet,
  Dimensions
} from 'react-native';
const {scale, width} = Dimensions.get('window');
let dayWidth = width / 7;
let mod = scale * width % 7
if (mod) {
  dayWidth = ((7 - mod) / scale + width) / 7;
}
const Colors  = {
  main: '#15aaaa'
}
const Colors  = {
  main: '#15aaaa'
}
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main
  },
  ctrl: {
    flex: 1.5,
    justifyContent: 'flex-end',
    paddingHorizontal: 15
  },
  result: {
    flex: 2.5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  resultText: {
    fontSize: 26,
    marginVertical: 4,
    fontWeight: '200',
    color: '#fff'
  },
  week: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  weekText: {
    flex: 1,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.77)',
    textAlign: 'center',
  },
  scroll: {
    flex: 9,
    borderTopWidth: 1 / scale,
    borderBottomWidth: 1 / scale,
    borderColor: 'rgba(255, 255, 255, 0.5)'
  },
  scrollArea: {
    flex: 1
  },
  btn: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmContainer: {
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.40)',
    paddingHorizontal: 130,
    paddingVertical: 10,
    borderRadius: 4
  },
  confirmContainerDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.20)'
  },
  confirmText: {
    color: '#f0f0f0',
    fontSize: 16,
    fontWeight: 'bold'
  },
  confirmTextDisabled: {
    color: 'rgba(255, 255, 255, 0.40)'
  },
  closeIcon: {
    width: 22,
    height: 22,
    marginBottom: 10
  },
  month: {
    flex: 1,
    marginBottom: 10,
    marginTop: 15,
  },
  monthTitle: {
    flex: 1,
    paddingHorizontal: 20
  },
  monthTitleText: {
    color: '#fcfcfc',
    fontSize: 24,
    fontWeight: '300'
  },
  days: {
    flex: 8
  },
  dayRow: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 5
  },
  dayContainer: {
    width: dayWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startContainer: {
    borderTopLeftRadius: width / 16,
    borderBottomLeftRadius: width / 16,
    backgroundColor: '#fff'
  },
  endContainer: {
    borderTopRightRadius: width / 16,
    borderBottomRightRadius: width / 16,
    backgroundColor: '#fff'
  },
  midDay: {
    backgroundColor: '#fff'
  },
  today: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.40)'
  },
  day: {
    width: width / 8,
    height: width / 8,
    borderRadius: width / 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayText: {
    fontSize: 16,
    color: '#fcfcfc',
    textAlign: 'center'
  },
  dayTextDisabled: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.54)',
    textAlign: 'center'
  },
  focusText: {
    color: Colors.main
  },
  startDay: {
    backgroundColor: '#fff',
    // borderWidth: 0
  }
});
