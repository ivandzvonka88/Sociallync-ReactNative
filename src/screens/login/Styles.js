import { Platform, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Fonts from '../../assets/Fonts';
import AppColors from '../../utils/AppColors';


const Styles = StyleSheet.create({
    socialText: {
        textAlign: 'center',
        fontSize: hp('5%'),
        padding: hp('6%'),
        marginTop: hp('3%'),
        color: 'red',
        fontWeight: 'bold'
    },
    lyncText: {
        textAlign: 'center',
        color: 'red',
        fontWeight: '100'
    },
    socialImage: {
        width: wp('85%'),
        height: hp('5%'),
        alignSelf: 'center',
        padding: '10%',
        marginTop: '15%'
    },

    forgotView: {
        right: 0,
        top: 6,
        padding: 7,
        marginRight: wp('6%'),

    },
    forgotText: {
        textAlign: 'right',
        fontSize: hp('1.9%'),
        color: AppColors.loginRed,
        fontWeight: '700',
        fontFamily: Fonts.APP_REGULAR_FONT
    },
    midView: {
        height: hp('26%'),
        width: wp('90%'),
        alignSelf: 'center',
        borderRadius: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: AppColors.FaceBG,
        backgroundColor: AppColors.FaceBG,
        justifyContent: 'flex-start',
        paddingTop: 25,
        alignItems: 'center'
    },
    bottomView: {
        bottom: 0,
        position: 'absolute',
        marginBottom: Platform.OS === 'ios' ? hp('3.5%') : 15,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomText: {
        textAlign: 'center',
        fontSize: hp('1.9%'),
        color: '#8e8e8e',
        alignSelf: 'center',
        fontWeight: '500',
        fontFamily: Fonts.APP_REGULAR_FONT
    }

});

export default Styles;