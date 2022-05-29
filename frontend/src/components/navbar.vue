
<template class="transparent">
<div>
    <b-navbar >
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                    class="LOGO"
                ><span>&nbsp;&nbsp;MOVIES HUB</span>
            </b-navbar-item>
        </template>
         <template #start>
            <b-navbar-item class="navitem">
                <router-link :to= "{ path : '/'}" class="hover">Home</router-link>
            </b-navbar-item>
            <b-navbar-item class="navitem">
                <router-link :to= "{ path : '/mostpopular'}" class="hover" >Most Popular</router-link>
            </b-navbar-item>
            <b-navbar-item class="navitem">
                <router-link :to= "{ path : '/top'}" class="hover" >Top 10</router-link>
            </b-navbar-item>
            <b-navbar-item class="navitem">
                <router-link :to= "{ path : '/recommendations'}" class="hover" >Recommendations</router-link>
            </b-navbar-item>
            <b-navbar-item class="navitem">
                <router-link :to= "{ path : '/watchlist'}" class="hover" >Watchlist</router-link>
            </b-navbar-item>
         </template>
        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button user-button" v-if="loggedIn" @click="isCardModalActive = true">
                       {{ $store.state.userData.userName }}
                    </a>
                    <a class="button my-button" v-else>
                        <router-link :to= "{ path : '/register'}" class="white-color" >Sign Up</router-link>
                    </a>
                    <a class="button s-button"   v-if="!loggedIn">
                       <router-link :to= "{ path : '/login'}" >Sign In</router-link>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
        <b-modal v-model="isCardModalActive" :width="340" :height="540" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        Logout from Your Account ?
                    </div>
                <footer class="modal-card-foot">
                    <b-button
                        class="user-button"
                        label="Logout"
                        @click="logout()" />
                </footer>
                </div>
            </div>
        </b-modal>
</div>
</template>

<script>
export default {
    data() {
        return {
            loggedIn: false,
            isCardModalActive: false
        }
    },
    created() {
        this.loggedIn = this.$store.getters.loggedIn
        console.log(this.loggedIn,this.$store)
    },
    methods: {
        logout() {
         const userData = {
           userName : "",
           email : "",
           isLogged: false
         }
        this.$store.dispatch('saveUserData', userData) 
        let id = ""
        this.$store.dispatch("storeUserId", id)
        console.log(this.$store.getters.userId) 
        this.$router.push("/login");    
        }
    }
}
</script>

<style lang="css" scoped>
.content {
    color: white;
}
    span {
        font-size: 20px;
        color: rgb(21, 21, 21);
    }
.navbar-burger .burger {
    opacity: 0 !important;
}
.navitem {
    color: rgb(13, 13, 13) !important;
}
.navbar {
    color: black !important;
}
.transparent {
    background-color: rgba(20, 20, 20, 0.558);
}
.navitem:hover {
    background-color: rgba(0,0, 0, 0.208);
}
.hover {
 font-size:1.2em;
 }
 a{
     color: rgb(15, 14, 14);
 }
 .white-color {
     color: white;
 }
 .username {
     font-size: 1.5em;
     padding: 10px;
 }
.card-content {
    height: 200px;
}
.card {
box-shadow: 0 3px 10px rgb(0 0 0 / 1);
}
.my-button {
    background: maroon !important;
}
.s-button {
    background: rgb(243, 236, 236);
}
.user-button {
    color: white !important;
    background-color: maroon !important;
}
</style>
