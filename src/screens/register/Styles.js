import { Platform, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Fonts from '../../assets/Fonts';
import AppColors from '../../utils/AppColors';


const Styles = StyleSheet.create({
    socialText:
    {
        textAlign: 'center',
        fontSize: hp('5%'),
        padding: hp('6%'),
        marginTop: hp('3%'),
        color: 'red',
        fontWeight: 'bold'
    },
    lyncText:
    {
        textAlign: 'center',
        color: 'red',
        fontWeight: '100'
    },
    socialImage: {
        width: wp('100%'),
        height: hp('5%'),
        alignSelf: 'center',
        padding: '10%',
        marginTop: '15%'
    },

    forgotView:
    {
        right: 0,
        top: 6,
        padding: 7,
        marginRight: wp('6%'),

    },
    forgotText:
    {
        textAlign: 'right',
        fontSize: hp('1.9%'),
        color: AppColors.loginRed,
        fontWeight: '700',
        fontFamily: Fonts.APP_REGULAR_FONT
    },
    midView:
    {
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
        marginTop: hp('3%'),
        marginLeft: 20,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomText: {
        textAlign: 'center',
        fontSize: hp('1.9%'),
        color: '#8e8e8e',
        marginLeft: 10,
        alignSelf: 'center',
        fontWeight: '500',
        fontFamily: Fonts.APP_REGULAR_FONT

    },
    checkView:
    {
        height: hp('3.2%'),
        width: hp('3.2%'),
        borderWidth: 1,
        borderRadius: 6,
        borderColor: 'transparent',
        backgroundColor: AppColors.WHITE,
        alignSelf: 'center',

    },
    checkBox:
    {
        height: hp('3%'),
        width: hp('3%'),
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.3,
        elevation: 7, shadowColor: '#000000', borderRadius: 7,
        backgroundColor: AppColors.WHITE
    },
    ImageView: {

        alignSelf: 'center',
        margin: hp('3%'),
        justifyContent: 'center',
        alignItems: 'center',

    },
    ImageViewInner:
    {
        height: hp('15%'),
        width: hp('15%'),
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'transparent',
        alignSelf: 'center',
        overflow: 'hidden',

    },
    createIcon:
    {
        height: hp('4%'),
        width: hp('4%'),
        right: 0,
        bottom: 0, position: 'absolute',
        marginBottom: 10

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