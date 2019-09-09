import React, {Component} from 'react';
import {WebView} from 'react-native';
import AppLogo from '../Components/AppLogo'
import colors from '../Themes/Colors'
import Constants from '../Globals/Constants';

let menu_url;
export default class MenuView extends Component {
    static navigationOptions = {
        headerTitle:<AppLogo/>,
        headerStyle:{
            backgroundColor:colors.ThemeColor,
        },
        headerBackTitleStyle: {
            fontFamily:Constants.AppFont
        },
        headerTitleStyle: {
          fontSize:30,
        },
        headerTintColor:colors.HeaderTintColor,
    } 
  componentDidMount()
  {
    
  }
  componentWillMount()
  {
    const { navigation } = this.props;
    menu_url = navigation.getParam('menu_url');
  }
  render() {
    return (
      <WebView
        source={{uri: menu_url}}
        style={{marginTop: 20}}
      />
    );
  }
}