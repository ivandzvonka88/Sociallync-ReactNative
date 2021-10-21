import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ImageBackground,BackHandler } from 'react-native';
import Styles from './Styles';
import HeaderView from '../../components/HeaderView';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColors from '../../utils/AppColors';
import Strings from '../../utils/Strings';
import Images from '../../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../../utils/Constants';
import Actions from '../../webservices/Actions';
import SimpleToast from 'react-native-simple-toast';
import Spinner from '../../components/Spinner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {StackActions, useNavigationState } from '@react-navigation/native';


const Notifications = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [notficationdata, setNotificationList] = useState([]);
    const navState = useNavigationState((state) => state);


    useEffect(() => {
        getNotificationList();
        const backAction = () => {
            handleBackButtonClick()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);


    const handleBackButtonClick = () => {
        let myindex = navState.index;
        let mainIndex = myindex > 3 ? myindex - 2 : myindex > 2 ? myindex - 1 : myindex;
        console.log(JSON.stringify(navState))
        if (myindex > 1) {
            if (navState.routes[myindex - 1].name === 'Notification') {
                let routeName = navState.routes[myindex - 2].name;
                const popAction = StackActions.pop(mainIndex);
                navigation.dispatch(popAction);
                return true;
            } else {
                navigation.goBack();
                return true;
            }
        }
        else {
            navigation.goBack();
            return true;
        }
    }

    const getNotificationList = () => {
        setLoading(true);
        AsyncStorage.multiGet([CONSTANTS.TOKEN, CONSTANTS.USER_TOKEN]).then((res) => {
            let token = res[0][1];
            let usertoken = res[1][1];
            Actions.GetNotificationList(token, usertoken, 1).then((response) => {
                setLoading(false);
                console.log(JSON.stringify(response))
                if (response.data.status) {
                    //  alert(response.data.data)
                    setNotificationList(response.data.data.notificationList)
                }
            })
        }).catch((err) => {
            setLoading(false);
            SimpleToast.show("Something went wrong", SimpleToast.SHORT)
        })
    }

    return (
        <ImageBackground source={Images.white_bg} style={[Styles.container]}>
            <HeaderView menuColor='#ed4041' notificationColor={AppColors.BLACK} left menuWhite leftPress={() => handleBackButtonClick()} title={Strings.NOTIFICATION} />
            <View style={Styles.notificationView}>
                <Image style={{ width: 50, height: 50 }} resizeMode='contain' source={Images.notification}></Image>
            </View>
            {loading ? <Spinner /> : null}
            <View style={Styles.flatView}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={notficationdata}
                    renderItem={({ index, item }) => (
                        <TouchableOpacity onPress={()=>navigation.navigate('NotificationDetail',{subject:item.subject,message:item.message})} style={Styles.flatInnerView}>
                            <View style={Styles.imageView}>
                                <Image style={{ width: 25, height: 25 }} resizeMode='contain' source={Images.glob}>
                                </Image>
                            </View>
                            <View style={Styles.textView}>
                                <Text style={Styles.textStyle}>{item.subject}</Text>
                                <Text numberOfLines={2} style={[Styles.textStyle, { fontWeight: '200' }]}>{item.message}</Text>
                            </View>
                            <Icon name='chevron-forward' style={Styles.arrowStyle} size={20} color={AppColors.GREY} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </ImageBackground>
    );
};

export default Notifications;