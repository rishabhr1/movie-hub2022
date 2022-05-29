<template>
  <div  class="bg">
    <navbar />
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
    <div class="error-message" v-if="!loggedIn">
            <div class="card log-card" @click="login()">
                <div class="card-content-1">
                    <div class="content">
                      <div class="message-error">Please Login To Avail this feature</div>
                    </div>
                </div>
            </div>
    </div>
    <div class="error-message" v-if="empty">
            <div class="card log-card">
                <div class="card-content-1">
                    <div class="content">
                      <div class="message-error">Watchlist is Empty</div>
                    </div>
                </div>
            </div>
    </div>
    <div v-else>
      <br>
      <div class="columns is-multiline">
        <div
          v-for="g in Results"
          :key="g.index"
          class="column is-one-third"
        >
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img :src="`${g.image}`" alt="Placeholder image" @click="redirect(g)"/>
                  </figure>
                </div>
                <div class="media-content">
                  <h8 v-if="g.title" id="cap" @click="redirect(g)">
                    {{ g.title }}</h8
                  >
                  <br>
                  <p v-if="g.imdb">
                    Rating : {{ g.imdb }}
                  </p>
                  <br>
              <b-button @click="remove(g.id)" type="my-button"
                ><i class="pi pi-times"></i>&nbsp;Remove</b-button
              >
                </div>
              </div>
              <br /><br />
            </div>
          </div>
        </div>
      </div>
    <br>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar";
import axios from "axios";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      loggedIn: false,
      isLoading: false,
      Results: [],
      loaded: false,
      key: "k_wlnbltpp",
      empty: false
    };
  },
  async created() {
    this.loggedIn = this.$store.getters.loggedIn;
    let id = this.$store.getters.userId
    const param = {
      userId: id
    }
    if(this.loggedIn === false) {
      this.isLoading = false
    }
    else if(param.userId !== "") {
      console.log(param.userId)
    this.isLoading = true
    let res = await axios.post('/user/getwatchlist', param)
    this.isLoading = false
    if(res.status == 201) {
        const userData = {
          email: "",
          userName: "",
          isLogged: false,
        };
      this.$store.dispatch("saveUserData", userData);
      this.$router.push({ name:"home"})
    }
    if(res.data.length !== 0) {
        this.Results = res.data
    }
    else {
        this.empty = true
    }
    }
  },
  methods: {
    redirect(result) {
      this.$router.push({
        name: "movieoverview",
        params: {
          message: result.id,
          imageUrl: result.image,
          stars: result.stars,
          genres: result.genres,
          imdb: result.imDbRating,
          plot: result.plot,
        },
      });
    },
    login() {
      this.$router.push({ name: "login"})
    },
    async remove(movieId) {
    let id = this.$store.getters.userId
    const param = {
      userId: id,
      id: movieId
    }
    console.log(param.id)
    let res = await axios.post('/user/removewatchlist', param)
    console.log(res.status)
    if(res.status === 200) {
      location.reload()
    }
    }
  }
};
</script>

<style scoped>
.bg {
  background: black !important;
  min-height: 100vh;
  min-width: 100vw;
}
.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
h1 {
  font-size: 18px;
}
.card-content {
      background: linear-gradient(90deg, #000000, #110302, #1c0505, #230807, #2a0a09, #32090c, #3b080e, #430510);
      color: white;
}
.card {
  cursor: pointer;
}
.bold {
  font-weight: 600;
}
.message-error {
  color: white !important;
}
.center-align-button {
  text-align: center;
}
@media (max-width: 768px) {
  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
  }
  .card-content {
    width: 335px;
  }
}
#cap {
 font-size: 22px;
 font-weight: 600;
}
.card-content-1 {
  background: #1f1f1fca;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  padding: 1.5rem;
}
.my-button {
  background: maroon !important;
  color: white;
}
.my-button:hover {
  color: white;
}
</style>