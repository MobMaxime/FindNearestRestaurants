import React from 'react'
import { createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5';
import LaunchScreen from '../Containers/LaunchScreen'
import CategoryScreen from '../Containers/CategoryScreen'
import RestaurantsList from '../Containers/RestaurantsList';
import RestaurantInfo from '../Containers/RestaurantInfo';
import LocationRestaurantList from '../Containers/LocationRestaurantList'
import MenuView from '../Containers/MenuView'
import ImageGallery from '../Containers/ImageGallery'
import colors from '../../App/Themes/Colors'
import Constants from '../Globals/Constants'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  CategoryScreen: { screen: CategoryScreen },
  RestaurantsList: { screen: RestaurantsList },
  RestaurantInfo: { screen: RestaurantInfo },
  MenuView: { screen: MenuView },
  ImageGallery: { screen: ImageGallery },
  LaunchScreen: { screen: LaunchScreen }
}, 
{
  headerMode: 'screen',
  initialRouteName: 'CategoryScreen',
  navigationOptions: {
      headerStyle:{
        backgroundColor:colors.ThemeColor,
        fontFamily:Constants.AppFont
    },
    headerTitleStyle:
    {
      fontSize:30,
    },
    headerTintColor:colors.HeaderTintColor,
  }
})
const locationTab = createStackNavigator({
  LocationRestaurantList :{screen : LocationRestaurantList},
  RestaurantInfo: { screen: RestaurantInfo },
  MenuView: { screen: MenuView },
  ImageGallery: { screen: ImageGallery },
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'LocationRestaurantList',
})
const MyTabs = createBottomTabNavigator({
  Home: {
      screen: PrimaryNav,
      navigationOptions: {
        title: "Home",
        tabBarIcon:({tintColor}) =>(
          <Icon name="home" size={20} color={tintColor} />
        )
      }
  },
  Location: {
    screen: locationTab,
    navigationOptions: {
        title: "Location",
        tabBarIcon:({tintColor}) =>(
          <Icon name="list" size={20} color={tintColor} />
      )
    }
  },
  All: {
    screen: PrimaryNav,
    navigationOptions: {
        title: "Setting",
        tabBarIcon:({tintColor}) =>(
          <Icon name="key" size={20} color={tintColor} />
      )
    }
  },
  Setting: {
    screen: PrimaryNav,
    navigationOptions: {
        title: "Profile",
        tabBarIcon:({tintColor}) =>(
          <Icon name="user" size={20} color={tintColor}/>
      )
    },
  },
},
{
tabBarOptions : {
  style: {
    backgroundColor: colors.ThemeColor,
  },
  activeTintColor: colors.activeTabColor,
  inactiveTintColor: colors.inActiveTabColor,
  labelStyle: {
    fontFamily: Constants.AppFont,
  },
}
});

export default createAppContainer(MyTabs)
