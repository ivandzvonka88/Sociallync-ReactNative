import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Styles = StyleSheet.create({
    container: {
        height: hp('100%'),
        width: wp('100%'),
        backgroundColor: '#fafafa',
        alignItems: 'center',

    },
    notificationView: {
        height: hp('17%'),
        width: hp('17%'),
        backgroundColor: '#fbe4e7',
        borderRadius: 100,
        alignSelf: 'center',
        margin: hp('4.1%'),
        justifyContent: 'center',
        alignItems: 'center'
    },


});

export default Styles;