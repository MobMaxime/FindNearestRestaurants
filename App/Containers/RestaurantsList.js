import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { Text, Image, View , TouchableOpacity,FlatList,Platform} from 'react-native'
import {Rating,SearchBar} from 'react-native-elements'
import cityActions from '../Redux/CityRedux';
import RestaurantsActions from '../Redux/AllRestaurantRedux';
import cityRestaurantsActions from '../Redux/CityRestaurantRedux';
import styles from './Styles/RestaurantsListStyle'
import ModalDropdown from 'react-native-modal-dropdown';
import optionStyles from '../Components/Styles/SelectDropDownStyle'
import Images from '../Themes/Images';
import Constants from '../../App/Globals/Constants'
import colors from '../Themes/Colors'
import LoadingIndicator from '../Components/LoadingIndicator'
let category_id=null;
let city_id=null;
let city_name='Ahmedabad';
class RestaurantsList extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoaded:false,
            start:0,
            count:20,
            isProcess:false,
            restaurants:[],
            filterData:null,
            search:'',
            isSearch:false,
            currentCity:null,
            selectedCity:'Ahmedabad',
            refreshing:false,
            isEndList:false,
            isAllRestaurantList:true,
            isCityRestaurants:false,
            isCitySelected:false
        }
    }
    static navigationOptions = ({navigation}) =>  {
        const {params = {}} = navigation.state;
        return{
            headerTitle:(
                <TouchableOpacity onPress={()=>navigation.goBack(null)}>
                    <View style={{flex:1,flexDirection:'row', justifyContent:'center',padding:10}}>
                        <Image source={Images.logo}
                            style={{width:110,height:30}}/>
                    </View>
                </TouchableOpacity>
            ),
            headerRight:(
                <ModalDropdown options={Constants.options} style={{right:10,left:0}}
                    defaultValue='Select City'
                    textStyle={{fontSize: 16,fontFamily:Constants.AppFont, padding:10,color:'white'}}
                    dropdownStyle={optionStyles.dropdownStyle}
                    dropdownTextStyle={optionStyles.dropdownTextStyle}
                    list={Constants.options}
                    onSelect={(value)=>params.changeCityHandler(Constants.options[value])}>
                </ModalDropdown>
            ),
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
    //Lifecylcle Methods
    componentWillMount(){
        
        const { navigation } = this.props;
        category_id = navigation.getParam('category_id');
    }
    componentDidMount()
    {
        this.props.navigation.setParams({
            changeCityHandler: this.changeCityHandler,
            currentCity: this.state.currentCity,
        });
        this.getRestaurantsData();
    }
    componentWillUnmount() {
       
      }

    getCityRestaurantsData()
    {
        const {start} = this.state;
        this.props.getCity(
            city_name,
            () => this.isCitySuccessCallBack(),
            response => this.isCityFailureCallBack(response)
          );
    }
    getRestaurantsData()
    {
        const {start} = this.state;
        this.props.getRestaurants(
            this.state.start,
            this.state.count,
            category_id,
            () => this.isRestaurantSuccessCallBack(),
            response => this.isRestaurantFailureCallBack(response)
          );
        this.setState({
            start:start+20,
        })  
    }

    changeCityHandler = (city) => {
        city_name = city;
        this.setState({
            restaurants:[],
            start:0,
        })
        this.setState({
            isLoaded:false,
            isProcess:false,
            isAllRestaurantList:false,
            currentCity:city,})

        setTimeout(()=>{
            this.getCityRestaurantsData();
        },500)
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
    renderNoDataView()
    {
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:18,color:'black',fontFamily:Constants.AppFont}}>{'No Any Restaurants Found'}</Text>   
            </View>
        );
    }
    renderRestaurantsList()
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
                        // alert('end list');
                        if(this.state.isAllRestaurantList)
                            this.getRestaurantsData();
                        else    
                            this.getCityRestaurantsData();
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
        );
    }
    render(){
        return(
            <View style={styles.container}>
                {(this.state.isLoaded) && this.renderSearchView()}
                {(!this.state.isLoaded) && this.state.isProcess &&  this.renderNoDataView()}
                {(!this.state.isProcess) && <LoadingIndicator/>}
                {(this.state.isLoaded) && this.renderRestaurantsList()}
                {(this.state.isEndList) && <LoadingIndicator/>}
            </View>
        )
    }
    isCitySuccessCallBack() {
        let cityData = this.props.cityData;
        city_id = cityData[0].id;      
        this.props.getCityRestaurants(
            city_id,
            this.state.start,
            this.state.count,
            category_id,
            () => this.isCityRestaurantSuccessCallBack(),
            response => this.isCityRestaurantFailureCallBack(response)
          );
    }
    isCityFailureCallBack(response) {
        if(response!=null)
        {
            console.log(response);
        }     
    }
    isRestaurantSuccessCallBack() {
        let restaurantList = this.props.allRestaurantList;
        const {restaurants} = this.state;
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
        this.setState({isProcess:true,isEndList:false}) 
    }
    isRestaurantFailureCallBack(response) {
        if(response!=null)
        {
            console.log(response);
        }
        this.setState({isProcess:true})      
    }
    isCityRestaurantSuccessCallBack() {
        let restaurantList = this.props.restaurantList;
        const {restaurants} = this.state;
        const {start} = this.state;
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
        this.setState({isProcess:true,isEndList:false,start:start+20}) 
    }
    isCityRestaurantFailureCallBack(response) {
        if(response!=null)
        {
            console.log(response);
        }
        this.setState({isProcess:true})      
    }
}
const mapStateToProps = (state) => ({
    // console.log('123',state);
    cityData: state.city.cityData,
    allRestaurantList: state.restaurants.allRestaurantList,
    restaurantList: state.cityRestaurants.restaurantList
  });
  
  const mapDispatchToProps = dispatch => ({
    getCity : (
        city_name,
        isCitySuccessCallBack,
        isCityFailureCallBack
    ) =>
      dispatch(
        cityActions.cityRequest(
            city_name,
            isCitySuccessCallBack,
            isCityFailureCallBack
        )
      ),
      getRestaurants : (
        start,
        count,
        category_id,
        isRestaurantSuccessCallBack,
        isRestaurantFailureCallBack
    ) =>
      dispatch(
        RestaurantsActions.restaurantsRequest(
            start,
            count,
            category_id,
            isRestaurantSuccessCallBack,
            isRestaurantFailureCallBack
        )
      ),
    getCityRestaurants : (
        city_id,
        start,
        count,
        category_id,
        isCityRestaurantSuccessCallBack,
        isCityRestaurantFailureCallBack
    ) =>
      dispatch(
        cityRestaurantsActions.cityRestaurantsRequest(
            city_id,
            start,
            count,
            category_id,
            isCityRestaurantSuccessCallBack,
            isCityRestaurantFailureCallBack
        )
      )
  });
  
  export default connect(mapStateToProps,mapDispatchToProps)(RestaurantsList);

  RestaurantsList.propTypes = {
    getCityRestaurants: PropTypes.func,
    getRestaurants:PropTypes.func,
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    restaurantList: PropTypes.array,
    allRestaurantList: PropTypes.array,
    getCity: PropTypes.func,
    cityData: PropTypes.object
  };