<template>
  <div>
    <navbar />
    <h5 style="color: white" class="header">
      See More , Entertain More
      <h3>watcha lookin' for?</h3>
    </h5>
    <div id="hero">
      <div class="background-container">
        <picture>
          <source
            srcset="
              https://images.pexels.com/photos/7991436/pexels-photo-7991436.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
            "
            media="(min-width: 1440px)"
          />
          <source
            srcset="
              https://images.unsplash.com/photo-1620145648299-f926ac0a9470?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1887&q=80
            "
            media="(max-width: 640px)"
          />
          <img
            src="https://images.pexels.com/photos/7991436/pexels-photo-7991436.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            class="hero-background"
          />
        </picture>
      </div>
      <div>
        <form v-on:submit="redirect">
          <b-field class="centerme">
            <b-input
              placeholder="Search for Movies....."
              class="searchbox"
              type="search"
              icon-pack="fas"
              icon="search"
              v-model="searchText"
            >
            </b-input>
          </b-field>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
export default {
  components: {
    navbar,
  },
  name: "Home",
  data() {
    return {
      searchText: "",
    };
  },
  created() {
    this.$store.dispatch("saveText", "");
  },
  methods: {
    redirect() {
      this.$router.push({
        name: "homeresults",
        params: { message: this.searchText },
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,300&display=swap");
h3 {
  font-size: 80%;
  text-align: center;
}

.header {
  z-index: 10;
  top: 20vh;
  animation: hero 1s ease-in 0s alternate;
}
.suggestions {
  position: absolute;
  top: 45vh;
  width: 100vw;
  padding-left: 10vw;
  padding-right: 10vw;
  color: white;
}
@keyframes hero {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
.searchbox {
  width: 80vw;
  margin-left: 10vw;
  margin-right: 10vw;
}
.centerme {
  padding-top: 35vh;
}
#hero {
  position: relative;
  background-position: 50%;
  background-size: cover;
  background-color: #555;
  margin: 0 0 20px;
  text-align: center;
  transition: 0.8s;
}
#hero .background-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
#hero .hero-background {
  position: absolute;
  min-width: 1000%;
  min-height: 3500%;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) scale(0.1);
}
h1 {
  max-width: 400px;
  color: #fff;
  line-height: 1.5 !important;
  font-family: "Montserrat", sans-serif;
}
@media (min-width: 300px) and (max-width: 350px) {
  .header {
    font-size: 27px;
    position: absolute;
    left: 13vw;
  }
}
@media (min-width: 350px) and (max-width: 400px) {
  .header {
    font-size: 29px;
    position: absolute;
    left: 5.5vw;
  }
}
@media (min-width: 400px) and (max-width: 450px) {
  .header {
    font-size: 29px;
    position: absolute;
    left: 10vw;
  }
}
@media (min-width: 450px) and (max-width: 500px) {
  .header {
    font-size: 30px;
    position: absolute;
    left: 12vw;
  }
}
@media (min-width: 500px) and (max-width: 550px) {
  .header {
    font-size: 30px;
    position: absolute;
    left: 15vw;
  }
}
@media (min-width: 550px) and (max-width: 600px) {
  .header {
    font-size: 30px;
    position: absolute;
    left: 18vw;
  }
}
@media (min-width: 600px) and (max-width: 650px) {
  .header {
    font-size: 30px;
    position: absolute;
    left: 20vw;
  }
}
@media (min-width: 650px) and (max-width: 700px) {
  .header {
    font-size: 32px;
    position: absolute;
    left: 25vw;
  }
}
@media (min-width: 700px) and (max-width: 750px) {
  .header {
    font-size: 32px;
    position: absolute;
    left: 26vw;
  }
}
@media (min-width: 750px) and (max-width: 800px) {
  .header {
    font-size: 34px;
    position: absolute;
    left: 27vw;
  }
}
@media (min-width: 800px) and (max-width: 850px) {
  .header {
    font-size: 35px;
    position: absolute;
    left: 28vw;
  }
}
@media (min-width: 850px) and (max-width: 900px) {
  .header {
    font-size: 35px;
    position: absolute;
    left: 29vw;
  }
}
@media (min-width: 900px) and (max-width: 950px) {
  .header {
    font-size: 35px;
    position: absolute;
    left: 30vw;
  }
}
@media (min-width: 950px) and (max-width: 1000px) {
  .header {
    font-size: 35px;
    position: absolute;
    left: 31vw;
  }
}
@media (min-width: 1000px) and (max-width: 1100px) {
  .header {
    font-size: 37px;
    position: absolute;
    left: 30vw;
  }
}
@media (min-width: 1100px) and (max-width: 1200px) {
  .header {
    font-size: 37px;
    position: absolute;
    left: 30vw;
  }
}
@media (min-width: 1200px) and (max-width: 1300px) {
  .header {
    font-size: 38px;
    position: absolute;
    left: 33vw;
  }
}
@media (min-width: 1300px) and (max-width: 1400px) {
  .header {
    font-size: 39px;
    position: absolute;
    left: 33vw;
  }
}
@media (min-width: 1400px) and (max-width: 1500px) {
  .header {
    font-size: 42px;
    position: absolute;
    left: 32vw;
  }
}
@media (min-width: 1500px) and (max-width: 1600px) {
  .header {
    font-size: 42px;
    position: absolute;
    left: 32vw;
  }
}
@media (min-width: 1600px) and (max-width: 1700px) {
  .header {
    font-size: 42px;
    position: absolute;
    left: 34vw;
  }
}
@media (min-width: 1700px) and (max-width: 1800px) {
  .header {
    font-size: 42px;
    position: absolute;
    left: 34vw;
  }
}
@media (min-width: 1800px) and (max-width: 1900px) {
  .header {
    font-size: 42px;
    position: absolute;
    left: 36vw;
  }
}
@media (min-width: 1900px) and (max-width: 2000px) {
  .header {
    font-size: 42px;
    position: absolute;
    left: 37vw;
  }
}
</style>
