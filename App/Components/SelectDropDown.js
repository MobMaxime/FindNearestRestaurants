import React, { Component } from 'react'
import {Text,View,Image} from 'react-native'
import PropTypes from 'prop-types';
import ModalDropdown from 'react-native-modal-dropdown';
import optionStyles from './Styles/SelectDropDownStyle'
import Images from '../../ignite/DevScreens/DevTheme/Images';
const options = ['Ahmedabad','Surat','Rojkot'];


export default class SelectDropdown extends Component {
  render()
  {
    const { list, value, onSelectAction} = this.props;
    return(
      <ModalDropdown options={options} style={{right:10,left:0}}
      textStyle={{fontSize: 16, padding:10,color:'white'}}
      dropdownStyle={optionStyles.dropdownStyle}
      dropdownTextStyle={optionStyles.dropdownTextStyle}
      options={list}
      onSelect={(index, selectedValue) => onSelectAction(selectedValue)}
      >
        <View style={optionStyles.viewContainingFilterTitle}>
              <Text style={optionStyles.filterTitleText}>
                {value}
              </Text>
              <Image source={Images.down_arraow} style={optionStyles.dropdownIcon} />
            </View>
      </ModalDropdown>
  );
  }
}
SelectDropdown.propTypes = {
  list: PropTypes.array,
  value: PropTypes.string,
  onSelectAction: PropTypes.func,
  containerStyle: PropTypes.object
};
