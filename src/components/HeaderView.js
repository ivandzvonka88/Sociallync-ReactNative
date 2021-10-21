import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Fonts from '../assets/Fonts';
import Images from '../assets/Images';
import AppColors from '../utils/AppColors';

const HeaderView = (props) => {

    return (
        <View style={{ justifyContent: 'center', height: Platform.OS === 'ios' ? hp('10%') : hp('8%'), backgroundColor: props.statusbar ? Platform.OS === 'android' ? StatusBar.setBackgroundColor('#c23639') : null : Platform.OS === 'android' ? StatusBar.setBackgroundColor('grey') : null, width: wp('100%'), marginTop: Platform.OS === 'ios' ? hp('2%') : 0, flexDirection: 'row', }}>
            {
                props.left ?
                    props.menuWhite ?
                        <TouchableOpacity style={{ width: 55, height: 35, left: 5, position: 'absolute', alignSelf: 'center' }} onPress={() => props.leftPress()}>
                            <Icon onPress={() => props.leftPress()} style={{ width: 30, height: 30, left: 5, position: 'absolute', alignSelf: 'center', marginLeft: 10, }} name={"arrowleft"} size={30} color={props.menuColor ? props.menuColor : AppColors.WHITE} />

                        </TouchableOpacity>
                        :
                        props.menu ?
                            <TouchableOpacity style={{ width: 30, height: 30, left: 0, position: 'absolute', alignSelf: 'center' }} onPress={() => props.leftPress()}>
                                <Image resizeMode='contain' source={Images.menu} style={{ width: 30, height: 30, left: 0, position: 'absolute', alignSelf: 'center', marginLeft: 10 }} />
                            </TouchableOpacity>

                            :

                            <Icon onPress={() => props.leftPress()} style={{ left: 0, position: 'absolute', alignSelf: 'center', marginLeft: 20 }} name={"arrowleft"} size={30} color={AppColors.GREEN} />

                    : null}
            <Text style={{ color: props.notificationColor, alignSelf: 'center', fontFamily: Fonts.APP_MEDIUM_FONT, fontSize: hp('2.6%'), marginTop: 0 }}>{props.title}</Text>

            {props.edit ?
                <>
                    <Icon onPress={() => props.rightPress()} style={{ right: 0, position: 'absolute', alignSelf: 'center', marginRight: 15 }} name={"edit"} size={23} color={AppColors.WHITE} />


                </> : null}
            {props.right ?
                <>
                    <Icon2 onPress={() => alert('hh')} style={{ right: 0, position: 'absolute', alignSelf: 'center', marginRight: 30 }} name={"location-pin"} size={23} color={AppColors.GREEN} />

                    <Icon2 onPress={() => props.rightPress()} style={{ right: 0, position: 'absolute', alignSelf: 'center', marginRight: 10 }} name={"shopping-cart"} size={20} color={AppColors.GREEN} />

                </> : null}
        </View>
    );
};
export default HeaderView;

