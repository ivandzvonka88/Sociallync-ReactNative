import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler, ImageBackground, TextInput, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from './Styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/MainButton';
import AppColors from '../../utils/AppColors';
import Images from '../../assets/Images';
import HeaderView from '../../components/HeaderView';
import Strings from '../../utils/Strings';
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { Dropdown } from 'react-native-material-dropdown';
import Fonts from '../../assets/Fonts';
import Actions from '../../webservices/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../../utils/Constants';
import SimpleToast from 'react-native-simple-toast';
import Spinner from '../../components/Spinner';
import EndPoints from '../../webservices/EndPoints';
import { ScrollView } from 'react-native-gesture-handler';

const currentDate = new Date();

Platform.OS === 'android' ? StatusBar.setBackgroundColor(AppColors.WHITE) : null


const Profile = ({ navigation }) => {

    useEffect(() => {
        getUserProfile();
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const backAction = () => {

        navigation.goBack();
        Platform.OS === 'android' ? StatusBar.setBackgroundColor('grey') : null
        return true;
    };

    const [allowEditing, setAllowEditing] = useState(false);
    const [showCalender, setShowCalender] = useState(false);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [dealername, setDealerName] = useState('');
    const [gender, setGender] = useState('Male');
    const [state, setState] = useState('');

    const [birthday, setBirthday] = useState('03-06-2020');
    const [imageSource, setImageSource] = useState({});
    const [serverimage, setServerImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUri, setImageUri] = useState({});
    const [token, setToken] = useState('');
    const [usertoken, setUserToken] = useState('');
    const [usertype, setuserType] = useState('');




    // API call for getting user info 
    const getUserProfile = () => {
        setLoading(true)

        AsyncStorage.multiGet([CONSTANTS.TOKEN, CONSTANTS.USER_TOKEN]).then((res) => {
            let token = res[0][1];
            let usertoken = res[1][1];
            setToken(token);
            setUserToken(usertoken);
            Actions.ViewUserProfile(token, usertoken).then((response) => {
                console.log("jjj " + JSON.stringify(response.data));
                setLoading(false)
                if (response.data.status) {
                    setEmail(response.data.data.email)
                    setUserName(response.data.data.name)
                    setServerImage(response.data.data.image)
                    setDealerName(response.data.data.dealerName)
                    setState(response.data.data.state)
                    // let url = { uri: EndPoints.IMAGES + response.data.data.image }
                    // setImageSource(url)
                    if (response.data.data.gender === '1') {
                        setGender('Male')
                    }
                    else if (response.data.data.gender === '2') {
                        setGender('Female')
                    }
                    else {
                        setGender('')
                    }

                    if (response.data.data.dob === '0000-00-00') {
                        setBirthday('')

                    }
                    else {
                        setBirthday(response.data.data.dob)

                    }
                    setuserType(response.data.data.userType)
                }
                else {
                    SimpleToast.show(response.data.message, SimpleToast.SHORT)

                }

            })
        }).catch((err) => {
            setLoading(false)
            SimpleToast.show('Something went wrong.', SimpleToast.SHORT)


        })
    }



    const showPicker = () => {
        refRBSheet.current.open();
    }

    const closePicker = () => {
        refRBSheet.current.close();
    }

    // open gallery
    const setImages = () => {

        ImagePicker.openPicker({
            cropping: true,
            includeBase64: true,
            includeExif: true,
        }).then(response => {
            handleImage(response)
        })
    }

    // open camera
    const openCamera = () => {

        ImagePicker.openCamera({
            width: 300,
            height: 400,
            includeBase64: true,
            includeExif: true,
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
            let url = { uri: response.path }
            let uri = (`data:${response.mime};base64,` + response.data)
            setImageSource(url);
            // setImageUri(uri);
            console.log(uri);
            uploadImage(uri);

        }
    }


    // API call for Image uploading 
    const uploadImage = (uri) => {
        setLoading(true)
        const formdata = new FormData();
        formdata.append('image', uri);
        const profiledata = { data: formdata, token: token, usertoken: usertoken };
        Actions.UpdateUserPic(profiledata).then((response) => {
            setLoading(false)

            if (response.data.status) {
                SimpleToast.show('Image upload sucessfully', SimpleToast.SHORT)

            }
            else {
                SimpleToast.show(response.data.message, SimpleToast.SHORT)

            }
        }).catch((err) => {
            setLoading(false)
            SimpleToast.show('something went wrong', SimpleToast.SHORT)

        })
    }


    // API call for update user Info
    const UpdateProfile = () => {
        if (userName === '') {
            SimpleToast.show('Please enter name', SimpleToast.SHORT)

        }
        else if (dealername === '') {
            SimpleToast.show('Please enter dealer name', SimpleToast.SHORT)

        }
        else {

            setAllowEditing(false)
            setLoading(true)
            const formdata = new FormData();
            formdata.append('name', userName);
            formdata.append('gender', gender === 'Male' ? '1' : '2');
            formdata.append('dob', birthday);
            formdata.append('dealerName', dealername);
            formdata.append('state', state)

            const updateprofile = { data: formdata, token: token, usertoken: usertoken };
            Actions.UpdateUserProfile(updateprofile).then((resposne) => {
                setLoading(false)

                if (resposne.data.status) {
                    SimpleToast.show('Profile updated successfully', SimpleToast.SHORT)

                }
                else {
                    SimpleToast.show(response.data.message, SimpleToast.SHORT)

                }
            }).catch((err) => {
                setLoading(false)
                SimpleToast.show('Something went wrong', SimpleToast.SHORT)

            })
        }

    }

    const refRBSheet = useRef();

    return (
        <SafeAreaView style={[Styles.container, { backgroundColor: AppColors.WHITE }]}>
            <StatusBar color='red' />
            <ImageBackground style={Styles.topView} resizeMode='cover' source={Images.profile_red}>
                <HeaderView statusbar rightPress={() => setAllowEditing(true)} edit menuWhite notificationColor={AppColors.WHITE} left leftPress={() => { Platform.OS === 'android' ? StatusBar.setBackgroundColor('grey') : null, navigation.goBack() }} title={Strings.PROFILE} />

                <TouchableOpacity onPress={() => showPicker()} style={Styles.ImageView}>

                    <Image source={imageSource.uri ? imageSource : serverimage ? { uri: EndPoints.IMAGES + serverimage } : Images.men} style={Styles.ImageView} />
                    <View style={Styles.createIcon}>
                        <Icon name='edit' size={15} color={AppColors.WHITE} />
                    </View>
                </TouchableOpacity>
            </ImageBackground>
            {loading ? <Spinner /> : null}
            {/* <ScrollView> */}

            <View style={Styles.midView}>
                <ScrollView >
                    <TextInfoView onChangeText={(text) => setUserName(text)} edit={allowEditing} heading='Full Name' value={userName} image={Images.user_grey} />
                    <TextInfoView onChangeText={(text) => setDealerName(text)} edit={allowEditing} heading='Dealer Name' value={dealername} image={Images.user_grey} />

                    <TextInfoView heading='Email' value={email} image={Images.email_grey} />
                    <TextInfoView gender setGender={(item) => setGender(item)} edit={allowEditing} heading='Gender' value={gender} image={Images.user_grey} />
                    <TextInfoView cancel={() => setShowCalender(false)} setDate={(date) => { setBirthday(moment(date).format('YYYY-MM-DD')), setShowCalender(false) }} showCalender={showCalender} openCalender={() => setShowCalender(true)} birthday edit={allowEditing} heading='Birthday' value={birthday} image={Images.birthday_grey} />
                    <TextInfoView state setState={(item) => setState(item)} edit={allowEditing} heading='State' value={state} image={Images.user_grey} />


                </ScrollView>
            </View>

            <View style={Styles.bottomView}>
                {
                    allowEditing ? <CustomButton usertype tick goToNext={() => UpdateProfile()} text='Save' colors={AppColors.buttonColor} /> : null

                }

                {
                    usertype === '1' ?

                        <TouchableOpacity onPress={() => { navigation.push('ChangePassword') }}>
                            <Text style={Styles.changePass}>Change Password</Text>
                        </TouchableOpacity> : null
                }


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
                }}
            >
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
        </SafeAreaView>
    );
};

export default Profile;


const TextInfoView = (props) => {
    return (
        <View style={Styles.textOuterView}>
            <Image resizeMode='contain' style={Styles.textIcon} source={props.image} />
            <View style={Styles.textView}>
                <Text style={[Styles.textStyle, { marginBottom: props.edit ? props.birthday ? 0 : -15 : 0 }]}>{props.heading}</Text>
                {props.edit ?
                    props.birthday ?
                        <TouchableOpacity onPress={() => props.openCalender()}>
                            <Text style={[Styles.textStyle, { paddingTop: 5, fontWeight: '200', color: AppColors.BLACK }]}>{props.value}</Text>
                        </TouchableOpacity>
                        :
                        props.gender ?

                            <Dropdown
                                onChangeText={(value) => props.setGender(value)}
                                style={[Styles.textStyle, { fontWeight: '200', backgroundColor: 'white', color: AppColors.BLACK, marginTop: 5, fontSize: hp('1.8%') }]}
                                inputContainerStyle={{ borderBottomColor: 'transparent', backgroundColor: 'transparent' }}
                                containerStyle={{ marginBottom: -20, marginTop: -hp('3%'), width: wp('80%') }}
                                value={props.value}
                                Icon={false}
                                data={[{
                                    value: 'Male',
                                }, {
                                    value: 'Female',
                                }]}
                                itemTextStyle={{ color: 'red', fontSize: 10, marginLeft: 5, }}
                            /> :

                            props.state ?
                                <Dropdown
                                    onChangeText={(value) => props.setState(value)}
                                    style={[Styles.textStyle, { fontWeight: '200', backgroundColor: 'white', color: AppColors.BLACK, marginTop: 5, fontSize: hp('1.8%') }]}
                                    inputContainerStyle={{ borderBottomColor: 'transparent', backgroundColor: 'transparent' }}
                                    containerStyle={{ marginBottom: -20, marginTop: -hp('3%'), width: wp('80%') }}
                                    value={props.value}
                                    Icon={false}
                                    data={[{
                                        value: 'Alabama',
                                    }, { value: 'Alaska', }, { value: 'Arizona', }, { value: 'Arkansas', }, { value: 'California', }, { value: 'Colorado', }, { value: 'Connecticut', }, { value: 'Delaware', }, { value: 'District Of Columbia', }, { value: 'Florida', }, { value: 'Georgia', }, { value: 'Hawaii', }, { value: 'Idaho', }, { value: 'Illinois', }, { value: 'Indiana', }, { value: 'Iowa', }, { value: 'Kansas', }, { value: 'Kentucky', }, { value: 'Louisiana', }, { value: 'Maine', }, { value: 'Nebraska', }, { value: 'Nevada', }, { value: 'New Hampshire', }, { value: 'New Jersey', }, { value: 'New Mexico', }, { value: 'New York', }, { value: 'North Carolina', }, { value: 'North Dakota', }, { value: 'Ohio', }, { value: 'Oklahoma', }, { value: 'Oregon', }, { value: 'Pennsylvania', }, { value: 'Rhode Island', }, { value: 'South Carolina', }, { value: 'South Dakota', }, { value: 'Tennessee', }, { value: 'Texas', }, { value: 'Utah', }, { value: 'Vermont', }, { value: 'Virginia', }, { value: 'Washington', }, { value: 'West Virginia', }, { value: 'Wisconsin', }, { value: 'Wyoming', }]}
                                    itemTextStyle={{ color: 'red', fontSize: 10, marginLeft: 5, }}
                                /> :


                                <TextInput
                                    keyboardType={props.keyboardType ? props.keyboardType : null}
                                    value={props.value}
                                    placeholderTextColor={AppColors.PLaceHolder}
                                    onChangeText={(text) => props.onChangeText(text)}
                                    placeholder={props.placeholder}
                                    style={[Styles.textStyle, { marginTop: Platform.OS === 'ios' ? hp('3%') : 0, marginBottom: Platform.OS === 'ios' ? -10 : -20, fontWeight: '200', fontSize: hp('1.8%'), color: AppColors.BLACK, }]}
                                />
                    :
                    <Text style={[Styles.textStyle, { fontFamily: Fonts.APP_MEDIUM_FONT, fontWeight: '200', marginTop: 5, color: AppColors.PLaceHolder }]}>{props.value}</Text>
                }

                <DateTimePickerModal
                    isVisible={props.showCalender}
                    mode="date"
                    maximumDate={currentDate}
                    onConfirm={(date) => props.setDate(date)}
                    onCancel={() => props.cancel()}
                />
            </View>
        </View>
    )
}