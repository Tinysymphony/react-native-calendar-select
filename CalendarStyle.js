import {
  StyleSheet,
  Dimensions
} from 'react-native';
const {scale} = Dimensions.get('window');
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  clearText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '400'
  },
  startText: {
    textAlign: 'left'
  },
  endText: {
    textAlign: 'right'
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
    height: 22
  }
});
