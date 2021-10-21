import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, StatusBar, Platform } from 'react-native';
import Styles from './Styles';
import { BallIndicator } from 'react-native-indicators';
import Images from '../../assets/Images';
import CONSTANTS from '../../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';



const Splash = props => {

  useEffect(()=>{
   SplashScreen.hide();
  },[])

   // timeout to move next screens
   setTimeout(() => {
      Platform.OS === 'android' ? StatusBar.setBackgroundColor('grey') : null
      AsyncStorage.getItem(CONSTANTS.USER_TOKEN).then((res) => {
         if (res === null) {
            props.navigation.replace('Login')
         }
         else {
            props.navigation.replace('Upload')
         }
      })

   }, CONSTANTS.SPLASH_TIMEOUT);


   return (
      <ImageBackground source={Images.bg} style={Styles.container}>
         <ImageBackground style={Styles.whitebg} source={Images.whitedot}>
            <View style={{ margin: 10 }}>
               <Image style={Styles.bgsplash} resizeMode='contain' source={Images.logo}></Image>
            </View>
            <BallIndicator style={Styles.indicator} color='white' />
         </ImageBackground>

      </ImageBackground>

   )
};

export default Splash;

