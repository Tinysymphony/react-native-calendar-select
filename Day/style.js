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
export default StyleSheet.create({
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
