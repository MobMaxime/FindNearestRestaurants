import {StyleSheet} from 'react-native';
import Constants from '../../Globals/Constants'
export default StyleSheet.create({
    container: {
        flex:1,
        margin:2,
      },
    categoryView:{
        margin:2,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        borderWidth:1,
        borderColor:'grey',
        flexDirection:'column',
        height:200,
    },
    centeredTextView:{
      position: 'absolute', 
      top: 0, 
      left: 0,
      right: 0, 
      bottom: 0, 
      justifyContent: 'center', 
      alignItems: 'center'
    },  
    categoryText:{
      fontFamily:Constants.AppFont,
      color:'white',
      fontSize:26,
      backgroundColor:'rgba(52,52,52,0.8)',
      borderRadius:0,
      borderWidth:3,
      borderColor:'white',
      padding: 10,
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }, 
})