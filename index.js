import React from 'react'
import { AppRegistry } from 'react-native';
import App from './App';
// import InitialRoutes from './appNavigation/appNavigation'
import { Provider } from 'react-redux'
import store from './src/store'
class AppRoot extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('MBC', () => AppRoot);
//MBC