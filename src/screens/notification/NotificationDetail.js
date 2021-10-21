import { useLinkProps } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Images from '../../assets/Images';
import HeaderView from '../../components/HeaderView';
import AppColors from '../../utils/AppColors';
import Styles from './Styles';


const NotificationDetail = ({ navigation, route }) => {
    return (
        <ImageBackground source={Images.white_bg} style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <HeaderView notificationColor={AppColors.BLACK} menuColor={AppColors.RED} left menuWhite leftPress={() => navigation.goBack()} title={'Notification Detail'} />


            <View style={Styles.textViewnew}>
                <Text style={Styles.textStyle}>{route.params.subject}</Text>
                <Text numberOfLines={2} style={[Styles.textStyle, { fontWeight: '200' }]}>{route.params.message}</Text>
            </View>

        </ImageBackground>

    );

}

export default NotificationDetail;
