import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import AppColors from '../../utils/AppColors';

const Styles = StyleSheet.create({
    container:{
        height: hp('100%'),
        width: wp('100%'),
        backgroundColor:'#fafafa',
        alignItems: 'center',
       
    },
    containernew: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e5e5e5",
      },
  
   
   
});

export default Styles;