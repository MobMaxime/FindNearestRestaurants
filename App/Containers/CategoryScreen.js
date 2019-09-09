import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Text, Image, View , TouchableOpacity,FlatList,StatusBar} from 'react-native'
import styles from './Styles/CategoryScreenStyles'
import categoryActions from '../Redux/CategoryRedux';
import PropTypes from 'prop-types';
import AppLogo from '../Components/AppLogo'
import ModalDropdown from 'react-native-modal-dropdown';
import optionStyles from '../Components/Styles/SelectDropDownStyle'
import Constants from '../../App/Globals/Constants'
import colors from '../Themes/Colors'
import LoadingIndicator from '../Components/LoadingIndicator'
class CategoryScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoaded:false,
            categories:null,
            selectedCity:'',
            
        }
    }
    static navigationOptions = ({navigation}) =>  {
        const {params = {}} = navigation.state;
        return{
            headerTitle:<AppLogo/>,
            headerLayoutPreset:'center',
            headerRight:(
                <ModalDropdown options={Constants.options} style={{right:10,left:0}}
                    defaultValue='Select City'
                    textStyle={{fontSize: 16,fontFamily:Constants.AppFont,padding:10,color:'white'}}
                    dropdownStyle={optionStyles.dropdownStyle}
                    dropdownTextStyle={optionStyles.dropdownTextStyle}
                    onSelect={(value)=>params.changeCityHandler(Constants.options[value])}
                    />
            ),
            headerStyle:{  
                backgroundColor:colors.ThemeColor,
            },
            headerTitleStyle: {
                alignSelf:'center'
            },
            headerTintColor:colors.HeaderTintColor,
        }

    } 
    componentDidMount()
    {
        this.props.navigation.setParams({
            changeCityHandler: this.changeCityHandler
        });
        this.props.getCategories(() => 
            this.isSuccessCallBack(),
            response => this.isFailureCallBack(response)
          );
    }
    componentWillUnmount() {

      }
    OnCategoryClicked = (CategoryId)=>{
        this.props.navigation.navigate('RestaurantsList',{category_id:CategoryId});
    }
    changeCityHandler = (city) => {
        this.setState({
            selectedCity: city
        })
    }
    setCategoryImage=()=>
    {
        var RandomNumber = Math.floor(Math.random() * 4) + 1 ;
        var data =  [require("../Images/Category/food1.jpg"), require("../Images/Category/food2.jpg"), 
        require("../Images/Category/food3.jpg"), require("../Images/Category/food4.jpg"),
        require("../Images/Category/food5.jpg")]

        return (<Image source={data[RandomNumber]} style={{width:'100%',height:'100%'}}/>)
    }
    renderCategoryList()
    {
        const {categories} = this.state;       
        return(
            
            <FlatList data={categories}    
                renderItem={
                    ({item})=>
                    <TouchableOpacity onPress={()=>this.OnCategoryClicked(item.categories.id)}>
                        <View style={styles.categoryView}>
                            {this.setCategoryImage()}
                            <View style={styles.centeredTextView}>
                                <Text style={styles.categoryText}>{item.categories.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    }
                keyExtractor={(item,index)=>index.toString()}
                >                    
            </FlatList>
        );
    }
    render(){
        return(
            <View style={styles.container}> 
                <StatusBar
                    barStyle = "light-content"
                    backgroundColor = {colors.ThemeColor}/>  
                 {(this.state.isLoaded) && this.renderCategoryList()}
                 {(!this.state.isLoaded) && <LoadingIndicator/>} 
            </View>
        )
    }
    isSuccessCallBack() {
        let categoryData = this.props.categoryData;
        this.setState({
            isLoaded: true,
            categories: categoryData,
        });
    }
    isFailureCallBack(response) {
        if(response!=null)
        {
            console.log(response);
        }     
    }
}
const mapStateToProps = (state) => ({
    categoryData: state.category.categoryData
  });
  
  const mapDispatchToProps = dispatch => ({
    getCategories : (
        isSuccessCallBack,
        isFailureCallBack
    ) =>
      dispatch(
        categoryActions.categoryRequest(
            isSuccessCallBack,
            isFailureCallBack
        )
      )
  });
  
  export default connect(mapStateToProps,mapDispatchToProps)(CategoryScreen);

  CategoryScreen.propTypes = {
    getCategories: PropTypes.func,
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    categoryData: PropTypes.object
  };
  
