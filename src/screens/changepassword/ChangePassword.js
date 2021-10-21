import React, { useRef, useState } from 'react';
import { View, Image, ImageBackground, StatusBar } from 'react-native';
import Styles from './Styles';
import HeaderView from '../../components/HeaderView';
import AppColors from '../../utils/AppColors';
import Images from '../../assets/Images';
import { SignupTextField } from '../../components/SignupPickerView';
import CustomButton from '../../components/MainButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import SimpleToast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../../utils/Constants';
import Actions from '../../webservices/Actions';
import Spinner from '../../components/Spinner';
import { setAsyncStorage } from '../../controllers/AsyncstorageControllers';

const ChangePassword = ({ navigation }) => {

    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [hide, setHide] = useState(true);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const [usertoken, setuserToken] = useState('');
    const second = useRef();
    const first = useRef();
    const third = useRef();



    const submit = () => {
        navigation.goBack();


    }

    const getTokens = () => {
        AsyncStorage.multiGet([CONSTANTS.TOKEN, CONSTANTS.USER_TOKEN]).then((res) => {
            let token = res[0][1];
            let usertoken = res[1][1];
            setToken(token);
            setuserToken(usertoken);
        })
    }
    getTokens();

    const doChangePassword = () => {
        if (password === '') {
            SimpleToast.show('Please enter current password', SimpleToast.SHORT);
        }
        else if (newpassword === '') {
            SimpleToast.show('Please enter new password', SimpleToast.SHORT);
        }

        else if (confirmpassword === '') {
            SimpleToast.show('Please enter confirm password', SimpleToast.SHORT);
        }

        else if (newpassword != confirmpassword) {
            SimpleToast.show('Password not matched', SimpleToast.SHORT)
        }

        else {
            changePassword();
        }
    }


    const changePassword = () => {
        setLoading(true)
        const formdata = new FormData();
        formdata.append('oldPassword', password);
        formdata.append('newPassword', newpassword);
        const changePasswordData = { data: formdata, token: token, usertoken: usertoken };
        Actions.ChangePassword(changePasswordData).then((response) => {
            console.log("changepass", JSON.stringify(response))
            setLoading(false);
            if (response.data.status) {
                SimpleToast.show(response.data.message, SimpleToast.SHORT)
                // AsyncStorage.clear();
                submit();
            }
            else {
                SimpleToast.show(response.data.message, SimpleToast.SHORT)

            }
        }).catch((err) => {
            setLoading(false);
            SimpleToast.show('Something went wrong.', SimpleToast.SHORT)
        })


    }






    return (
        <ImageBackground source={Images.white_bg} style={[Styles.container]}>
            <StatusBar color='grey' />

            <HeaderView notificationColor={AppColors.BLACK} menuColor={AppColors.RED} left menuWhite leftPress={() => navigation.goBack()} title={'Change Password'} />
            {loading ? <Spinner /> : null}
            <View style={Styles.notificationView}>
                <Image style={{ width: wp('12.5%'), height: hp('12.5%') }} resizeMode='contain' source={Images.lock}></Image>
            </View>

            <SignupTextField forwardRef={first} onSubmitEditing={() => second.current.focus()} maxLength={40} image={Images.password} secureTextEntry={hide} placeholder='Current Password' onChangeText={setPassword} value={password} />
            <SignupTextField forwardRef={second} onSubmitEditing={() => third.current.focus()} maxLength={40} image={Images.password} secureTextEntry={hide} placeholder='New Password' onChangeText={setNewPassword} value={newpassword} />
            <SignupTextField forwardRef={third} maxLength={40} image={Images.password} secureTextEntry={hide} placeholder='Confirm Password' onChangeText={setConfirmPassword} value={confirmpassword} />
            
            <CustomButton tick goToNext={() => doChangePassword()} text='Save' colors={AppColors.buttonColor} />


        </ImageBackground>
    );
};

export default ChangePassword;