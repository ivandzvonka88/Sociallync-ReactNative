import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../assets/Fonts';
import AppColors from '../../utils/AppColors';

const Styles = StyleSheet.create({
    container:
    {
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa'
    },
    topView:
    {
        top: -10,
        position: 'absolute',
        width: wp('100%'),
        height: hp('30%'),
    },
    midView:
    {
        alignSelf: 'center',
        marginTop:hp('18%'),
        height:hp(40),
        width:wp(100),
        // backgroundColor:'red'
    },
    ImageView:
    {
        height: hp('15%'),
        width: hp('15%'),
        backgroundColor: '#f6d7d9',
        borderRadius: 100,
        alignSelf: 'center',
        margin: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center',

    },
    createIcon:
    {
        height: hp('3.5%'),
        width: hp('3.5%'),
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 10,

        right: 0, top: 0, position: 'absolute',
        alignItems: 'center',
        backgroundColor: AppColors.BLACK
    },
    bottomView: {
        bottom: 5,
        position: 'absolute',
        width: wp('100%'),
        marginBottom: 5
    },
    changePass:
    {
        height: hp('5%'),
        textAlign: 'center',
        alignSelf: 'center',
        color: 'red',
        marginTop: 10,
        marginBottom: 10,
        fontSize: hp('2%')
    },
    textOuterView:
    {
        width: wp('100%'),
        height: hp('8.3%'),
        borderBottomWidth: 1,
        flexDirection: 'row', alignItems: 'center',
        borderBottomColor: AppColors.GREY,
        backgroundColor:AppColors.WHITE,
        // backgroundColor:'red',
        paddingBottom:10,
        marginTop:15
    },
    textIcon:
    {
        margin: 10,
        marginLeft: 15,
        width: 25, height: 25
    },
    textView:
    {
        alignSelf: 'center',
        width: '70%',
        margin:10
    },
    textStyle:
    {
        color: 'red',
        fontSize: hp('2.0%'),
        paddingLeft: 5,
        fontWeight: '600',
        fontFamily:Fonts.APP_MEDIUM_FONT,
        textAlign: 'left',
        // backgroundColor:'pink'
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
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.WHITE,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent'
    },

    pickerTypeView: {
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