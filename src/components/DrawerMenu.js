import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Fonts from '../assets/Fonts';
import Images from '../assets/Images';
import AppColors from '../utils/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { Dialog } from 'react-native-simple-dialogs';
import CustomButton from './MainButton';
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../utils/Constants';
import Actions from '../webservices/Actions';
import SimpleToast from 'react-native-simple-toast';
import Spinner from './Spinner';
import EndPoints from '../webservices/EndPoints';
import firebase from "react-native-firebase";

const DrawetItem = (props) => {
    return (
        <TouchableOpacity
            style={{ width: wp('70%'), flexDirection: 'row', paddingLeft: 15, paddingTop: 15, paddingBottom: 15, }}
            onPress={() => props.onPress()}>
            <Image resizeMode='contain' style={{ width: hp('2.3%'), height: hp('2.3%'), alignSelf: 'center', }} source={props.image}></Image>
            <Text style={{ marginLeft: 15, fontFamily: Fonts.APP_REGULAR_FONT, color: AppColors.WHITE, fontSize: hp('2.5%'), alignSelf: 'center' }}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
};

const DrawerMenu = (props) => {
    const [hideDialog, setHideDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState('');


    const requestPermission = async () => {
        try {
          await firebase.messaging().requestPermission();
        } catch (error) { }
      }


      const createNotificationListeners = async () => {
        notificationListener = firebase.notifications().onNotification((notification) => {
          const { title, body, data } = notification;
          showNotificationAlert(title, body, data);
        });
    
        notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
          const { title, body, data } = notificationOpen.notification;
          let notification_id = data;
          props.navigation.push('Notification');
        });
    
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
          const { title, body, data } = notificationOpen.notification;
          let notification_id = data;

          props.navigation.push('Notification');

        }
      }
    
      const showNotificationAlert = (title, body, data) => {
        console.log("notificationdata", JSON.stringify(data))
        console.log(`title ${title}`)
        let buttons = []
    
        buttons = [
          {
            text: 'OK', onPress: () => {
              props.navigation.push('Notification')
            },
            style: 'cancel'
          },
        ]
    
        Alert.alert(
          title, body,
          buttons,
          { cancelable: false },
        );
      }

      
    // if permission enabled get firebase token else request permission
  const checkNotificationPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
    
    } else {
      requestPermission();
    }
  }

    useEffect(()=>{
        getUserProfile();
        const unsubscribe = props.navigation.addListener('focus', () => {
           getUserProfile();
          });
          
  
        checkNotificationPermission();
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
          .setDescription('My apps test channel');
        // Create the channel
        firebase.notifications().android.createChannel(channel);
        createNotificationListeners();

       },[])

    const logout = () => {
        setHideDialog(false)
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })

    }

  const getUserProfile = () => {
        AsyncStorage.multiGet([CONSTANTS.TOKEN, CONSTANTS.USER_TOKEN]).then((res) => {
            let token = res[0][1];
            let usertoken = res[1][1];
            Actions.ViewUserProfile(token, usertoken).then((response) => {
                if (response.data.status) {
                    setdata(response.data.data)
                }
            })

        })
    }

   
       const callLogoutApi = () => {
        setLoading(true);
        AsyncStorage.multiGet([CONSTANTS.TOKEN, CONSTANTS.USER_TOKEN]).then((res) => {
            let token = res[0][1];
            let usertoken = res[1][1];
            Actions.logoutUser(token, usertoken).then((response) => {
                setLoading(false);
                if (response.data.status) {
                    SimpleToast.show('Logout Sucessfully');
                    AsyncStorage.setItem(CONSTANTS.TOKEN,'');
                    AsyncStorage.setItem(CONSTANTS.USER_TOKEN,'');
                    // AsyncStorage.clear();
                   
                    logout();

                }
                else {
                    SimpleToast.show(response.data.message, SimpleToast.SHORT)

                }

            }).catch((err) => {
                setLoading(false);
                SimpleToast.show('Something went wrong.', SimpleToast.SHORT)
            })


        })
    }


    return (
        <ImageBackground source={Images.drawer_bg} style={{ flex: 1, alignItems: 'center', }}>
            <Image resizeMode='cover' style={{ width: '97%', position: 'absolute', left: 0, height: hp('20%'), }} source={Images.red_shape}></Image>
            <View style={{ width: hp('15%'), height: hp('15%'), marginBottom: 10, backgroundColor: '#c23639', justifyContent: 'center', alignItems: 'center', marginTop: hp('12%'), alignSelf: 'center', borderRadius: 100 }}>
                <Image style={{ width: hp('13%'), height: hp('13%'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 100, }} source={  data.image ? { uri: EndPoints.IMAGES + "" + data.image }:Images.men} />
            </View>
            <Text style={{ fontFamily: Fonts.APP_REGULAR_FONT, color: AppColors.WHITE, fontWeight: '500', fontSize: hp('2.5%'), alignSelf: 'center' }}>
                {data.name}
            </Text>
            <Text style={{ fontFamily: Fonts.APP_REGULAR_FONT, marginTop: 8, fontWeight: '500', color: AppColors.WHITE, fontSize: hp('2%'), alignSelf: 'center' }}>{data.email}</Text>
            {loading ? <Spinner /> : null}
            <View style={{ padding: 10, marginTop: 15 }}>
                <DrawetItem onPress={() => { props.navigation.toggleDrawer(), props.navigation.push('Profile') }}
                    title={'Profile'}
                    image={Images.user_profile} />
                <DrawetItem
                    image={Images.upload_drawer}
                    // onPress={() => { props.navigation.toggleDrawer(),props.navigation.push('Confirmation') }}
                    onPress={() => { props.navigation.toggleDrawer() }}
                    title={'Upload'} />
                <DrawetItem
                    image={Images.bell_drawer}
                    onPress={() => { props.navigation.toggleDrawer(), props.navigation.push('Notification') }}
                    title={'Notifications'} />
                <DrawetItem
                    image={Images.info}
                    onPress={() => { props.navigation.toggleDrawer(), props.navigation.push('TermCondition') }}
                    title={'Terms & Conditions'} />
                <DrawetItem
                    image={Images.logout}
                    onPress={() => setHideDialog(true)}
                    title={'Logout'} />
            </View>
            <Dialog
                visible={hideDialog}
                // title="Custom Dialog"
                dialogStyle={Styles.dialogOuterView}
                onTouchOutside={() => { setHideDialog(false) }} >
                <View >
                    <View style={Styles.imageView}>
                        <Icon size={30} name='logout' color='#c23639' />
                    </View>
                    <Text style={Styles.sentText}>Are you sure, you want to logout?</Text>
                    <View style={{ alignSelf: 'center', width: wp('70%'), flexDirection: 'row', marginTop: hp('6%') }}>
                        <TouchableOpacity onPress={() => setHideDialog(false)} style={{ borderWidth: 1, borderColor: AppColors.WHITE, width: wp('35%'), backgroundColor: '#c23639', height: hp('7%'), alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 20, }}>
                            <Text style={[Styles.sentText, { fontSize: hp('2%'), marginTop: 0, color: AppColors.WHITE }]}>No</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => callLogoutApi()} style={{ borderWidth: 1, borderColor: AppColors.WHITE, borderLeftColor: 'transparent', width: wp('35%'), backgroundColor: '#c23639', height: hp('7%'), alignItems: 'center', justifyContent: 'center', borderBottomRightRadius: 20 }}>
                            <Text style={[Styles.sentText, { fontSize: hp('2%'), marginTop: 0, color: AppColors.WHITE }]}>Yes</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Dialog>
        </ImageBackground>
    );
};
export default DrawerMenu;

const Styles = StyleSheet.create({
    dialogOuterView: {
        backgroundColor: AppColors.WHITE, borderRadius: 20,
        width: wp('70%'), alignSelf: 'center',
        height: hp('25%'), justifyContent: 'center', alignItems: 'center'
    },
    imageView: {
        top: 0,
        position: 'absolute',
        height: hp('9%'),
        width: hp('9%'),
        borderRadius: 100,
        backgroundColor: '#fbdedb',
        alignSelf: 'center',
        marginTop: -hp('4%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    sentText: {
        color: AppColors.BLACK,
        fontSize: hp('1.9%'),
        fontFamily: Fonts.APP_REGULAR_FONT,
        marginTop: hp('10%'),
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})