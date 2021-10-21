import React, { Component } from 'react';
import { AppNavigation } from './src/navigation/Routes';
import firebase from "react-native-firebase";
import { Platform, Alert, View } from 'react-native';
import { setAsyncStorage } from './src/controllers/AsyncstorageControllers';
import CONSTANTS from './src/utils/Constants';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const isAndroid = Platform.OS === 'android';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.getToken = this.getToken.bind(this);
    this.requestPermission = this.requestPermission.bind(this);
    this.checkNotificationPermission = this.checkNotificationPermission.bind(this);

  }
  async componentDidMount() {
    this.checkNotificationPermission();

    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);

    this.createNotificationListeners();


  }

  async createNotificationListeners() {

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body, data } = notification;
      this.showNotificationAlert(title, body, data);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body, data } = notificationOpen.notification;
      let notification_id = data;


    });


    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body, data } = notificationOpen.notification;

      let notification_id = data;

    }
  }




  showNotificationAlert(title, body, data) {

    console.log("notificationdata", JSON.stringify(data))
    console.log(`title ${title}`)
    let buttons = []

    buttons = [
      {
        text: 'OK', onPress: () => {

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


render() {
    return (
      <AppNavigation />

    );
  }

  // firebase token for the user
  async getToken() {
    let fcmToken = await AsyncStorage.getItem(CONSTANTS.FCM_TOKEN);
    if(!fcmToken){
      fcmToken = await firebase.messaging().getToken();
      if(fcmToken) {
        console.log("##lol",fcmToken)
        await AsyncStorage.setItem(CONSTANTS.FCM_TOKEN,fcmToken)

      }
    }
   
  }




  // request permission if permission diabled or not given
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission().then(()=>{
        this.getToken();
      })
      
    } 
    
    catch (error) {
      console.log('permission rejected');

     }
  }


  // if permission enabled get firebase token else request permission
  async checkNotificationPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken() // call function to get firebase token for personalized notifications.
    } else {
      this.requestPermission();
    }
  }



}
