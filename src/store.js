import {createStore} from 'vuex'

export default createStore({
    state() {
        return {
            isPopupVisible: true,
            isPopupResultVisible: false,
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
    },

})