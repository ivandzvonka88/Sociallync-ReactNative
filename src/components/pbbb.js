import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Platform,
    Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';
import AppColors from '../utils/AppColors';
import Images from '../assets/Images';
import Fonts from '../assets/Fonts';


const SignupPickerView = (props) => {
    return (
        <View style={{
            margin: 5, alignSelf: 'center', height: hp('8%'),
            width: wp('90%'),
        }}>
            <TouchableOpacity onPress={() => props.openPicker()} style={[Styles.outerView, { flexDirection: 'row', borderBottomLeftRadius: props.show ? 0 : 50, borderBottomRightRadius: props.show ? 0 : 50 }]}>
                <Text style={[Styles.textinputStyle, { color: props.value === '' ? AppColors.GREY_TEXT_COLOR : AppColors.BLACK, height: null, paddingLeft: 20, width: '88%', }]}>
                    {props.value === '' ? props.placeholder : props.value}
                </Text>
                <Icon name={props.show ? "up" : "down"} style={{ paddingRight: 15, }} size={15} color={'grey'} />
            </TouchableOpacity>
            {props.show ? <View style={Platform.OS === 'android'? Styles.flatView:Styles.flatViewIos}>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={props.data}
                    renderItem={({ index, item }) => (
                        <TouchableOpacity style={{ borderBottomColor:props.data.length===index+1?'transparent': AppColors.GREY, borderBottomWidth: 1.5, padding: 15 }} onPress={() => props.setValue(item)}>
                            <Text style={{ color: AppColors.BLACK, fontSize: hp('2%'), paddingLeft: 15 }}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />

            </View>
                : null}

        </View>
    );
};

export default SignupPickerView;


const Styles = StyleSheet.create({
    outerView: {
        height: hp('8%'),
        width: wp('90%'),
        margin: 5,
        backgroundColor: AppColors.WHITE,
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: AppColors.GREY,

        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 7,
        alignItems: 'center',
        justifyContent: 'center',


    },

    textinputStyle: {
        // height: hp('8%'),
        width: wp('90%'),
        alignSelf: 'center',
        color: AppColors.PLaceHolder,
        textAlign: 'left',
        fontSize: hp('2%'),
        fontWeight:'500',
        paddingLeft: 15,
        fontFamily:Fonts.APP_REGULAR_FONT

    },

    flatViewIos:{
        height: hp('25%'),
        width: wp('90%'),
        backgroundColor: AppColors.WHITE,
        marginTop: hp('8%'),
        alignSelf: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.3,
        elevation: 7,
        borderColor: AppColors.GREY,
        borderWidth: 1,
        borderTopColor: 'transparent',
        borderTopWidth: 1,
        paddingBottom: 10,
        position: 'absolute',
        zIndex: 20,
        elevation: (Platform.OS === 'android') ? 50 : 0,
        borderBottomEndRadius: 50,
        borderBottomLeftRadius: 50
    },

    flatView:
    {

        height: hp('25%'),
        width: wp('90%'),
        backgroundColor: AppColors.BLUE,
        marginTop: hp('8%'),
        alignSelf: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 7,
        borderColor: AppColors.GREY,
        borderWidth: 1,
        borderTopColor: 'transparent',
        borderTopWidth: 1,
        paddingBottom: 10,
        position: 'absolute',
        zIndex: 15,
        elevation: (Platform.OS === 'android') ? 50 : 0,
        borderBottomEndRadius: 50,
        borderBottomLeftRadius: 50
    }
});




export const SignupTextField = (props) => {
    return (


        <View style={[Styles.outerView, { borderRadius: props.desc ? 30 : 50, height: props.desc ? hp('20%') : hp('8%'), flexDirection: 'row', borderColor: 'transparent',}]}>
            {props.desc ? null :
                <Image resizeMode='contain' style={{ left: 0, position: 'absolute', width: wp('5.5%'), marginLeft: wp('4%'), alignSelf: 'center' }}  source={props.image} />
            }

            <TextInput
                onSubmitEditing={props.onSubmitEditing ? props.onSubmitEditing : null}
                secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
                keyboardType={props.keyboardType ? props.keyboardType : null}
                value={props.value}
                multiline={props.desc?true:false}
                numberOfLines={props.desc ? 5 : 1}
                placeholderTextColor={AppColors.PLaceHolder}
                maxLength={props.maxLength ? props.maxLength : null}
                onChangeText={(text) => props.onChangeText(text)}
                placeholder={props.placeholder}
                style={[Styles.textinputStyle, { width: props.desc ? wp('90%') : wp('70%'), textAlignVertical: props.desc ? 'top' : 'center', paddingLeft: props.desc ? 25 : 15, padding: props.desc ? 25 : 0, height:Platform.OS==='ios'?props.desc?'80%':null: '100%', fontSize: hp('2%'),}]}
            />

            {props.password ?
                <TouchableOpacity onPress={() => props.hide()} style={{right: 15, position: 'absolute', width: wp('10%'), alignSelf: 'center' }}>
                    <Image style={{width:25,height:30,right:10}} resizeMode='contain' source={Images.eye} />

                </TouchableOpacity>
                : null}

        </View>

    )
}
