import axios from 'axios';
import EndPoints from './EndPoints';

const Actions = {
	Register: (data) => {
		const headers = {
			'Content-Type': 'multipart/form-data',
			'token': data.token,
			'Accept': 'application/json'
		};
		return axios.post(EndPoints.REGISTER, data.data, { headers });
	},

	GetToken: () => {
		return axios.get(EndPoints.JWT_TOKEN, {
		});
	},


	Login: (data) => {
		console.log('##'+ JSON.stringify( data))
		const headers = {
			'token': data.token,
			'Accept': 'application/json'
		};
		return axios.post(EndPoints.LOGIN, data.data, { headers });
	},

      FaceLogin : (data) => {
		  console.log('###da',JSON.stringify(data))
         const headers = {
			'token': data.token
			};
          return axios.post(EndPoints.FACELOGIN,data.data,{ headers });
},



	ForgotPassword: (data) => {
		const headers = {
			'token': data.token,
			'Accept': 'application/json',
			
		};
		return axios.post(EndPoints.FORGOT_PASSWORD, data.data, { headers });

	},


    ChangePassword : (data) => {
		const headers = {
			'token' : data.token,
			'usertoken': data.usertoken,
			'Accept': 'application/json',
		};
		return axios.post(EndPoints.CHANGE_PASSWORD,data.data, { headers })
 
	},


	GetModals: (token, userToken, id) => {
		let url = `${EndPoints.VIEWMODEL_LIST}?pageNumber=1&makeId=${id}`;
		return axios.get(url, {
			headers: {
				'token': token,
				'usertoken': userToken
			},
		});
	},

	GetMakeList: (token, userToken) => {
		let url = `${EndPoints.VIEWMAKE_LIST}?pageNumber=1`;
		return axios.get(url, {
			headers: {
				'token': token,
				'usertoken': userToken
			},
		});
	},


     GetNotificationList : (token, usertoken,pageno) =>{
		let url = `${EndPoints.VIEW_NOTIFICATIONS}?pageNumber=${pageno}`;
		return axios.get(url,{
			headers: {
				'token': token,
				'usertoken': usertoken
			},
		})

	 },

	 checkOtpVerification : (otp,token,usertoken) => {
	   let url = `${EndPoints.OTP_VERIFICATION}?otpCode=${otp}`;
	   return axios.get(url,{
		   headers:{
			'token': token,
			'usertoken': usertoken
		   },
	   })
	},


     ViewUserProfile : (token,usertoken) => {
     return axios.get(EndPoints.VIEW_USERPROFILE,{
		 headers : {
			 'token': token,
			 'usertoken' : usertoken
		 },
	 });


	},

	resendOtp : (token,usertoken) => {
	   return axios.get(EndPoints.RESEND_OTP,{
		headers : {
			'token': token,
			'usertoken' : usertoken
		},
	   })
		
	},
	

    logoutUser : (token,usertoken) =>{
      return axios.get(EndPoints.LOGOUT,{
       headers : {
		  'token':token,
		  'usertoken':usertoken
	   },


	  });
	},


	UpdateUserProfile : (data) =>{
		 console.log('##tt',JSON.stringify( data))
		const headers = {
			'token' : data.token,
			'usertoken': data.usertoken,
			'Accept': 'application/json',
		};
		return axios.post(EndPoints.UPLOAD_USERPROFILE,data.data, { headers })

	},


	UpdateUserPic : (data) => {
		console.log("ff",data)
		const headers = {
			'Content-Type': 'multipart/form-data',
			'token' : data.token,
			'usertoken': data.usertoken,
			'Accept': 'application/json',
		};

		return axios.post(EndPoints.UPLOAD_USERPROFILE_IMAGE, data.data, { headers })

	},

 UploadMediaFiles :(data) =>{

	console.log('formdata '+JSON.stringify(data.data))
	const headers = {
		'Content-Type': 'multipart/form-data',
		'token' : data.token,
		'usertoken': data.usertoken,
		'Accept': 'application/json',
	};
	return axios.post(EndPoints.UPLOAD_POST,data.data , { headers })
 },
};

export default Actions;