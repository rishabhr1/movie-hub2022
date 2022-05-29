<template>
  <div class="back">
    <navbar />
    <div>
      <div
        class="
          center
          align-items-center
          flex
          justify-content-center
          align-center
        "
      >
        <div  class="login-card">
          <div class="card-body">
            <h1 class="align-text">Login</h1>
            <b-field label="Email" type="is-danger">
              <b-input
                v-model="login.email"
                type="email"
                placeholder="Enter Email"
                maxlength="30"
              >
              </b-input>
            </b-field>
            <b-field
              label="Password"
              type="is-warning"
              :message="{ 'invalid credentials': hasError }"
            >
              <b-input
                v-model="login.password"
                type="password"
                placeholder="Enter Password"
                maxlength="30"
              ></b-input>
            </b-field>
            <div class="text-align">
              <b-button @click="loginUser()" type="my-button"
                >Submit</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import navbar from "../components/navbar.vue";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      hasErrorP: false,
      hasError: false,
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      let user;
      try {
        user = await axios.post("/user/login", this.login);
        this.$store.dispatch("storeUserId", user.data.user._id)
        console.log(user.data.user._id);
        const userData = {
          email: user.data.user.email,
          userName: user.data.user.userName,
          isLogged: true,
        };
        this.$store.dispatch("saveUserData", userData);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
        this.hasError = true;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,300&display=swap");

.back {
background: linear-gradient(90deg, #000000, #110302, #1c0505, #230807, #2a0a09, #32090c, #3b080e, #430510) !important;
}
.card {
  border-radius: 0.8;
}
.card-body {
  padding: 15px;
}
.align-center {
  min-height: calc(100vh - 50px) !important;
}
.align-text {
  text-align: center;
  color: rgb(241, 234, 234);
  padding: 1px;
  font-size: 1.5em;
}
.foo > .label {
  color: rgb(55, 3, 3);
}
.white-color {
  color: white;
}
.text-align {
  margin-left: 90px;
  margin-top: 20px;
}
.login-card {
background: rgba( 239, 231, 231, 0.2 );
box-shadow: 0 8px 32px 0 rgba(135, 31, 43, 0.37);
backdrop-filter: blur( 0px );
-webkit-backdrop-filter: blur( 0px );
border-radius: 10px;
width: 300px;
}

.select select, .taginput .taginput-container.is-focusable, .textarea, .input {
  background-color: rgba( 242, 234, 234, 0.25 ) !important;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: white !important;
}

.label {
  color: whitesmoke !important;
  display: block;
  font-size: 1rem;
  font-weight: 600;
}
.my-button {
  color: white !important;
  background: maroon !important;
}
</style>
