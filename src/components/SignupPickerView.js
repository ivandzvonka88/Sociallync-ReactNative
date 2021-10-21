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
    console.disableYellowBox = true;

    return (
        <View style={Platform.OS === 'android' ?
            {
                margin: 5, marginBottom: 10, alignSelf: 'center', height: hp('8%'),
                width: wp('90%'),
            }
            :
            {
                margin: 7, alignSelf: 'center', height: hp('8.3%'),
                width: wp('90%'),
                zIndex: props.show ? 50 : 0
            }
        }>
            {props.show ?
                null :
                <TouchableOpacity onPress={() => props.openPicker()} style={[Styles.outerView, { flexDirection: 'row', }]}>
                       {props.forState?
                    <Icon name={'questioncircleo'} style={{left:0,position:'absolute', marginLeft:wp(3) }} size={30} color={AppColors.GREY} />
                    :null
}
                  
                    <Text style={[Styles.textinputStyle, { color: props.value === '' ? AppColors.PLaceHolder : AppColors.BLACK, height: null, paddingLeft:20, width:props.forState?'80%': '88%',marginLeft:props.forState? wp(5):null,}]}>
                        {props.value === '' ? props.placeholder : props.value}
                    </Text>
                    <Icon name={props.show ? "up" : "down"} style={{ paddingRight: 15, }} size={15} color={'grey'} />
                </TouchableOpacity>
            }
            {props.show ? <TouchableOpacity activeOpacity={1} onPress={() => props.openPicker()} style={Platform.OS === 'android' ? Styles.flatView : Styles.flatViewIos}>


                <TouchableOpacity activeOpacity={1} onPress={() => props.openPicker()} style={[Styles.outerView, { flexDirection: 'row', marginTop: 0, zIndex: Platform.OS === 'ios' ? 5 : null }]}>
                    <Text style={[Styles.textinputStyle, { color: props.value === '' ? AppColors.GREY_TEXT_COLOR : AppColors.BLACK, height: null, paddingLeft: 20, width: '88%', }]}>
                        {props.value === '' ? props.placeholder : props.value}
                    </Text>
                    <Icon name={props.show ? "up" : "down"} style={{ paddingRight: 15, }} size={15} color={'grey'} />
                </TouchableOpacity>

                <View style={Styles.dropDownView}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={props.data}
                        renderItem={({ index, item }) => (
                            <TouchableOpacity style={{ borderBottomColor: props.data.length === index + 1 ? 'transparent' : AppColors.GREY, borderBottomWidth: 1.5, padding: 15, paddingTop: index === 0 ? 0 : 15, marginTop: index === 0 ? hp('4.5%') : 0, }} onPress={() => props.setValue(item)}>
                                <Text style={{ color: AppColors.BLACK, fontSize: hp('2%'), paddingLeft: 10 }}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>
            </TouchableOpacity>
                : null}

        </View>
    );
};

export default SignupPickerView;


const Styles = StyleSheet.create({

    dropDownView:
    {
        backgroundColor: AppColors.WHITE, borderBottomEndRadius: 40, overflow: 'hidden',
        borderBottomLeftRadius: 40, marginTop: -hp('4%'), height: hp('26%'), borderColor: AppColors.GREY,
        borderWidth: 1,
        borderTopColor: 'transparent', shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: Platform.OS === 'ios' ? 0.1 : 1.0,
        elevation: Platform.OS === 'ios' ? 0 : 6,
        borderTopWidth: 1,
    },

    outerView:
    {
        height: hp('8.3%'),
        width: wp('90%'),
        margin: 5,
        backgroundColor: AppColors.WHITE,
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'transparent',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: Platform.OS === 'ios' ? 0 : 7,
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
        fontWeight: '500',
        paddingLeft: 15,
        fontFamily: Fonts.APP_MEDIUM_FONT

    },

    flatViewIos: {

        width: wp('90%'),
        backgroundColor: 'transparent',
        // marginTop: hp('8%'),
        alignSelf: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.3,
        position: 'absolute',
        zIndex: 10,
        elevation: (Platform.OS === 'android') ? 7 : 0,
        // zIndex:100,position:'absolute'

    },

    flatView:
    {

        // height: hp('25%'),
        width: wp('90%'),
        backgroundColor: 'transparent',
        // marginTop: hp('8%'),
        alignSelf: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 7, position: 'absolute',
        zIndex: 15,
        elevation: (Platform.OS === 'android') ? 50 : 0,

    }
});

export const SignupTextField = (props) => {
    return (
        <View style={[Styles.outerView, { borderRadius: props.desc ? 30 : 50, height: props.desc ? hp('20%') : hp('8%'), flexDirection: 'row', borderColor: 'transparent', }]}>
            {props.desc ? null :
                <Image resizeMode='contain' style={{ left: 0, position: 'absolute', width: wp('5.5%'), marginLeft: wp('4%'), alignSelf: 'center' }} source={props.image} />}
            <TextInput
                // onFocus={props.onFocus}
                onSubmitEditing={props.onSubmitEditing ? props.onSubmitEditing : null}
                returnKeyType={'next'}
                ref={props.forwardRef}
                secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
                keyboardType={props.keyboardType ? props.keyboardType : null}
                value={props.value}
                multiline={props.desc ? true : false}
                numberOfLines={props.desc ? 5 : 1}
                placeholderTextColor={AppColors.PLaceHolder}
                maxLength={props.maxLength ? props.maxLength : null}
                onChangeText={(text) => props.onChangeText(text)}
                placeholder={props.placeholder}
                style={[Styles.textinputStyle, { width: props.desc ? wp('90%') : wp('70%'), textAlignVertical: props.desc ? 'top' : 'center', paddingLeft: props.desc ? 25 : 15, padding: props.desc ? 25 : 0, height: Platform.OS === 'ios' ? props.desc ? '80%' : null : '100%', fontSize: hp('2%'), }]}
            />
            {props.password ?
                <TouchableOpacity onPress={() => props.hide()} style={{ right: 15, position: 'absolute', width: wp('10%'), alignSelf: 'center' }}>
                    <Image style={{ width: 25, height: 30, right: 10 }} resizeMode='contain' source={Images.eye} />
                </TouchableOpacity>
                : null}
        </View>
    )
}
