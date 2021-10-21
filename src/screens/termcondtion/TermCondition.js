import React, { Component } from 'react';
import { Text, ScrollView, ImageBackground, Dimensions } from 'react-native';
import HeaderView from '../../components/HeaderView';
import AppColors from '../../utils/AppColors';
import Fonts from '../../assets/Fonts';
import Images from '../../assets/Images';
import AutoHeightWebView from 'react-native-autoheight-webview'






const TermCondition = ({ navigation }) => {
    return (
        <ImageBackground source={Images.white_bg} style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <HeaderView notificationColor={AppColors.BLACK} menuColor={AppColors.RED} left menuWhite leftPress={() => navigation.goBack()} title={'Term & Conditions'} />

            <AutoHeightWebView
                style={{ width: Dimensions.get('window').width - 10, marginTop: 15 }}
                customStyle={`
      * {
        font-family: 'Times New Roman';
      }
      p {
        font-size: 16px;
      }
    `}
                onSizeUpdated={size => console.log(size.height)}
                files={[{
                    href: 'cssfileaddress',
                    type: 'text/css',
                    rel: 'stylesheet'
                }]}
                source={{ uri: 'http://3.139.165.120/assets/termCondition/' }}
                scalesPageToFit={true}
                viewportContent={'width=device-width, user-scalable=no'}
            /*
            other react-native-webview props
            */
            />
        </ImageBackground>

    );


}

export default TermCondition;
