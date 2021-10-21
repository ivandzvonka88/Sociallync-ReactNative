import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react';
import { Dimensions, PixelRatio, Platform } from 'react-native';
import { getAsyncStorage } from '../controllers/AsyncstorageControllers';
import CONSTANTS from './Constants';
const guidelineBaseWidth = 375;
export const DEVICE_HIEGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_FONT_SCALE = Dimensions.get('window').scale;
export const scaleSize = (size) => (DEVICE_WIDTH / guidelineBaseWidth) * size;
export const scaleFont = (size) => size * PixelRatio.getFontScale();
export const isIphone = () => Platform.OS === 'ios';

export function isiPhoneX() {
  if (
    (Platform.OS === "ios") &&
    (Dimensions.get("window").height >= iPhoneXHeight)
  ) {
    return true;
  }
  return false;
}



export async function getMyToken(){

  var value = await AsyncStorage.getItem(CONSTANTS.TOKEN);
  return value
  // var token='';

  // getAsyncStorage(CONSTANTS.TOKEN).then((res) => {
  //   if (res != null) {
  //     token = res;
  //   }
  // });

  // return token;

}

// async _getStorageValue(){
//   var value = await getAsyncStorage(CONSTANTS.TOKEN);
//   return value
// }

const iPhoneXHeight = 812;
