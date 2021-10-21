import { StackRouter } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Platform.OS === 'android' ? StatusBar.setBackgroundColor('#c23639') : null
    },
    bgsplash: {
        width: wp('90%'),
        height: hp('50%')
    },
    whitebg: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containergradient: {

        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    indicator: {
        position: 'absolute',
        bottom: 50
    },

    splashtext: {

        color: '#ffffff',
        fontSize: 30,
        fontWeight: 'bold'

    }
})