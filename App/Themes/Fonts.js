import {Platform} from 'react-native';
const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic'
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}
const  Fonts ={
  
  OpenSansBold : Platform.OS === 'ios' ? 'OpenSans-Bold' : 'OpenSansBold',
  OpenSansBoldItalic : Platform.OS === 'ios' ? 'OpenSans-BoldItalic' : 'OpenSansBoldItalic',
  OpenSansLight : Platform.OS === 'ios' ? 'OpenSans-Light' : 'OpenSansLight',
  SourceSansBold : Platform.OS === 'ios' ? 'SourceSansPro-Bold' : 'SourceSansProBold',
  SourceSansReg : Platform.OS === 'ios' ? 'SourceSansPro-Regular' : 'SourceSansProRegular',
  RalewayBold : Platform.OS === 'ios' ? 'Raleway-Bold' : 'RalewayBold',
  RalewayMedium : Platform.OS === 'ios' ? 'Raleway-Medium' : 'RalewayMedium',
  // AllerBold : Platform.OS === 'ios' ? 'Aller_Bd' : 'AllerBd',
  // AllerReg : Platform.OS === 'ios' ? 'Aller_Rg' : 'AllerRg',
}
export default {
  type,
  size,
  style,
  Fonts,
}
