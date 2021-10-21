import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Styles from './Styles';
import SignupPickerView, { SignupTextField } from '../../components/SignupPickerView';
import CustomButton from '../../components/MainButton';
import AppColors from '../../utils/AppColors';
import Images from '../../assets/Images';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import SimpleToast from 'react-native-simple-toast';
import { checkEmailValid } from '../../utils/Validations';
import Actions from '../../webservices/Actions';
import CONSTANTS from '../../utils/Constants';
import Spinner from '../../components/Spinner';
import { getAsyncStorage, setAsyncStorage } from '../../controllers/AsyncstorageControllers';
import HeaderView from '../../components/HeaderView';


const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dealername , setDealerName] = useState('');
    const [password, setPassword] = useState('');
    const [imageSource, setImageSource] = useState({});
    const [imageUri, setImageUri] = useState('');
    const [myToken, setMyToken] = useState('');
    const [fcm, setfcm] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [term1, setTerm1] = useState(false);
    const [showCarType, setShowCarType] = useState(false);
    const [carTypeValue, setCarTypeValue] = useState('');

    const [hide, setHide] = useState(true);
    const [loading, setLoading] = useState(false);
    const second = useRef();
    const first = useRef();
    const third = useRef();
    const fourth = useRef();
    const five = useRef();


    getAsyncStorage(CONSTANTS.TOKEN).then((res) => {
        if (res != null) {
            setMyToken(res)
        }
    });

    const showPicker = () => {
        refRBSheet.current.open();
    }

    const closePicker = () => {
        refRBSheet.current.close();
    }

    getAsyncStorage(CONSTANTS.FCM_TOKEN).then((res) => {
        if (res != null) {
            setfcm(res)
        }
    })

    // open gallery
    const setImages = () => {
        ImagePicker.openPicker({
            includeBase64: true,
            cropping: true
        }).then(response => {
            handleImage(response)
        })
    }

    // open camera
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            includeBase64: true,
            height: 400,
            cropping: true
        }).then(response => {
            handleImage(response)
        })
    }

    // Image Handling
    const handleImage = (response) => {
        closePicker();
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            // alert(JSON.stringify(response))
            let url = { uri: response.path }
            let uri = (`data:${response.mime};base64,` + response.data)
            console.log('y', uri)
            setImageSource(url);
            setImageUri(uri);
            // alert(imageUri)
        }
    }

    const doSignUp = () => {
        if (name === '') {
            SimpleToast.show('Please enter name', SimpleToast.SHORT);
        }
         else if(dealername === ''){
            SimpleToast.show('Please enter dealer name', SimpleToast.SHORT);
  
         }

        else if (email === '') {
            SimpleToast.show('Please enter email address', SimpleToast.SHORT);
        }
        else if (checkEmailValid(email)) {
            SimpleToast.show('Please enter valid email address', SimpleToast.SHORT);
        }
        else if (password === '') {
            SimpleToast.show('Please enter password', SimpleToast.SHORT);
        }
        else if (confirmpassword === '') {
            SimpleToast.show('Please enter Password to confirm', SimpleToast.SHORT);
        }
        else if (password != confirmpassword) {
            SimpleToast.show('Password not matched', SimpleToast.SHORT);
        }

        else if(carTypeValue === ''){
            SimpleToast.show('Please select state', SimpleToast.SHORT);

        }

        // else if (imageUri === '') {
        //     SimpleToast.show('Please select your profile picture', SimpleToast.SHORT);
        // }
        else if (!term1) {
            SimpleToast.show('Please allow terms and conditions', SimpleToast.SHORT);
        }

        else {
            signUp();
        }
    }

   

    const signUp = () => {
        setLoading(true)
        const formData = new FormData()
        formData.append('image', imageUri);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('deviceToken', fcm);
        formData.append('dealerName',dealername);
        formData.append('state',carTypeValue);

        const mainData = { data: formData, token: myToken };

        Actions.Register(mainData)
            .then((response) => {
                console.log("res " + JSON.stringify(response))
                setLoading(false);
                if (response.data.status) {
                    // setAsyncStorage(CONSTANTS.USER_TOKEN, response.data.data.userToken, true);
                    navigation.replace('Confirmation',{usertoken: response.data.data.userToken});
                }
                else {
                    SimpleToast.show(response.data.message, SimpleToast.SHORT)

                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(JSON.stringify(err))
                SimpleToast.show('Something went wrong.', SimpleToast.SHORT)




            })
    }

    const refRBSheet = useRef();
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <KeyboardAwareScrollView enableOnAndroid={true} style={{ flex: 1, backgroundColor: '#ffffff' }} keyboardShouldPersistTaps={'handled'} scrollEnabled resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1, backgroundColor: '#ffffff' }} source={Images.white_bg}>
                <HeaderView notificationColor={AppColors.BLACK} menuWhite left menuColor={AppColors.RED} leftPress={() => navigation.goBack()} title={'Register'} />

                    {loading ? <Spinner /> : null}
                    <View style={{ marginTop: hp('1%') }}>
                        <TouchableOpacity style={Styles.ImageView} onPress={() => showPicker()}>
                            <Image style={Styles.ImageViewInner} resizeMode='cover' source={imageSource.uri ? imageSource : Images.men} />
                            <Image resizeMode='contain' style={Styles.createIcon} source={Images.upload} />

                        </TouchableOpacity>
                        <SignupTextField forwardRef={first} onSubmitEditing={() => second.current.focus()} focus={true} maxLength={40} image={Images.name} placeholder='Name' onChangeText={setName} value={name} />
                        <SignupTextField forwardRef={second} onSubmitEditing={() => third.current.focus()}  maxLength={40} image={Images.name} placeholder='Dealer Name' onChangeText={setDealerName} value={dealername} />

                        
                         <SignupTextField forwardRef={third} onSubmitEditing={() => fourth.current.focus()} keyboardType='email-address' maxLength={40} image={Images.email} placeholder='Email' onChangeText={setEmail} value={email} />
                        <SignupTextField forwardRef={fourth} onSubmitEditing={() => five.current.focus()} maxLength={40} image={Images.password} secureTextEntry={hide} placeholder='Password' onChangeText={setPassword} value={password} />
                        <SignupTextField forwardRef={five} maxLength={40} image={Images.password} secureTextEntry={hide} placeholder='Confirm Password' onChangeText={setConfirmPassword} value={confirmpassword} />

                    </View>
                    <SignupPickerView forState data={[{ name: 'Alabama' }, { name: 'Alaska' },{ name: 'Arizona' },{ name: 'Arkansas' },{ name: 'California' },{ name: 'Colorado' },{ name: 'Connecticut' },{ name: 'Delaware' },{ name: 'District Of Columbia' },{ name: 'Florida' },{ name: 'Georgia' },{ name: 'Hawaii' },{ name: 'Idaho' },{ name: 'Illinois' },{ name: 'Indiana' },{ name: 'Iowa' },{ name: 'Kansas' },{ name: 'Kentucky' },{ name: 'Louisiana' },{ name: 'Maine' },{ name: 'Maryland' },{ name: 'Massachusetts' },{ name: 'Michigan' },{ name: 'Minnesota' },{ name: 'Mississippi' },{ name: 'Missouri' },{ name: 'Montana' },{ name: 'Nebraska' },{ name: 'Nevada' },{ name: 'New Hampshire' },{ name: 'New Jersey' },{ name: 'New Mexico' },{ name: 'New York' },{ name: 'North Carolina' },{ name: 'North Dakota' },{ name: 'Ohio' },{ name: 'Oklahoma' },{ name: 'Oregon' },{ name: 'Pennsylvania' },{ name: 'Rhode Island' },{ name: 'South Carolina' },{ name: 'South Dakota' },{ name: 'Tennessee' },{ name: 'Texas' },{ name: 'Utah' },{ name: 'Vermont' },{ name: 'Virginia' },{ name: 'Washington' },{ name: 'West Virginia' },{ name: 'Wisconsin' },{ name: 'Wyoming' }]} setValue={(value) => { setCarTypeValue(value.name), setShowCarType(false) }} openPicker={() => {  setShowCarType(!showCarType)}} show={showCarType} value={carTypeValue} placeholder={'State'} />

                    <View style={Styles.bottomView}>
                        <TouchableOpacity style={Styles.checkBox} onPress={() => { setTerm1(!term1) }}>

                            <Image source={term1 ? Images.check_in : ''}
                                style={[Styles.checkView]}
                            />
                        </TouchableOpacity>
                        <Text style={[Styles.bottomText]}>I agree with</Text>
                        <TouchableOpacity onPress={() => navigation.push('TermCondition')}><Text style={[Styles.bottomText, { color: 'red', marginLeft: 4 }]}>Terms and conditions</Text></TouchableOpacity>
                    </View>
                    <View style={{ marginTop: hp('2%') }}>
                        <CustomButton next goToNext={() => doSignUp()} text='Sign Up' colors={AppColors.buttonColor} />
                    </View>
                    <View style={Styles.bottom} />
                    <RBSheet
                        ref={refRBSheet}
                        height={280}
                        openDuration={250}
                        customStyles={{
                            container: {
                                alignItems: "center",
                                backgroundColor: 'transparent',
                                height: hp('30%')
                            }
                        }}>
                        <TouchableOpacity onPress={() => { openCamera() }} style={[Styles.pickerTypeView, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, marginTop: hp('5%'), }]}>
                            <Text style={Styles.closeText}>Choose from Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setImages() }} style={[Styles.pickerTypeView, { borderTopLeftRadius: 0, borderTopRightRadius: 0, }]}>
                            <Text style={Styles.closeText}>Choose from Photo library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.closeView} onPress={() => refRBSheet.current.close()}>
                            <Text style={[Styles.closeText, { color: AppColors.RED }]}>Cancel</Text>
                        </TouchableOpacity>
                    </RBSheet>
                </ImageBackground>
            </KeyboardAwareScrollView>
        </ScrollView>
    );
};

export default Register;