import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity,BackHandler, ImageBackground } from 'react-native';
import Styles from './Styles';
import HeaderView from '../../components/HeaderView';
import AppColors from '../../utils/AppColors';
import Strings from '../../utils/Strings';
import Images from '../../assets/Images';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../components/MainButton';
import Fonts from '../../assets/Fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { getAsyncStorage, setAsyncStorage } from '../../controllers/AsyncstorageControllers';
import CONSTANTS from '../../utils/Constants';
import Spinner from '../../components/Spinner';
import CustomCodeInput from '../../components/CustomCodeInput';
import SimpleToast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Actions from '../../webservices/Actions';

const Confirmation = ({ route,navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('')
    const[usertoken ,setuserToken ] = useState('')
    // const { usertoken } = route.params;
    const [myToken, setMyToken] = useState('');



    getAsyncStorage(CONSTANTS.TOKEN).then((res) => {
        if (res != null) {
            setMyToken(res)
        }
    });


    useEffect(() => {
     BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);


      useEffect(() => {
            
        const { usertoken } = route.params;
        setuserToken(usertoken)
        
    }, [])
  


    const submit = () => {
        navigation.replace('Login')
    }


    function handleBackButtonClick() {
        navigation.replace('Login')
        return true;
      }





      





    // API call for verification
    const checkOtpVerification = (otp) => {
            setLoading(true);
            const token = myToken
            Actions.checkOtpVerification(otp,token,usertoken).then((response) => {
                setLoading(false);
               
                if (response.data.status) {

                    SimpleToast.show(response.data.message, SimpleToast.SHORT)
                    AsyncStorage.setItem(CONSTANTS.USER_TOKEN, response.data.data.userToken)
                     navigation.replace('Upload');
                    


                }
                else {
                    SimpleToast.show(response.data.message, SimpleToast.SHORT)

                }
            }).catch((err) => {
                setLoading(false)
                SimpleToast.show('Something went wrong.', SimpleToast.SHORT)
            })
        

    }




    // API call for resend OTP

    const resendOtp = () => {
        setLoading(true);
        AsyncStorage.multiGet([CONSTANTS.TOKEN, CONSTANTS.USER_TOKEN]).then((res) => {
            let token = res[0][1];
            // let usertoken = JSON.parse(res[1][1]);
            console.log('eett' + token + "  " + usertoken)

            Actions.resendOtp(token, usertoken).then((response) => {
                setLoading(false);
                if (response.data.status) {
                    SimpleToast.show(response.data.message, SimpleToast.SHORT)

                }
                else {
                    SimpleToast.show(response.data.message, SimpleToast.SHORT)

                }

            }).catch((err) => {
                setLoading(false)
                SimpleToast.show('Something went wrong.', SimpleToast.SHORT)
            })
        })

    }

       const doVerification = () => {
        if (otp.length <= 3) {
            SimpleToast.show('Please enter 4 digit verification code')
        }
        else {
            checkOtpVerification(otp)
        }
    }


    const inputRef = useRef();

    return (
        <ImageBackground source={Images.white_bg} style={[Styles.container]}>
            <HeaderView notificationColor={AppColors.BLACK} menuWhite left menuColor={AppColors.RED} leftPress={() => submit()} title={'Verification'} />
            {loading ? <Spinner /> : null}
            <View style={Styles.notificationView}>
                <Image style={{ width: wp('13%'), height: hp('13%') }} resizeMode='contain' source={Images.lock}></Image>
            </View>
            <Text style={{ width: '80%', color: '#303030', fontWeight: '500', fontFamily: Fonts.APP_REGULAR_FONT, textAlign: 'center', fontSize: heightPercentageToDP('2.4%') }} >Enter 4 Digit Verification Code.</Text>
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#ffffff', marginTop: 10 }} keyboardShouldPersistTaps={'handled'} scrollEnabled resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{ flex: 1 }}>
                <View style={{ marginTop: '3%' }}>


                    <CustomCodeInput
                        ref={inputRef}
                        secureTextEntry={false}
                        ignoreCase={true}
                        className={'clear'}
                        autoFocus={true}
                        codeLength={4}
                        space='6%'
                        size='5%'
                        keyboardType="number-pad"
                        containerStyle={{
                            justifyContent: 'center',
                            margin: 10,
                            alignItems: 'center',
                            height: hp('12%'),
                            marginTop: hp('2%'),

                        }}
                        codeInputStyle={{
                            justifyContent: 'center',
                            fontSize: 16,
                            color: 'black',
                            borderColor: '#E1E5E9',
                            borderWidth: 1,
                            borderRadius: 10,
                            shadowColor: '#000000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}
                        value={otp}
                        inputSize={{ height: hp('6%'), width: wp('15%'), alignSelf: 'center' }}
                        inputPosition="right"
                        onCodeChange={(text) => setOtp(text)}
                    />

                    <View style={{ marginTop: 50 }}>

                        <CustomButton tick goToNext={() => doVerification()} text='Verify' colors={AppColors.buttonColor} />

                        <TouchableOpacity onPress={() => resendOtp()} style={{ height: hp('5%'), width: wp('40%'), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, textDecorationLine: 'underline', }}>Resend OTP</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </KeyboardAwareScrollView>


        </ImageBackground>
    );
};

export default Confirmation;