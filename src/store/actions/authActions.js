export class AuthAction {

    static LOGIN = "LOGIN";
    static LOGINSUCCESS = "LOGINSUCCESS";
    static LOGINFAIL = "LOGINFAIL";

    static SIGNUP = "SIGNUP";
    static SIGNUPSUCCESS = "SIGNUP";
    static SIGNUPFAIL = "SIGNUP";

    static LOGOUT ="LOGOUT"
    static LOGOUTSUCCESS = "LOGOUTSUCCESS";
    static LOGOUTFAIL = "LOGOUTFAIL";

    static ALREADYLOGIN = 'ALREADYLOGIN';
    static GETTOKEN = "GETTOKEN";
    static GETPROFILEINFO = "GETPROFILEINFO";
    static CHECKUSER = "CHECKUSER";





    
    static userLogin = (payload) => ({
        type: AuthAction.LOGIN,
        payload
    })
    static logout = (payload) => ({
        type: AuthAction.LOGOUT,
        payload
    })
    static verifyemail = (payload) => ({
        type: AuthAction.VERIFIEDEMAIL
    })

    static verifiedUser = (payload) => {
        type: AuthAction.VERIFIEDUSER,
            payload
    }
    // static alreadyLogin = (payload, role) => {
    //     console.log("role in action", role)
    //     return (
    //         {
    //             type: AuthAction.ALREADYLOGIN,
    //             payload: payload,
    //             role: role
    //         }
    //     )
    // }

    static alreadyLogin = (payload, role) => {
        console.log("role in action", payload)
        return (
            {
                type: AuthAction.ALREADYLOGIN,
                payload: payload,
                role: role
            }
        )
    }
    static checkUser = (payload) => ({
        type: AuthAction.CHECKUSER,
        payload
    })




    static getToken = (payload) => ({
        type: AuthAction.GETTOKEN,
        payload
    })
    static getProfileInfo = (payload) => {
        console.log(payload)
        return (
            {
                type: AuthAction.GETPROFILEINFO,
                payload
            }
        )
    }
}
