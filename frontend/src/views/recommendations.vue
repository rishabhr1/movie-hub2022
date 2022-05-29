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
                      <div class="message-error">Please Login To get Recommendations</div>
                    </div>
                </div>
            </div>
    </div>
    <div v-else-if ="!isrecommended">
        <questions />
    </div>
    <div v-else-if ="isrecommended">
      <br>
      <div class="columns is-multiline">
        <div
          v-for="g in genreResults"
          :key="g.index"
          class="column is-one-third"
        >
          <div class="card">
            <div class="card-content" @click="redirect(g)">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img :src="`${g.image}`" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="media-content">
                  <h8 v-if="g.title" id="cap">
                    {{ g.title }}</h8
                  >
                  <p v-if="g.imDbRating">
                    Rating : {{ g.imDbRating }}
                  </p>
                </div>
              </div>
              <br /><br />
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div
          v-for="c in categoryResults"
          :key="c.index"
          class="column is-one-third"
        >
          <div class="card">
            <div class="card-content" @click="redirect(c)">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img :src="`${c.image}`" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="media-content">
                  <h8 v-if="c.title" id="cap">
                    Title : {{ c.title }}</h8
                  >
                  <p v-if="c.imDbRating">
                    Rating : {{ c.imDbRating }}
                  </p>
                </div>
              </div>
              <br /><br />
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div
          v-for="g in groupResults"
          :key="g.index"
          class="column is-one-third"
        >
          <div class="card">
            <div class="card-content" @click="redirect(g)">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img :src="`${g.image}`" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="media-content">
                  <h8 v-if="g.title" id="cap">
                    Title : {{ g.title }}</h8
                  >
                  <p v-if="g.imDbRating">
                    Rating : {{ g.imDbRating }}
                  </p>
                </div>
              </div>
              <br /><br />
            </div>
          </div>
        </div>
      </div>
      <div v-if="loaded" class="center-align-button">
              <b-button @click="reRecommend()" type="is-primary is-light"
                >Recommend Again</b-button
              >  
      </div>
              <br>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar";
import questions from "../components/questions.vue"
import axios from "axios";
export default {
  components: {
    navbar,
    questions
  },
  data() {
    return {
      loggedIn: false,
      isrecommended: true,
      isLoading: false,
      genreResults: [],
      categoryResults: [],
      groupResults: [],
      loaded: false,
      key: "k_n3nf7o7c"
    };
  },
  async created() {
    this.loggedIn = this.$store.getters.loggedIn;
    let id = this.$store.getters.userId
    const param = {
      userId: id
    }
    if(param.userId !== null) {
      this.isLoading = false
    let res = await axios.post('/user/isrecommended', param)
    console.log(res)
    if(res.data === "false") {
        this.isrecommended = false;
    }
    else {
        this.isrecommended = true
        this.isLoading = true
        let userObject = await axios.post('/user/retrieveall', param)
        let genres = userObject.data['genres'].toString();
        let res1 = await axios.get(`https://imdb-api.com/API/AdvancedSearch/${this.key}?genres=${genres}&count=9`)
        this.genreResults = res1.data.results
        console.log(res1)
        this.isLoading = false
        let categories = userObject.data['categories'].toString();
        let res2 = await axios.get(`https://imdb-api.com/API/AdvancedSearch/${this.key}?title_type=${categories}&count=9`)
        this.categoryResults = res2.data.results
        let groups = userObject.data['groups'].toString();
        const res3 = await axios.get(`https://imdb-api.com/API/AdvancedSearch/${this.key}?groups=${groups}&count=9`)
        this.groupResults = res3.data.results
        this.loaded = true
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
    reRecommend() {
      this.isrecommended = false
    },
    login() {
      this.$router.push({ name: "login"})
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
  color: blue;
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
</style>
