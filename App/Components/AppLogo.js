import React, { Component } from 'react'
import {TouchableOpacity,View,Image} from 'react-native'
import { Images } from '../Themes';
class AppLogo extends Component {
    render () {
        return (
            <TouchableOpacity >
            <View style={{flex:1,flexDirection:'row', justifyContent:'center',padding:10}}>
                <Image source={Images.logo}
                    style={{width:110,height:30}}/>
            </View>
        </TouchableOpacity>
        )
    }
}
export default AppLogo