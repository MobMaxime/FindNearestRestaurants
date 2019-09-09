// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// var newUrl = 'https://developers.zomato.com/api/v2.1/search?category=1';
// our "constructor"
const create = (baseURL = 'https://developers.zomato.com/api/v2.1/') => {

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'user-key': 'Your Zomato API key' //Generate and add here your Zomato API key
    },
    timeout: 10000
  })

  const getCategory = () => api.get('categories')
  const getRestaurants = (start,count,category_id) => api.get(`search?start=${start}&count=${count}&category=${category_id}`)
  const getCityRestaurants = (city_id,start,count,category_id) => api.get(`search?entity_id=${city_id}&entity_type=city&start=${start}&count=${count}&category=${category_id}`)
  const getLocationRestaurants = (lat,long,start,count) => api.get(`search?start=${start}&count=${count}&lat=${lat}&lon=${long}`)
  const getCity = (city_name) => api.get(`cities?q=${city_name}`)

  return {
    // a list of the API functions from step 2
    getCategory,
    getRestaurants,
    getCityRestaurants,
    getLocationRestaurants,
    getCity,
  }
}

// let's return back our create method as the default.
export default {
  create
}
