import React, { useState } from 'react';
import { View, Text, Image, FlatList, ImageBackground } from 'react-native';
import Styles from './Styles';
import HeaderView from '../../components/HeaderView';
import AppColors from '../../utils/AppColors';
import Strings from '../../utils/Strings';
import Images from '../../assets/Images';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { SignupTextField } from '../../components/SignupPickerView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../components/MainButton';
import Fonts from '../../assets/Fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import SimpleToast from 'react-native-simple-toast';
import { checkEmailValid } from '../../utils/Validations';
import Actions from '../../webservices/Actions';
import { getAsyncStorage } from '../../controllers/AsyncstorageControllers';
import CONSTANTS from '../../utils/Constants';
import Spinner from '../../components/Spinner';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [myToken, setMyToken] = useState('');



    getAsyncStorage(CONSTANTS.TOKEN).then((res) => {
        if (res != null) {
            setMyToken(res)
        }
    });


    const submit = () => {
        navigation.popToTop()
    }

    const doForgot = () => {
        if (email === '') {
            SimpleToast.show('Please enter email address', SimpleToast.SHORT);
        }
        else if (checkEmailValid(email)) {
            SimpleToast.show('Please enter valid email address', SimpleToast.SHORT);

        }
        else {
            forgotPassword();

        }

    }


    const forgotPassword = () => {
        setLoading(true)
        const formdata = new FormData();
        formdata.append('email', email)
        const forgotData = { data: formdata, token: myToken };
        Actions.ForgotPassword(forgotData).then((response) => {
            console.log("forgot", JSON.stringify(response))
            setLoading(false);
            if (response.data.status) {
                SimpleToast.show('OTP send to your email.', SimpleToast.SHORT)
                submit();
            }
            else {
                SimpleToast.show(response.data.message, SimpleToast.SHORT)

            }
        }).catch((then) => {
            setLoading(false);
            SimpleToast.show('Something went wrong.',SimpleToast.SHORT)
        })
    }



    return (
        <ImageBackground source={Images.white_bg} style={[Styles.container]}>
            <HeaderView notificationColor={AppColors.BLACK} menuWhite left menuColor={AppColors.RED} leftPress={() => navigation.goBack()} title={Strings.FORGOT} />
            {loading ? <Spinner /> : null}
            <View style={Styles.notificationView}>
                <Image style={{ width: wp('13%'), height: hp('13%') }} resizeMode='contain' source={Images.lock}></Image>
            </View>
            <Text style={{ width: '80%', color: '#303030', fontWeight: '500', fontFamily: Fonts.APP_REGULAR_FONT, textAlign: 'center', fontSize: heightPercentageToDP('2.4%') }} >Confirm your email and we'll send the instructions.</Text>
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#ffffff', marginTop: 30 }} keyboardShouldPersistTaps={'handled'} scrollEnabled resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{ flex: 1 }}>
                <SignupTextField maxLength={40} image={Images.email} placeholder='Email' onChangeText={setEmail} value={email} />
                <View style={{ marginTop: '20%' }}>
                    <CustomButton tick goToNext={() => doForgot()} text='Forgot Password' colors={AppColors.buttonColor} />
                </View>

            </KeyboardAwareScrollView>


        </ImageBackground>
    );
};

export default ForgotPassword;