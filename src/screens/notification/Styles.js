import { Platform, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../assets/Fonts';
import AppColors from '../../utils/AppColors';

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
        margin: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatView: {
        width: '100%',
        paddingTop: 10,
        paddingBottom:hp(3),
        height: hp('65%')
    },
    flatInnerView: {
        width: '90%',
        height: hp('12%'),
        borderRadius: 20,
        backgroundColor: AppColors.WHITE,
        alignSelf: 'center',
        margin: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.3,
        elevation: 10,
        flexDirection: 'row'
    },
    imageView: {
        alignSelf: 'center',
        height: hp('5.7%'),
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: hp('5.7%'),
        backgroundColor: '#fbe4e7',
        borderRadius: 50
    },
    textView: {
        alignSelf: 'center',
        width: '70%'
    },
    textViewnew: {
        alignSelf: 'center',
        width: '90%'
    },
    textStyle: {
        color: AppColors.BLACK,
        fontFamily: Fonts.APP_REGULAR_FONT,
        fontSize: hp('1.9%'),
        paddingLeft: 5,
        fontWeight: '700',
        textAlign: 'left'
    },

    arrowStyle: {
        right: 0,
        position: 'absolute',
        alignSelf: 'center',
        marginRight: 20
    }

});

export default Styles;