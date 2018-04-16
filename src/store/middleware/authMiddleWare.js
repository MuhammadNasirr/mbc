import { AuthAction } from '../actions/authActions';
import { ToastAndroid, AsyncStorage } from 'react-native';
import { base_url, Login, profile, CustomerSignup } from '../../constants/constant';
import axios from 'axios';

export const userLogin = (obj, navigate) => {
    return dispatch => {
        axios.post(`${base_url}${Login}`, obj)
            .then((res) => {
                dispatch(AuthAction.userLogin(res))
                console.log("user response", res)
                AsyncStorage.setItem('token', res.headers.authorization)
                ToastAndroid.show('lOGIN SUCCESSFUL !', ToastAndroid.SHORT);
                AsyncStorage.getItem('token')
                    .then((res) => {
                        dispatch(AuthAction.getToken(res))
                        axios.get(`${base_url}${profile}`, { 'headers': { 'Authorization': res } })
                            .then((res) => {
                                AsyncStorage.setItem('role', res.data.data.attributes.role)
                                dispatch(AuthAction.getProfileInfo(res.data.data.attributes.role))
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
export const alreadyLogin = (data, role) => {
    return dispatch => {
        dispatch(AuthAction.alreadyLogin(data, role))
    }
}


