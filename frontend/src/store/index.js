import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)


export const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
            userData: {
                userName:'',
                email:'',
                isLogged: false
            },
            searchText: "",
            userId: null,
            genreSelected: [],
            obj : {
                id:"",
                image:"",
                stars:"",
                genres:"",
                imdb:""
            },
            link:""
    },
    mutations: {
        saveUserData(state,userData) {
            state.userData.userName = userData.userName
            state.userData.email = userData.email
            state.userData.isLogged = userData.isLogged
    },
    saveText(state,text) {
        state.searchText = text
    },
    storeUserId(state,id) {
        state.userId = id
    },
    saveGenre(state, genres) {
        state.genreSelected = genres
    },
    saveId(state, obj) {
        state.obj = obj
    },
    saveLink(state,link) {
        state.link = link
    }
   },
    actions: {
        saveUserData(context, userData) {
            context.commit('saveUserData' , userData)
        },
        saveText(context, text) {
            context.commit('saveText', text)
        },
        storeUserId(context, id) {
            context.commit('storeUserId', id)
        },
        saveGenre(context, genres) {
            context.commit('saveGenre', genres)
        },
        saveId(context, obj) {
            context.commit('saveId', obj)
        },
        saveLink(context, link) {
            context.commit('saveLink',link)
        }
    },
    getters: {
        loggedIn(state) {
            return state.userData.isLogged;
        },
        searchText(state) {
            return state.searchText
        },
        userId(state) {
            return state.userId
        },
        genres(state) {
            return state.genreSelected
        },
        getId(state) {
            return state.obj   
       },
       getLink(state) {
           return state.link
       }
    }
});
