import { AuthAction } from '../actions/authActions';
import { ToastAndroid, AsyncStorage } from 'react-native';
import { base_url, Login, profile, CustomerSignup } from '../../constants/constant';
import axios from 'axios';

export const userLogin = (obj, navigate) => {
    return dispatch => {
        // navigate('LoginMenu')
        axios.post(`${base_url}${Login}`, obj)
            .then((res) => {
                console.log(res)
                dispatch(AuthAction.userLogin(res))
                AsyncStorage.setItem('token', res.headers.authorization)
                ToastAndroid.show('lOGIN SUCCESSFUL !', ToastAndroid.SHORT);
                AsyncStorage.getItem('token')
                    .then((res) => {
                        console.log("middlewareres", res)
                        dispatch(AuthAction.getToken(res))
                        axios.get(`${base_url}${profile}`, { 'headers': { 'Authorization': res } })
                            .then((res) => {
                                dispatch(AuthAction.getProfileInfo(res.data.data.attributes.role))
                                // navigate('ProfileScreen', { profileData: res.data.data })
                                navigate('LoginMenu')
                            })
                            .catch((error) => {
                                console.log(error.response)
                            })
                    })
                    .catch((err) => {
                        console.log(err.response)
                    })
            })
            .catch((error) => {
                console.log(error.response.data)
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
            })

    }
}
export const userSignup = (data, navigate) => {
    return dispatch => {
        axios.post(`${base_url}${CustomerSignup}`, data)
            .then((res) => {
                console.log("ressssssss", res)
                navigate('LoginMenu')
                ToastAndroid.show('success', ToastAndroid.SHORT)
            })
            .catch((error) => {
                console.log("error", error.response.data.errors[0].message)
                ToastAndroid.show(error.response.data.errors[0].message, ToastAndroid.SHORT);
            })


    }
}


export const logout = (navigate) => {
    AsyncStorage.clear()
    return dispatch => {
        dispatch(AuthAction.logout())
        ToastAndroid.show("SignOut SUCCESSFUL !", ToastAndroid.SHORT);// Sign-out successful.
        navigate("LogoutMenu");

    }
}
export const alreadyLogin = (data) => {

    console.log("===============================",data)
    // console.log(obj)
    return dispatch => {
        dispatch(AuthAction.alreadyLogin(data))
    }
}


