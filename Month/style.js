import {
  StyleSheet,
  Dimensions
} from 'react-native';
const {scale, width} = Dimensions.get('window');

export default StyleSheet.create({
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
  }
});
