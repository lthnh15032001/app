/**
 * @format
 */

// import { AppRegistry } from 'react-native';
import App from './App';
// import {name as appName} from './app.json';
import { Navigation } from "react-native-navigation";
// AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent('com.internapp', () => App);
import { rootStack } from './src/navigation/Root'

Navigation.events().registerAppLaunchedListener(() => {
    rootStack('com.internapp')
});