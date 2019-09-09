import React, { Component } from 'react'
import { Image, View ,FlatList} from 'react-native'
import AppLogo from '../Components/AppLogo'
import colors from '../Themes/Colors'
import Constants from '../Globals/Constants';
let photos;
export default class ImageGallery extends Component
{
    static navigationOptions = {
        headerTitle:<AppLogo/>,
        headerStyle:{
            backgroundColor:colors.ThemeColor,
        },
        headerTitleStyle: {
          fontSize:30,
        },
        headerBackTitleStyle: {
            fontFamily:Constants.AppFont
        },
        headerTintColor:colors.HeaderTintColor,
    } 
    componentWillMount()
    {
        const { navigation } = this.props;
        photos = navigation.getParam('photos');
    }
    render()
    {
        return(
            <View style={{padding:10}} >
                <FlatList data={photos}    
                    renderItem={
                        ({item})=>
                        <View style={{margin:5}}>
                            <Image source={{uri:item.photo.url}} resizeMode='cover' style={{height:250}}/>
                        </View>
                        }>                    
                </FlatList>
           </View>
        );
    }
}