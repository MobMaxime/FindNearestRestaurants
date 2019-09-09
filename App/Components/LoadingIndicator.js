import React, { Component } from 'react'
import {ActivityIndicator} from 'react-native'
import styles from '../Components/Styles/LoadingIndicatorStyle'
class LoadingIndicator extends Component {
    render () {
        return (
            <ActivityIndicator 
                    style={styles.activityIndicator}
                    size='large' 
                    color='grey' 
                    animating={true}/>
        )
    }
}
export default LoadingIndicator