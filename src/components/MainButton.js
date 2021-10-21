import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import AppColors from '../utils/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Fonts from '../assets/Fonts';

const CustomButton = (props) => {

  return (
    <View style={{ backgroundColor: 'transparent', marginTop: 10, width: wp('100%'), alignSelf: 'center' }}>
      {
        props.usertype === '1' ?

        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={props.colors ? props.colors : AppColors.BUTTON_COLOR} style={[STYLES.CONTAINER, props.Styles ? props.Styles : null]}>
        <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => props.goToNext()}>

          <Text style={[STYLES.BUTTON_TEXT, { color: props.textColor ? props.textColor : AppColors.WHITE, paddingLeft: props.tick ? 25 : props.next ? 25 : 0 }]}>{props.text}</Text>
          {props.tick ?
            <Icon style={{ right: 10, }} name={"check"} size={25} color={'white'} />
            :
            props.next ?
              <Icon style={{ right: 10 }} name={"arrowright"} size={25} color={'white'} />
              :
              null}

        </TouchableOpacity>
      </LinearGradient> :


<LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={props.colors ? props.colors : AppColors.BUTTON_COLOR} style={[STYLES.CONTAINER, props.Styles ? props.Styles : null]}>
<TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => props.goToNext()}>

  <Text style={[STYLES.BUTTON_TEXT, { color: props.textColor ? props.textColor : AppColors.WHITE, paddingLeft: props.tick ? 25 : props.next ? 25 : 0 }]}>{props.text}</Text>
  {props.tick ?
    <Icon style={{ right: 10, }} name={"check"} size={25} color={'white'} />
    :
    props.next ?
      <Icon style={{ right: 10 }} name={"arrowright"} size={25} color={'white'} />
      :
      null}

</TouchableOpacity>
</LinearGradient>



      }
         </View>
  );
};

export default CustomButton;


export const Button = (props) => {
  return (
    <TouchableOpacity onPress={() => props.goToNext()} style={[STYLES.CONTAINER, props.Styles ? props.Styles : null,]}>
      <Text style={[STYLES.BUTTON_TEXT, { width: props.tick ? '90%' : '100%', color: props.textColor ? props.textColor : AppColors.WHITE }]}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const STYLES = StyleSheet.create({
  CONTAINER: {
    height: hp('8%'),
    width: wp('90%'),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    margin: 5,
    marginBottom:25,
    borderRadius: 25,
    justifyContent: 'center',
  },

  BUTTON_TEXT: {
    width: '90%',
    alignSelf: 'center',
    color: AppColors.WHITE,
    textAlign: 'center',
    fontSize: hp('2.5%'),
    fontFamily: Fonts.APP_MEDIUM_FONT,

  },
});