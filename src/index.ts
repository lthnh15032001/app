import { LogBox } from 'react-native'
import { Screens, startApp } from './screens';
import { onSnapshot } from 'mobx-state-tree';
import { Navigation } from 'react-native-navigation';
import debounce from 'lodash/debounce';
import UI from './stores/UI';
import AsyncStorage from '@react-native-async-storage/async-storage';
LogBox.ignoreAllLogs(true);
// Register screens
Screens.forEach((ScreenComponent, key) => {
	// console.log({ ScreenComponent: ScreenComponent, key: key })
	Navigation.registerComponent(key, () => ScreenComponent)
})

Navigation.events().registerAppLaunchedListener(() => {
	startApp()
	// if (__DEV__) {
	// 	makeInspectable(UI);
	// 	makeInspectable(Account);
	// 	makeInspectable(Stories);
	// 	makeInspectable(Items);
	// }

	// UI.hydrate().then(startApp);
});
// Start application
// Navigation.events().registerAppLaunchedListener(() => {
// 	if (__DEV__) {
// 	  makeInspectable(UI);
// 	  makeInspectable(Account);
// 	  makeInspectable(Stories);
// 	  makeInspectable(Items);
// 	}

// 	UI.hydrate().then(startApp);
//   });

//   // Listen for componentDidAppear screen events
Navigation.events().registerComponentDidAppearListener(({ componentId, componentName }) => {
	// console.log({ componentId, componentName })
	UI.onDidAppear(componentId, componentName);
});

//   // Listen for componentDidAppear screen events
Navigation.events().registerComponentDidDisappearListener(({ componentId, componentName }) => {
	UI.onDidDisappear(componentId, componentName);
});

//   // Calculate layout on device rotation (and initially)
//   Dimensions.addEventListener('change', UI.updateLayout);
//   UI.updateLayout();

//   // Firebase connection state
//   db.ref('.info').on('value', (s: any) => {
// 	UI.setIsConnected(s.val().connected);
//   });

//   // Listen to device connection state
//   NetInfo.addEventListener('connectionChange', ({ type }: any) => {
// 	UI.setIsConnected(type !== 'none');
//   });

//   // Initial device connection state
//   NetInfo.getConnectionInfo().then(({ type }) => {
// 	UI.setIsConnected(type !== 'none');
//   });

//   // Persist some stuff (debounced to 1s)
// onSnapshot(UI.settings, debounce(
// 	snapshot => AsyncStorage.setItem('UI.settings', JSON.stringify(snapshot)),
// 	1000,
// ));

//   onSnapshot(Account, debounce(
// 	snapshot => AsyncStorage.setItem('Account', JSON.stringify(snapshot)),
// 	1000,
//   ));
