import React, { Component } from 'react'
import { Text, Image, View ,TouchableOpacity,FlatList,ScrollView,Linking} from 'react-native'
import {Rating} from 'react-native-elements'
import styles from './Styles/RestaurantInfoStyle'
import AppLogo from '../Components/AppLogo'
import colors from '../Themes/Colors'
import Images from '../Themes/Images'
import Modal from "react-native-modal";
import Constants from '../Globals/Constants';
let restaurantData;
let reviewData;
export default class RestaurantInfo extends Component{

    constructor(props){
        super(props);
        this.state={
            reviewData:null,
            isGalleryVisible:false
        }
    }
    static navigationOptions = {
        headerTitle:<AppLogo/>,
        headerStyle:{
            backgroundColor:colors.ThemeColor,
            fontFamily:Constants.AppFont
        },
        headerBackTitleStyle: {
            fontFamily:Constants.AppFont
        },
        headerTitleStyle: {
          fontSize:30,
        },
        headerTintColor:colors.HeaderTintColor,
    } 
    componentWillMount()
    {
        const { navigation } = this.props;
        restaurantData = navigation.getParam('restaurant');
        reviewData=restaurantData.all_reviews.reviews;
        // this.setState({reviewData:restaurantData.all_reviews.reviews})
    }
    renderReviewList()
    {
        return(
            <FlatList data={reviewData}    
                renderItem={
                    ({item})=>
                    <View style={{flexDirection:'column',margin:5}}>
                        <View style={styles.seperatorView}/>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.simpletext}>{item.review.user.name}</Text>
                        </View>
                        <Rating style={styles.ratingStyle} imageSize={20} readonly startingValue={item.review.rating}/>
                        <Text style={styles.reviewText}>{item.review.review_text}</Text>
                    </View>
                    }>                    
            </FlatList>
        )
    }
    renderGalleryModal= () => (
           <View style={styles.modalContainer} >
               {/* <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({ isGalleryVisible: !this.state.isGalleryVisible })}}>
                    <Image source={Images.cancel} style={{tintColor:colors.ThemeColor}}/> 
                </TouchableOpacity> */}
                <FlatList data={restaurantData.photos}    
                    renderItem={
                        ({item})=>
                        <View style={{margin:5}}>
                            <Image source={{uri:item.photo.url}} resizeMode='cover' style={{height:250}}/>
                        </View>
                        }>                    
                </FlatList>
           </View>
    );
    toggleGalleryModal = () => {
        this.setState({ isGalleryVisible: !this.state.isGalleryVisible });
    };
    render()
    {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.headerText}>{restaurantData.name}</Text>
                    <View>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('ImageGallery',{photos:restaurantData.photos})}}>
                            <Image source={{uri:restaurantData.featured_image}} defaultSource={Images.category3} resizeMode='cover' style={{height:250,borderRadius:30}}/> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.DetailView}>
                        <Text style={styles.ratingtext}>{`Ratting : ${restaurantData.user_rating.aggregate_rating}`}</Text> 
                        <Text style={styles.simpletext}>{restaurantData.location.address}</Text>
                        <Text style={styles.simpletext}>{restaurantData.cuisines}</Text>
                        <Text style={styles.menuText} onPress={()=>{this.props.navigation.navigate('MenuView',{menu_url:restaurantData.menu_url})}}>{'View Menu'}</Text> 
                        {/* <Text style={styles.simpletext}>{restaurantData.menu_url}</Text>   
                        */}
                    </View>
                        <Text style={styles.headerText}>{'All Reviews'}</Text>
                        {this.renderReviewList()}
                </View>
                <Modal 
                    onBackdropPress={()=>this.toggleGalleryModal()}
                    animationType="slide"
                    transparent={true}
                    isVisible={this.state.isGalleryVisible} >                        
                    {this.renderGalleryModal()}
                </Modal>
            </ScrollView>
        )
    }
}
//Linking.openURL(restaurantData.menu_url)
//this.props.navigation.navigate('ImageGallery',{photos:restaurantData.photos})