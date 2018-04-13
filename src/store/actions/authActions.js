export class AuthAction {
    static LOGIN = "LOGIN";
    static LOGOUT = "LOGOUT";
    static VERIFIEDEMAIL = "VERIFIEDEMAIL";
    static VERIFIEDUSER = 'VERIFIEDUSER';
    static ALREADYLOGIN = 'ALREADYLOGIN';
    static GETTOKEN = "GETTOKEN";
    static GETPROFILEINFO = "GETPROFILEINFO";

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
    static alreadyLogin = (payload) => ({
        type: AuthAction.ALREADYLOGIN,
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
