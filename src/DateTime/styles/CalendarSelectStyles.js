import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
const screenWidth = width < height ? width : height

export default StyleSheet.create({
  day: {
    marginBottom: 5,
    color: '#fff'
  },
  txtHeaderDate: {
    color: '#fff',
    fontSize: 14,
  },
  weekdays: {
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    width: 36,
  },
  warpDay: {
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderColor: '#000'
  },
  icLockRed: {
    width: 13 / 2,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 1
  }
})
