import axios from "axios";
const state = {
    token: null,
    message: null
};



const actions = {

    async logIn({ commit }, form) {
        let response = await axios.post(`http://localhost:8080/api/Customer/Login`, form);
        commit('setToken', response.data.Token)
        commit('setMessage', response.data.Message) 
        localStorage.setItem('token', response.data.Token )

        // console.log(response.data.Token)

    }

};

const mutations = {
    setToken: (state, token) => (state.token = token),
    setMessage: (state, message) => (state.message = message)


};


const getters = {
    getToken: state => state.token,
    getMessage: state => state.message


};


export default {
    state,
    mutations,
    actions,
    getters
}

