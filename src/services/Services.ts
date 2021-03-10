export const API_URL = 'http://lucastony.hopto.org:4000';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation } from "react-native-navigation";
export class Services {
	async fetch(url = '', options = { headers: {} } as any) {
		return fetch(`${API_URL}/${url}`, {
			...options,
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				...(options.headers || {}),
			},
		})
			.then(res => res.text())
	}
	async getRestaurant(page = 20) {
		const data = await this.fetch(`restaurants`)
		const jsonData = await JSON.parse(data);
		// console.log({ data: jsonData, type: typeof jsonData })
		return jsonData
	}
	async getAccessToken(anonymus: boolean) {
		try {
			let strToken = await AsyncStorage.getItem("token");
			if (!strToken && !anonymus) {
				// window.location.href = "#/login";
				Navigation.popTo('LOGIN_SCREEN')
				return ''
			}

			let token = strToken && JSON.parse(strToken);
			if (token) return token.access_token;
			return '';
		} catch (e) {
			console.log(e);
			// window.location.href = "#/login";
			Navigation.popTo('LOGIN_SCREEN')
			return '';
		}

	}
	async login() {

	}
	async logout() {

	}
	async edit() {

		const data = await this.fetch('xedit', {
			method: 'post',
			headers: {
				'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			// body: `id=${id}&hmac=${hmac}&text=${text}`,
		});

		if (data.match(/<td>Please try again.<br>/)) {
			return false;
		}

		// TODO: How can we make sure it was edited?

		return true;
	}

}

export default new Services();