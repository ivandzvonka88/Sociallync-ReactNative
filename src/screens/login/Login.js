import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Styles from './Styles';
import { SignupTextField } from '../../components/SignupPickerView';
import CustomButton from '../../components/MainButton';
import Strings from '../../utils/Strings';
import AppColors from '../../utils/AppColors';
import Images from '../../assets/Images';
import Actions from '../../webservices/Actions';
import { getAsyncStorage, setAsyncStorage } from '../../controllers/AsyncstorageControllers';
import CONSTANTS from '../../utils/Constants';
import SimpleToast from 'react-native-simple-toast';
import { checkEmailValid } from '../../utils/Validations';
import Spinner from '../../components/Spinner';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState(true);
    const second = useRef();
    const first = useRef();
    const [loading, setLoading] = useState(false);
    const [jwtToken, setToken] = useState('');
    const [fcm, setfcm] = useState('');
    const [biometricType, setbiometricType] = useState(null);
    const [uniqueId , setUniqueId] = useState('');
    const [deviceName,setdeviceName] = useState('');

    useEffect(() => {
        getToken();
        let uniqueId = DeviceInfo.getUniqueId();
        DeviceInfo.getDeviceName().then(deviceName => {
            setdeviceName(deviceName);
            setUniqueId(uniqueId);
          });

        FingerprintScanner.isSensorAvailable()
            .then((biometryType) => {
                setbiometricType(biometryType)

            })
            .catch((error) => console.log('isSensorAvailable error => ', error));
    }, [])



    const getMessage = () => {

        if (biometricType == 'Face ID') {
            return 'Scan your Face on the device to continue'
        }
        else {
            return 'Scan your Fingerprint on the device scanner to continue'
        }
    }


    const showAuthenticationDialog = () => {

        if (biometricType !== null && biometricType !== undefined) {
            FingerprintScanner.authenticate({
                description: getMessage()
            })
                .then(() => {
                      
                        // navigation.replace('Upload');
                        handleFaceLogin();
                    
                  


                })
                .catch((error) => {
                    alert('Authentication error is => ', error, SimpleToast.SHORT);
                });
        }
        else {
            alert('biometric authentication is not available', SimpleToast.SHORT);
        }
    };


    const getToken = () => {
        Actions.GetToken().then((response) => {
            console.log(response)
            AsyncStorage.setItem(CONSTANTS.TOKEN, response.data.data.token);
            setToken(response.data.data.token)
        })
    }


    getAsyncStorage(CONSTANTS.FCM_TOKEN).then((res) => {
        if (res != null) {
            setfcm(res);
        }
    })


    const doSingin = () => {

        if (email === '') {
            SimpleToast.show('Please enter email address', SimpleToast.SHORT);
        }
        else if (checkEmailValid(email)) {
            SimpleToast.show('Please enter valid email address', SimpleToast.SHORT);
        }
        else if (password === '') {
            SimpleToast.show('Please enter password', SimpleToast.SHORT);
        }

        else {
            login();
        }
    }


     const login = () => {
        console.log("LL",fcm);
        setLoading(true)
        const formData = new FormData()
        formData.append('email', email);
        formData.append('password', password);
        formData.append('deviceToken', fcm);
        formData.append('loginType', 1)
        const loginData = { data: formData, token: jwtToken };
        Actions.Login(loginData).then((response) => {
            console.log("login", JSON.stringify(response))
            setLoading(false);
            if (response.data.status) {
                if(response.data.data.emailVerifiedStatus === "1") {
                    SimpleToast.show('Login Sucessfully', SimpleToast.SHORT)
                    AsyncStorage.setItem(CONSTANTS.USER_TOKEN, response.data.data.userToken);
                    // setAsyncStorage(CONSTANTS.USER_TOKEN, response.data.data.userToken, true);
                    navigation.replace('Upload');
                }
                else{
                    // setAsyncStorage(CONSTANTS.USER_TOKEN, response.data.data.userToken, true);
                   navigation.replace('Confirmation',{usertoken:response.data.data.userToken});
                }
            }
            else {
                setLoading(false);
                SimpleToast.show(response.data.message, SimpleToast.SHORT)
            }
        })
        .catch((error) => {
            setLoading(false);
            SimpleToast.show(error, SimpleToast.SHORT)
        })
    }


     const handleFaceLogin = () => {
        const formdata = new FormData();
        formdata.append('faceId',uniqueId);
        formdata.append('name',deviceName);
        formdata.append('deviceToken',fcm); 
        const facedata = { data: formdata, token: jwtToken };
        Actions.FaceLogin(facedata).then((response) => {
            if(response.data.status) {
                SimpleToast.show('Login Sucessfully', SimpleToast.SHORT)
                AsyncStorage.setItem(CONSTANTS.USER_TOKEN, response.data.data.userToken)
                // setAsyncStorage(CONSTANTS.USER_TOKEN, response.data.data.userToken, true);               
                 navigation.replace('Upload');


            }
            else{
                setLoading(false);
                SimpleToast.show(response.data.message, SimpleToast.SHORT)
            }

        }).catch((error)=>{
            setLoading(false);
            SimpleToast.show(error, SimpleToast.SHORT)  
        })


     }









    return (
        <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#ffffff' }} keyboardShouldPersistTaps={'handled'} scrollEnabled resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{ flex: 1 }}>

            <ImageBackground style={{ width: null, height: null, flex: 1, justifyContent: 'center' }} source={Images.white_bg}>
                {loading ? <Spinner /> : null}
                <Image style={Styles.socialImage} resizeMode='contain' source={Images.red_logo}></Image>
                <View style={{ marginTop: hp('5%') }}>
                    <SignupTextField forwardRef={first} onSubmitEditing={() => second.current.focus()} keyboardType='email-address' maxLength={40} image={Images.email} placeholder='Email' onChangeText={setEmail} value={email} />
                    <SignupTextField forwardRef={second} maxLength={40} hide={() => setHide(!hide)} password image={Images.password} secureTextEntry={hide} placeholder='Password' onChangeText={setPassword} value={password} />
                </View>
                <TouchableOpacity onPress={() => navigation.push('ForgotPassword')} style={Styles.forgotView}>
                    <Text style={Styles.forgotText}>{Strings.FORGOT_PASSWORD}</Text>
                </TouchableOpacity>
                <CustomButton next goToNext={() => doSingin()} text='Sign In' colors={AppColors.buttonColor} />
                <TouchableOpacity onPress={() => showAuthenticationDialog()} style={Styles.midView}>
                    <Image style={{ width: 50, height: 50 }} resizeMode='contain' source={Images.face} />
                    <Text style={[Styles.bottomText, { marginTop: 20, fontSize: hp('2.1%') }]}>Sign in with <Text style={[Styles.bottomText, { fontWeight: '700', color: '#ec6367' }]}>Face ID</Text></Text>
                    <Text style={[Styles.bottomText, { fontWeight: '500', color: '#898989', fontSize: hp('2.1%'), width: wp('60%') }]}>Look directly at your front camera to use Face ID</Text>
                </TouchableOpacity>
                <View style={Styles.bottomView}>
                    <Text style={[Styles.bottomText]}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.push('Register')}><Text style={[Styles.bottomText, { color: 'red' }]}> {Strings.SIGNUP}</Text></TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    );
};

export default Login;