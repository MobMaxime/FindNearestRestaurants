import {StyleSheet} from 'react-native';
import Constants from '../../Globals/Constants'
import Fonts from '../../Themes/Fonts'
export default StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        margin:5,

      },
    restaurantView:{
      margin:2,
      flexDirection:'row',
      borderRadius:5,
      borderWidth:1,
      borderColor:'grey',
    },
    ratingtext:{
      margin:10,
      fontSize: 14,
      fontFamily:Constants.AppFont,
      color:'black',
      alignSelf:'flex-end'
    }, 
    simpletext:{
      margin:10,
      fontSize: 14,
      fontFamily:Constants.AppFont,
      color:'black'
    }, 
    menuText:{
      margin:10,
      fontSize: 14,
      color:'blue',
      fontFamily:Constants.AppFont,
    }, 
    titleText: {
      fontSize: 16,
      fontFamily:Constants.AppFont,
      color:'black'
    },
    headerText: {
      margin:5,
      fontSize: 16,
      fontFamily:Constants.AppFont,
      color:'black'
    },
    DetailView:{
      margin:5,
      fontSize:14,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      borderWidth:0.2,
      borderColor:'grey',
    },
    ratingStyle:{
      marginTop:5,
      alignItems:'flex-start'
    }, 
    seperatorView:{
      margin:5,
      height:0.5,
      backgroundColor:'grey'
    },
    reviewText:{
      marginTop:5,
      fontFamily:Constants.textFont,
      color:'black'
    },
    modalContainer:{
      flex: 1,
      flexDirection: 'column',
      padding:10,
      backgroundColor:'white',
    }
})