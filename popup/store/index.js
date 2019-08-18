import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		first_settings: false,
		show_name_setter:
			localStorage.getItem('show_name_setter') !== null
				? JSON.parse(localStorage.getItem('show_name_setter'))
				: true,
		user_name: '',
		like_bot: {
			isStart: false,
			speed:
				localStorage.getItem('bot_like_speed') !== null ? parseInt(localStorage.getItem('bot_like_speed')) : 500
		},
		message_bot: {
			isStart: false,
			message: localStorage.getItem('last_message'),
			dletingIsStart: false,
			saved_messages: [],
			active_message:
				localStorage.getItem('last_message') !== null ? parseInt(localStorage.getItem('last_message')) : 1
		}
	},

	mutations: {
		setShowNameSetter(state, value) {
			state.show_name_setter = value;
		},

		lll(state) {
			state.show_name_setter = false;
		}
	}
});

export default store;
