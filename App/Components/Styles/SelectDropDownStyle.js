import {StyleSheet} from 'react-native'
import Constants from '../../Globals/Constants'
export default StyleSheet.create({
  dropdownStyle: {
    marginTop: 10,
    width: 155,
    height: 'auto'
  },
  dropdownTextStyle: {
    fontSize: 16,
    fontFamily:Constants.AppFont
  },
  viewContainingFilterTitle: {
    paddingLeft:10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterTitleText: {
    fontSize: 16,
    letterSpacing: 0,
    textAlign: 'left',
  },
  dropdownIcon: {
    width: 10,
    height: 10
  }
});
