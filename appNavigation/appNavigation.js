import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import {
    Login, PrivacyPolicy, SelectPayment, Dashbord, BusinessCategory, Offers, Profile,
    AddCard, StripeCard, CompanyDetails, FindBusinees, CompanyLinks, Events, ForgotPassword
    , GenerateOffer
} from '../src/components';
import { Signup } from '../src/container'
const Payment = TabNavigator({
    'Select Payment': {
        screen: SelectPayment,
    },
    'Add Card': {
        screen: AddCard,
    },
},
    {
        tabBarPosition: 'top',
        initialRouteName: 'Add Card',
        tabBarOptions: {
            style: {
                backgroundColor: 'transparent',
                padding: 8,
                // marginTop: STATUS_BAR_HEIGHT
            },
            indicatorStyle: {
                borderBottomColor: '#ffffff',
                borderBottomWidth: 3,
            },
            tabStyle: {
                borderRightColor: '#ffffff',
                borderRightWidth: 1,
            }
        }
    }
)

const loginMenu = StackNavigator({
    DashbordScreen: { screen: Dashbord },
    PrivacyPolicyScreen: { screen: PrivacyPolicy },
    FindBusineesScreen: { screen: FindBusinees },
    CompanyDetailsScreen: { screen: CompanyDetails },
    BusinessCategoryScreen: { screen: BusinessCategory },
    OffersScreen: { screen: Offers },
    EventsScreen: { screen: Events },
    ProfileScreen: { screen: Profile },
    GenerateOfferScreen: { screen: GenerateOffer }
})
loginMenu.navigationOptions = {
    header: null
}
const LogoutMenu = StackNavigator({
    LoginScreen: { screen: Login },
    SignupScreen: { screen: Signup },
    ForgotPasswordScreen: { screen: ForgotPassword },
    linkscreen: { screen: CompanyLinks },
    SelectPaymentScreen: { screen: SelectPayment },
})

const InitialRoutes = (islogin) => {
    console.log(islogin)
    return (
        StackNavigator({
            LoginMenu: { screen: loginMenu },
            LogoutMenu: { screen: LogoutMenu }
        }
            ,
            {
                headerMode: 'null',
                initialRouteName: islogin ? 'LoginMenu' : 'LogoutMenu'
            }
        )

    )
}
export default InitialRoutes;