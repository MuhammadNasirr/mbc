import { AuthAction } from '../actions/authActions'
const initialState = {
    isLoggedIn: false,
    detail: {},
    verified: false,
    token: '',
    profileInfo: ''
}

export default function (state = initialState, action) {
    console.log("reducer runnign")

    switch (action.type) {
        case AuthAction.LOGIN:
            return { ...state, isLoggedIn: true, detail: action.payload, };
            break;
        case AuthAction.LOGOUT:
            return {
                isLoggedIn: false,
            }
            break;
        case AuthAction.GETTOKEN:
            return {
                ...state, token: action.payload
            }
        case AuthAction.GETPROFILEINFO:
            return {
                ...state, profileInfo: action.payload
            }
        case AuthAction.ALREADYLOGIN:
            return {
                ...state, isLoggedIn: true, token: action.payload
            }
        default:
            return state;
    }
}