import React,{Component} from 'react';
import {connect} from 'react-redux'
import propTypes from 'prop-types';
import {Text,View,Image,FlatList,TouchableOpacity,Platform,PermissionsAndroid} from 'react-native'
import {Rating,SearchBar} from 'react-native-elements'
import AppLogo from '../Components/AppLogo'
import Constants from '../../App/Globals/Constants'
import colors from '../Themes/Colors'
import styles from '../Containers/Styles/LocationRestaurantListStyle'
import LoadingIndicator from '../Components/LoadingIndicator'
import LocationRestActions from '../Redux/LocationRestaurantRedux'
import Images from '../Themes/Images'
import Geolocation from '@react-native-community/geolocation'

let lat = 23.064360;
let long = 72.561460;
class  LocationRestaurantList extends Component 
{
    constructor(props)
    {
        super(props);
        this.state={
            isLoaded:false,
            restaurants:[],
            filterData:[],
            currentLat:null,
            currentLong:null,
            isLocationGet:false,
            isEndList:false,
            start:0,
            count:20,
            search:'',
            isSearch:false,
        }
    }
    static navigationOptions = ({navigation}) =>  {
        const {params = {}} = navigation.state;
        return{
            headerTitle:<AppLogo/>,
            headerBackTitleStyle: {
                fontFamily:Constants.AppFont
            },
            headerStyle:{
                backgroundColor:colors.ThemeColor,
                fontFamily:Constants.AppFont
            },
            headerTitleStyle: {
                alignSelf: 'center',
                fontSize:30,
            },
            headerTintColor:colors.HeaderTintColor,
        }
    }
    componentWillMount() {
        var that = this;
        if(Platform.OS === 'ios')
            this.callLocation(that);
        else{
            async function requestLocationPermission()
            {
                try
                {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                            'title':'Location Access Required',
                            'message':'Application needs to access Location'
                        }
                    ) 
                    if(granted === PermissionsAndroid.RESULTS.GRANTED)
                    {
                        that.callLocation(that);
                    }   
                    else{
                        alert('Permission Denied');
                    }
                }catch(e)
                {
                    alert('Error',e)
                    console.log(e)
                }
            }
            requestLocationPermission();
        }
    }
    callLocation(that)
    {
        Geolocation.getCurrentPosition((position)=>
            {
                const lattitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);
                this.setState({
                    currentLat:lattitude,
                    currentLong:longitude,
                    isLocationGet:true
                });
                (this.state.isLocationGet) && this.getThisLocationRestaurants();

            }
            ,
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        that.watchID = Geolocation.watchPosition((position)=>{
            const lattitude = JSON.stringify(position.coords.latitude);
            const longitude = JSON.stringify(position.coords.longitude);
            this.setState({
                currentLat:lattitude,
                currentLong:longitude,
                isLocationGet:true
            });
            (this.state.isLocationGet) && this.getThisLocationRestaurants();
        })
    }
    componentWillUnmount()
    {
        Geolocation.clearWatch(this.watchID);
    }
    componentDidMount() {
        
    }
    getThisLocationRestaurants()
    {
        this.props.getLocationRestaurants(
            this.state.currentLat,
            this.state.currentLong,
            this.state.start,
            this.state.count,
            () => this.isLocationRestSuccessCallBack(),
            response => this.isLocationRestFailureCallBack(response)
          );
    }
    renderLocationRestaurantList()
    {
        const {restaurants} = this.state
        const {filterData} = this.state
        const {isSearch} = this.state
        return(
            <FlatList data={isSearch ? filterData : restaurants}  
            onEndReachedThreshold={0}
            onEndReached={({ distanceFromEnd }) => {
                this.setState({
                    isEndList:true,
                })
                this.getThisLocationRestaurants();
                }}
                renderItem={
                    ({item})=>
                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.props.navigation.navigate('RestaurantInfo',{restaurant:item.restaurant})}}>
                            <View style={styles.restaurantView}>
                                <Image source={{uri:item.restaurant.featured_image}} 
                                        defaultSource={Images.category3}
                                            resizeMode='cover' style={styles.restaurantImage}/> 
                                <View style={styles.viewRestaurantInfo}>
                                    <Text numberOfLines={1} style={styles.titleText}>{item.restaurant.name}</Text>
                                    <Rating style={styles.ratingStyle} imageSize={20} readonly startingValue={item.restaurant.user_rating.aggregate_rating}/>
                                    <Text numberOfLines={1}  style={styles.simpletext}>{item.restaurant.cuisines}</Text>
                                    <Text style={styles.simpletext}>{item.restaurant.location.city}</Text>
                                </View>                          
                            </View>
                        </TouchableOpacity>
                    </View>
                    }
                keyExtractor={(item,index)=>index.toString()}
                    >                    
            </FlatList>
        )
    }
    updateSearch = (search) => {
        this.setState({search,isSearch:true})
        if(search.length>2 || search.length == 0)
        {
            this.setState({
                filterData:this.state.restaurants.filter(item => 
                    item.restaurant.name.toLowerCase().includes(search.toLowerCase())),
                search,
                isSearch:true,
                });
        }  
    };
    renderSearchView()
    {
        const {search} = this.state
        return(
            <SearchBar
                    platform={Platform.OS}
                    placeholder="Search Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    inputStyle={styles.searchBarInputStyle}
                    containerStyle={styles.searchBarContainerStyle}
                    inputContainerStyle={styles.searchBarInputContainerStyle}
                    clearIcon={true}
                    cancelButtonTitle=''
                />
        );
    } 
    render(){
        return(
            <View style={styles.container}>
                {(this.state.isLoaded) && this.renderSearchView()}
                {(this.state.isLoaded)  && this.renderLocationRestaurantList()}
                {(!this.state.isLoaded)   && <LoadingIndicator/>}
                {(this.state.isEndList) && <LoadingIndicator/>}
            </View>
        )
    }   
    isLocationRestSuccessCallBack(){
        let restaurantList = this.props.restaurantList;
        const {start,restaurants} = this.state;
        if(restaurantList.length!=0)
        {
            if(restaurants.length!=0)
            {
                this.setState({                
                    isLoaded: true,
                    restaurants: restaurants.concat(restaurantList) ,
                });
            }
            else{
                this.setState({                
                    isLoaded: true,
                    restaurants: restaurantList,
                });
            }
        }
        this.setState({start:start+20,isEndList:false})
    }
    isLocationRestFailureCallBack(response){
        if(response!=null)
        {
            console.log(response);
        }
    }
}
const mapstateToProps = (state)=>({
     restaurantList : state.locationRestaurants.restaurantList
});
const mapdispatchToProps = dispatch =>({
    getLocationRestaurants : (
        lat,
        long,
        start,
        count,
        isLocationRestSuccessCallBack,
        isLocationRestFailureCallBack
    ) =>
      dispatch(
        LocationRestActions.locationRestRequest(
            lat,
            long,
            start,
            count,
            isLocationRestSuccessCallBack,
            isLocationRestFailureCallBack
        )
      ),
});

export default connect(mapstateToProps,mapdispatchToProps)(LocationRestaurantList);

LocationRestaurantList.propTypes={
    getLocationRestaurants : propTypes.func,
    restaurantList : propTypes.array,
    fetching : propTypes.bool,
    error : propTypes.bool
};