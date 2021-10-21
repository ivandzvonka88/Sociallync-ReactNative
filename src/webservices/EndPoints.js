
const DEV1 ="http://3.139.165.120/v1/index.php/api/User/";
const IMagesURL = "http://3.139.165.120/v1/uploads/userProfilePics/";

let BASE_URL = DEV1;

export default {
    JWT_TOKEN :BASE_URL + "token",
    LOGIN: BASE_URL + "login",
    REGISTER : BASE_URL + "register",
    CHANGE_PASSWORD : BASE_URL + "changePassword",
    UPLOAD_USERPROFILE_IMAGE : BASE_URL + "updateUserProfilePic",
    UPLOAD_USERPROFILE : BASE_URL + "updateUserProfile",
    FORGOT_PASSWORD : BASE_URL + "forgotPassword",
    VIEWMODEL_LIST : BASE_URL + "viewModelList",
    VIEWMAKE_LIST : BASE_URL + "viewMakeList",
    RESEND_OTP : BASE_URL + "resendOtp",
    OTP_VERIFICATION :BASE_URL + "otpVerification",
    VIEW_USERPROFILE : BASE_URL + "viewUserProfile",
    VIEW_NOTIFICATIONS : BASE_URL + "notifications",
    UPLOAD_POST : BASE_URL + "sendUserPost",
    LOGOUT: BASE_URL + "logout",
    IMAGES : IMagesURL,
    FACELOGIN : BASE_URL + "faceLogin"
  };