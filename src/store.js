import {createStore} from 'vuex'

export default createStore({
    state() {
        return {
            isPopupVisible: false,
            isPopupResultVisible: false,
            isPopupErrorVisible: false,
            name: null,
            phone: null,
            email: null,
            city_id: null,
        }
    },
    mutations: {
        showPopup: function (state, payload) {
            state.isPopupVisible = !state.isPopupVisible;
            state.city_id = payload.city_id;
            state.name = null;
            state.phone = null;
            state.email = null;
        },
        showPopupResult: function (state) {
            state.isPopupVisible = false;
            state.isPopupResultVisible = true;
        },
        closePopupResult: function (state) {
            state.isPopupResultVisible = false;
            state.city_id = null;
            state.name = null;
            state.phone = null;
            state.email = null;
        },
        showPopupError: function (state) {
            state.isPopupErrorVisible = !state.isPopupErrorVisible;
        },
    },

})