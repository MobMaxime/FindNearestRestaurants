import {StyleSheet,Platform,Dimensions} from 'react-native';
import Constants from '../../Globals/Constants'
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
export default StyleSheet.create({
    container: {
        flex:1,
        margin:5,
      },
    restaurantView:{
      margin:5,
      flexDirection:'row',
      borderRadius:30,
      borderWidth:0.5,
      borderColor:'grey',
    },
    restaurantImage:{
      width:100,
      height:100,
      borderRadius:100/2,
      margin:10
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      padding:10,
   },
  searchBarContainerStyle:{
    height: 40,
    borderRadius:  10,
    backgroundColor: 'white', 
    width:  ScreenWidth * 1
  },
  searchBarInputStyle:{
    ...Platform.select({
      android: {
        padding: 0,
        margin: 0,
        borderWidth: 0
      },
      ios: {
        bottom: 1,
      }
    }),
    marginLeft: 10,
    width: ScreenWidth * 1,
    fontSize: 14,
    color:  "#b3b6c3"
  },
  searchBarInputContainerStyle:{
    backgroundColor: 'white',
    height:  20
  },
  viewRestaurantInfo:{
    flex:1,
    flexDirection:'column',
    margin:2,
    padding:10
  },
  simpletext:{
    fontSize: 14,
    fontFamily:Constants.AppFont,
    color:'black',
    marginTop:5,
  }, 
  titleText: {
    fontSize: 16,
    fontFamily:Constants.AppFont,
    color:'black'
  },
  ratingStyle:{
    marginTop:5,
    alignItems:'flex-start'
  }, 
  headerText: {
    margin:5,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:Constants.AppFont,
    color:'black'
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
})