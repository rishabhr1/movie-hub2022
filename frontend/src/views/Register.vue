<template>
  <div>
    <navbar />
    <div class="back">
      <div
        class="
          center
          align-items-center
          flex
          justify-content-center
          align-center
        "
      >
        <div class="reg-card">
          <div class="card-body">
            <h1 class="align-text">Register</h1>
            <b-field label="Name">
              <b-input
                v-model="register.name"
                placeholder="Enter Name"
              ></b-input>
            </b-field>
            <b-field
              label="Email"
              type="is-danger"
              :message="{ 'Email is not available': hasError }"
            >
              <b-input
                v-model="register.email"
                type="email"
                placeholder="Enter Email"
                maxlength="30"
              >
              </b-input>
            </b-field>
            <b-field
              label="Password"
              type="is-warning"
              :message="{ 'Password is incorrect': hasErrorP }"
            >
              <b-input
                v-model="register.password"
                type="password"
                maxlength="30"
                placeholder="Enter Password"
              ></b-input>
            </b-field>
            <div class="text-align">
              <b-button @click="registerUser()" type="my-button"
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
      register: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        let res = await axios.post("/user/register", this.register);
        this.$store.dispatch('storeUserId' , res.data._id)
      } catch (e) {
        console.log(e);
      }
      const userData = {
        userName: this.register.name,
        email: this.register.email,
        isLogged: true,
      };
      this.$store.dispatch("saveUserData", userData);
      this.$router.push("/");
      console.log(this.register.name);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,300&display=swap");

.back {
background: linear-gradient(90deg, #000000, #110302, #1c0505, #230807, #2a0a09, #32090c, #3b080e, #430510);
}

.card-body {
  padding: 18px;
}
.align-center {
  min-height: calc(100vh - 50px) !important;
}
.align-text {
  text-align: center;
  color: rgb(246, 241, 241);
  padding: 1px;
  font-size: 1.5em;
}
.foo > .label {
  color: red;
}
.white-color {
  color: rgb(8, 8, 8);
}
.text-align {
  margin-left: 5.5em;
}
.reg-card {
background: rgba( 239, 231, 231, 0.2 );
width: 320px;
box-shadow: 0 8px 32px 0 rgba(135, 31, 43, 0.37);
backdrop-filter: blur( 0px );
-webkit-backdrop-filter: blur( 0px );
border-radius: 10px;
}
.my-button {
  color: white !important;
  background: maroon !important;
}
</style>
