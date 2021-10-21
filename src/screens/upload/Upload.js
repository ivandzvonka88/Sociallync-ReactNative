import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, BackHandler, TouchableOpacity, FlatList, Alert, Platform, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styles from './Styles';
import HeaderView from '../../components/HeaderView';
import ImagePicker from 'react-native-image-crop-picker';
import SignupPickerView, { SignupTextField } from '../../components/SignupPickerView';
import CustomButton from '../../components/MainButton';
import { Dialog } from 'react-native-simple-dialogs';
import SimpleToast from 'react-native-simple-toast';
import RBSheet from "react-native-raw-bottom-sheet";
import AppColors from '../../utils/AppColors';
import Images from '../../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../../utils/Constants';
import Actions from '../../webservices/Actions';
import Spinner from '../../components/Spinner';


const Upload = ({ navigation }) => {

    useEffect(() => {
        getYearsList();
        getMakeList();

    }, []);

    const [imageObject, setImageObject] = useState([]);
    const [imageSource, setImageSource] = useState('');
    const [otherInfo, setOtherInfo] = useState('');
    const [yearList, setYearList] = useState([]);
    const [modalList, setModalList] = useState([]);
    const [makeList, setMakeList] = useState([]);
    const [selectedMakeId, setselectedMakeId] = useState('');
    const [selectedModalId, setselectedModalId] = useState('');

    const [hideDialog, setHideDialog] = useState(false);

    const [showMake, setShowMake] = useState(false);
    const [makeValue, setMakeValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalValue, setModalValue] = useState('');
    const [showCarType, setShowCarType] = useState(false);
    const [carTypeValue, setCarTypeValue] = useState('');
    const [showYear, setShowYear] = useState(false);
    const [yearValue, setYearValue] = useState('');
    const [showPost, setShowPost] = useState(false);
    const [PostValue, setPostValue] = useState('');
    const [loading, setLoading] = useState(false);

    const removeImage = (index) => {
        var arr = imageObject;
        arr.splice(index, 1)
        setImageObject(arr);
        let arrr = imageObject;
        setImageObject([...arrr]);
    }


    // Api call for Media files upload

    const uploadMedia = () => {
        setLoading(true)
        AsyncStorage.multiGet([CONSTANTS.TOKEN, CONSTANTS.USER_TOKEN]).then((res) => {
            let token = res[0][1];
            let usertoken = res[1][1];
            const formData = new FormData()
            formData.append('mediaCount', imageObject.length),
                formData.append('modelId', selectedModalId);
            formData.append('selectYear', yearValue);
            formData.append('carType', carTypeValue);
            formData.append('whereToPost', PostValue);
            formData.append('otherInfo', otherInfo);

            for (let i = 0; i < imageObject.length; i++) {
                let item = imageObject[i];
                formData.append('upload' + (i + 1), item)
            }
            const uploaddata = { data: formData, token: token, usertoken: usertoken };
            Actions.UploadMediaFiles(uploaddata)
                .then((response) => {
                    setLoading(false);
                    // console.log('hh' +JSON.stringify(response))
                    if (response.data.status) {
                        setHideDialog(true)
                        SimpleToast.show('Successfully uploaded', SimpleToast.LONG);
                        setCarTypeValue('');
                        setImageObject([]);
                        setMakeValue('');
                        setModalValue('');
                        setYearValue('');
                        setOtherInfo('');
                        setPostValue('');

                    }
                    else {
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    SimpleToast.show('Something went wrong', SimpleToast.LONG);

                    console.log('err' + JSON.stringify(error.response))
                })
        })
    }

    // API call for modal list
    const getModalList = () => {
        AsyncStorage.multiGet([CONSTANTS.TOKEN, CONSTANTS.USER_TOKEN])
            .then((res) => {
                let token = res[0][1];
                let userToken = res[1][1];
                Actions.GetModals(token, userToken, selectedMakeId).then((response) => {

                    // setLoading(false);
                    if (response.data.status) {
                        let data = response.data.data;
                        let arr = data.modelList;
                        setModalList([...arr]);
                    }
                })
                    .catch((err) => {
                        console.log('err ' + JSON.stringify(err))
                    })
            })
    }

    // API call for make list
    const getMakeList = () => {
        setLoading(true);
        AsyncStorage.multiGet([CONSTANTS.TOKEN, CONSTANTS.USER_TOKEN])
            .then((res) => {
                // alert(res)
                let token = res[0][1];
                let userToken = res[1][1];
                console.log('#@'+ userToken)
                console.log('@@'+token)
              

                Actions.GetMakeList(token, userToken).then((response) => {
                    setLoading(false);
                    if (response.data.status) {
                        let data = response.data.data;
                        console.log(JSON.stringify(data))
                        let arr = data.makeList;
                        setMakeList([...arr]);
                    }
                })
                    .catch((err) => {
                        setLoading(false);
                        console.log('errooo ' + JSON.stringify(err.message))
                        
                        if (err.response.status === 401){
                            AsyncStorage.setItem(CONSTANTS.TOKEN,'');
                            AsyncStorage.setItem(CONSTANTS.USER_TOKEN,'');
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            })
                        }

                    })
            })
    }

    const handleImage = (response, type) => {
        closePicker();
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            if (type === '1') {
                if (imageObject.length <= 6) {
                    var arr = imageObject;
                    let date = Date.now()
                    console.log("RRR"+response)
                    const file = {
                        name: "Image" + date + ".jpg",
                        type: response.mime,
                        uri: Platform.OS === "android" ? response.path : response.path.replace("file://", ""),
                    }
                    arr.push(file);

                    setImageObject(arr);
                    setImageSource(response.path);
                }
            }
            else {
                var arr = imageObject;
                response.map((item) => {
                    if (arr.length < 6) {

                        let date = Date.now()
                        console.log("RRR11"+ JSON.stringify( item))

                        const file = {
                            name: item.mime.includes('image') ?  "Image" + date + ".jpg" : date + ".mp4",
                            type: item.mime,
                            uri: Platform.OS === "android" ? item.path : item.path.replace("file://", ""),
                        }
                        console.log('###',file)
                        arr.push(file);

                    }
                });
                setImageObject([...arr]);
                //  alert(JSON.stringify(imageObject))
                setImageSource(response.path);
            }

        }
    }


    const getYearsList = () => {
        let currentYear = new Date().getFullYear();
        let arr = yearList;

        for (let i = Number(currentYear); i >= 1990; i--) {
            let year = {
                name: i
            }
            arr.push(year);
        }
        setYearList([...arr]);
    }


    const showPicker = () => {
        refRBSheet.current.open();
    }

    const closePicker = () => {
        refRBSheet.current.close();

    }

    const setImages = () => {

        ImagePicker.openPicker({
            multiple: true,
            mediaType: "any",
            // cropping: true
        }).then(response => {
            handleImage(response, '2')
        })
    }

    const openCamera = () => {

        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(response => {
            handleImage(response, '1')
        })
    }

    const submit = () => {

        if (imageObject.length === 0) {
            SimpleToast.show('Please add image or video.', SimpleToast.LONG);
        }

        else {
            uploadMedia();

        }
    }

    const sendData = () => {
        setHideDialog(false);

    }
    const refRBSheet = useRef();


    const selectModal = () => {
        if (makeValue === '') {
            SimpleToast.show('Please select make value first')
        }
        else {
            getModalList();
            setShowMake(false),
                setShowModal(!showModal),
                setShowYear(false),
                setShowCarType(false),
                setShowPost(false)
        }
    }

    return (
        <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={50}
            keyboardShouldPersistTaps='handled' scrollEnabled resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#fafafa" }}>
                <ImageBackground style={{ flex: 1, backgroundColor: '#ffffff' }} source={Images.white_bg}>

                    <HeaderView menuColor='#ed3836' menu left leftPress={() => navigation.toggleDrawer()} />
                    {loading ? <Spinner /> : null}
                    <View style={Styles.imageOuterView}>
                        {
                            imageObject.length > 0
                                ?
                                <>
                                    {
                                        <FlatList
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={imageObject}
                                            renderItem={({ index, item }) => (
                                                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
                                                    <View
                                                        style={{ marginLeft: 10, marginRight: 10, alignSelf: 'center', }}>
                                                        <Image
                                                            style={{ width: wp('55%'), borderRadius: 30, height: hp('18%'), resizeMode: 'cover' }}
                                                            source={{ uri: item.uri != '' ? item.uri : null }} />

                                                        <TouchableOpacity onPress={() => removeImage(index)} style={{ overflow: 'hidden', borderRadius: 20, width: 22, height: 22, justifyContent: 'center', alignItems: 'center', position: 'absolute', margin: 7, right: 5, top: 5 }}>
                                                            <Image resizeMode='contain' style={{ width: 30, height: 30 }} source={Images.cancel}>

                                                            </Image>
                                                        </TouchableOpacity>
                                                    </View>
                                                    {imageObject.length > 5 ? null :
                                                        index + 1 === imageObject.length ?
                                                            <TouchableOpacity
                                                                onPress={() => { showPicker() }}
                                                                style={[{ justifyContent: 'center', alignItems: 'center', marginRight: 10, marginLeft: 10, alignSelf: 'center', width: wp('25%'), backgroundColor: '#f6d7d9', borderRadius: 30, height: hp('19%') }]}>
                                                                <Image style={{ width: 35, height: 35 }} resizeMode='contain' source={Images.redadd} />


                                                            </TouchableOpacity> : null}
                                                </View>
                                            )}
                                            keyExtractor={item => item.id}
                                        />
                                    }
                                </>
                                :
                                <TouchableOpacity
                                    onPress={() => { showPicker() }}
                                    style={[{ justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '25%', backgroundColor: '#f6d7d9', borderRadius: 30, height: hp('19%') }]}>
                                    <Image style={{ width: 35, height: 35 }} resizeMode='contain' source={Images.redadd} />

                                </TouchableOpacity>
                        }
                    </View>
                    <SignupPickerView data={makeList} setValue={(value) => { setselectedMakeId(value.id), setMakeValue(value.name), setShowMake(false), getModalList() }} openPicker={() => { setShowMake(!showMake), setShowModal(false), setShowYear(false), setShowCarType(false), setShowPost(false) }} show={showMake} value={makeValue} placeholder={'Select Make'} />
                    <SignupPickerView data={[...modalList]} setValue={(value) => { setModalValue(value.name), setselectedModalId(value.id), setShowModal(false) }} openPicker={() => { selectModal() }} show={showModal} value={modalValue} placeholder={'Select Model'} />
                    <SignupPickerView data={yearList} setValue={(value) => { setYearValue(value.name), setShowYear(false) }} openPicker={() => { setShowMake(false), setShowModal(false), setShowYear(!showYear), setShowCarType(false), setShowPost(false) }} show={showYear} value={yearValue} placeholder={'Select Year'} />
                    <SignupPickerView data={[{ name: 'Gas' }, { name: 'Electric' }]} setValue={(value) => { setCarTypeValue(value.name), setShowCarType(false) }} openPicker={() => { setShowMake(false), setShowModal(false), setShowYear(false), setShowCarType(!showCarType), setShowPost(false) }} show={showCarType} value={carTypeValue} placeholder={'Car Type'} />
                    <SignupPickerView data={[{ name: 'New for Website' }, { name: 'Post to Social' }]} setValue={(value) => { setPostValue(value.name), setShowPost(false) }} openPicker={() => { setShowMake(false), setShowModal(false), setShowYear(false), setShowCarType(false), setShowPost(!showPost) }} show={showPost} value={PostValue} placeholder={'Where to Post'} />
                    <View style={{ marginTop: 5 }}>
                        <SignupTextField desc placeholder='Add other info here' onChangeText={setOtherInfo} value={otherInfo} />
                    </View>

                    <CustomButton tick goToNext={() => submit()} text='Submit' colors={AppColors.buttonColor} />
                    <View style={Styles.bottom} />
                    <RBSheet
                        ref={refRBSheet}
                        height={280}
                        openDuration={250}
                        customStyles={{
                            container: {
                                alignItems: "center",
                                backgroundColor: 'transparent',
                                height: hp('30%')
                            }
                        }}
                    >
                        <TouchableOpacity onPress={() => { openCamera() }} style={[Styles.pickerTypeView, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, marginTop: hp('5%'), }]}>
                            <Text style={Styles.closeText}>Choose from Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setImages() }} style={[Styles.pickerTypeView, { borderTopLeftRadius: 0, borderTopRightRadius: 0, }]}>
                            <Text style={Styles.closeText}>Choose from Photo library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.closeView} onPress={() => refRBSheet.current.close()}>
                            <Text style={[Styles.closeText, { color: AppColors.RED }]}>Cancel</Text>
                        </TouchableOpacity>
                    </RBSheet>

                    <Dialog
                        visible={hideDialog}
                        dialogStyle={Styles.dialogOuterView}
                        onTouchOutside={() => { setHideDialog(false) }} >
                        <View >
                            <View style={Styles.imageView}>
                                <Image style={{ width: 30, height: 30 }} resizeMode='contain' source={Images.redtick}></Image>
                            </View>
                            <Text style={Styles.sentText}>SENT!</Text>
                            <CustomButton goToNext={() => { sendData() }} Styles={{ width: wp('40%'), marginTop: hp('5%') }} colors={AppColors.buttonColor} text='OK' />
                        </View>

                    </Dialog>
                </ImageBackground>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default Upload;
