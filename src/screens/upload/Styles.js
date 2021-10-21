import { Platform, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../assets/Fonts';
import AppColors from '../../utils/AppColors';


const Styles = StyleSheet.create({
    imageOuterView:
    {
        height: hp('25%'),
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',

    },

    bottom: {
        height: hp('5%')
    },
    closeView:
    {
        bottom: 0,
        position: 'absolute',
        marginBottom: 10,
        width: '100%',
        // borderTopColor: AppColors.GREY,
        borderTopWidth: 1,
        height: hp('8%'),
        alignSelf: 'center', justifyContent: 'center',
        backgroundColor: AppColors.WHITE,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent'
    },

    pickerTypeView:
    {
        //    margin:10,
        width: '100%',
        borderTopColor: AppColors.GREY,
        borderTopWidth: 1,
        height: hp('7%'),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.WHITE,

        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white'
    },
    closeText:
    {
        color: AppColors.BLUE,
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingLeft: 10,
        textAlign: 'center',
        fontFamily: Fonts.APP_REGULAR_FONT
    },
    dialogOuterView: {
        backgroundColor: AppColors.WHITE, borderRadius: 20,
        width: wp('70%'), alignSelf: 'center',
        height: hp('28%'), justifyContent: 'center', alignItems: 'center'

    },

    imageView: {
        top: 0,
        position: 'absolute',
        height: hp('9%'),
        width: hp('9%'),
        borderRadius: 100,
        backgroundColor: '#fbdedb',
        alignSelf: 'center',
        marginTop: -hp('8%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    sentText: {
        color: AppColors.BLACK,
        fontSize: hp('3%'),
        fontFamily: Fonts.APP_REGULAR_FONT,
        marginTop: hp('5%'),
        alignSelf: 'center',
        textAlign: 'center',

    }

});

export default Styles;