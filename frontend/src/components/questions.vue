<template>
  <div class="bg">
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
    <div v-if="attemptedAll">
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
    </div>
    <div v-if="initial">
      <h1 class="header">Movie Recommendations System</h1>
      <p class="center">
        You can't decide between thousand of movies available for streaming?
      </p>
      <p class="center">Answer 3 questions and let us do the work!</p>
      <div class="text-align">
        <b-button @click="startQuestions()" type="my-button"
          >Start Now</b-button
        >
      </div>
    </div>
    <div v-if="firstq || secondq || thirdq">
      <div
        class="
          align-items-center
          flex
          justify-content-center
          align-center
        "
      >
        <div width="18em">
          <div class="card-body" v-if="firstq">
            <h1 class="q-text">
              1. Please choose any genre you're interested in.
            </h1>
            <br />
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Action"
                    class="white-color"
                    >Action</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Adventure"
                    class="white-color"
                    >Adventure</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Animation"
                    class="white-color"
                    >Animation</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Comedy"
                    class="white-color"
                    >Comedy</b-checkbox
                  >
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Fantasy"
                    class="white-color"
                    >Fantasy</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Crime"
                    class="white-color"
                    >Crime</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Drama"
                    class="white-color"
                    >Drama</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Family"
                    class="white-color"
                    >Family</b-checkbox
                  >
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Music"
                    class="white-color"
                    >Music</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Mystery"
                    class="white-color"
                    >Mystery</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Romance"
                    class="white-color"
                    >Romance</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="genreGroup"
                    native-value="Thriller"
                    class="white-color"
                    >Thriller</b-checkbox
                  >
                </b-field>
              </div>
            </div>
            <div class="text-align-2">
              <b-button @click="nextQuestion2()" type="next-button"
                >Next</b-button
              >
            </div>
            <br />
            <div v-if="showErrorMessage" class="text-align-2 white-color">
              Please select atleast 3 genre
            </div>
          </div>
          <div class="card-body" v-if="secondq">
            <h1 class="q-text">
              2. Please choose categories you're interested in.
            </h1>
            <br />
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="categories"
                    native-value="tv_movie"
                    class="white-color"
                    >Movies</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="categories"
                    native-value="tv_episode"
                    class="white-color"
                    >TV Episodes</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="categories"
                    native-value="tv_series"
                    class="white-color"
                    >TV Series</b-checkbox
                  >
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="categories"
                    native-value="tv_special"
                    class="white-color"
                    >TV Special</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="categories"
                    native-value="mini_series"
                    class="white-color"
                    >Mini-Series</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="categories"
                    native-value="music_vedio"
                    class="white-color"
                    >Music Vedio</b-checkbox
                  >
                </b-field>
              </div>
            </div>
            <div class="text-align-2">
              <b-button @click="nextQuestion3()" type="next-button"
                >Next</b-button
              >
            </div>
            <br />
            <div v-if="showErrorMessage2" class="text-align-2 white-color">
              Please select any category
            </div>
          </div>
          <div class="card-body" v-if="thirdq">
            <h1 class="q-text">3. which film production companies do you prefer?.</h1>
            <br />
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="groups"
                    native-value="fox"
                    class="white-color"
                    >20th Century Fox</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="groups"
                    native-value="columbia"
                    class="white-color"
                    >Sony</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="groups"
                    native-value="dreamworks"
                    class="white-color"
                    >DreamWorks</b-checkbox
                  >
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="groups"
                    native-value="universal"
                    class="white-color"
                    >Universal</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="groups"
                    native-value="disney"
                    class="white-color"
                    >Walt-Disney</b-checkbox
                  >
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox
                    v-model="groups"
                    native-value="warner"
                    class="white-color"
                    >Warner Bros</b-checkbox
                  >
                </b-field>
              </div>
            </div>
            <div class="text-align-2">
              <b-button @click="finish()" type="next-button">Next</b-button>
            </div>
            <br />
            <div v-if="showErrorMessage3" class="text-align-2 white-color">
              Please select any group
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      initial: true,
      firstq: false,
      secondq: false,
      thirdq: false,
      showErrorMessage: false,
      showErrorMessage2: false,
      showErrorMessage3: false,
      genreGroup: [],
      genreResults: [],
      categories: [],
      categoryResults: [],
      groups: [],
      groupResults: [],
      isLoading: false,
      attemptedAll: false,
      key: "k_wlnbltpp",
    };
  },
  methods: {
    startQuestions() {
      this.initial = false;
      this.firstq = true;
    },
    async nextQuestion2() {
      if (this.genreGroup.length < 3) {
        this.showErrorMessage = true;
      } else {
        this.isLoading = true;
        this.showErrorMessage = false;
        this.$store.dispatch("saveGenre", this.genreGroup);
        let params = {
          genres: this.genreGroup,
          userId: this.$store.getters.userId,
        };
        let res = await axios.post("/user/genres", params);
        console.log(res);
        let genres = this.genreGroup.toString()
        console.log(genres)
        let resp = await axios.get(
          `https://imdb-api.com/API/AdvancedSearch/${this.key}?genres=${genres}&count=9`
        );
        this.genreResults = resp.data.results;
        console.log(this.genreResults)
        this.isLoading = false;
        this.firstq = false;
        this.secondq = true;
        console.log(this.secondq, this.firstq);
      }
    },
    async nextQuestion3() {
      if (this.categories.length < 3) {
        this.showErrorMessage2 = true;
      } else {
        this.isLoading = true
        this.showErrorMessage2 = false;
        let params = {
          categories: this.categories,
          userId: this.$store.getters.userId,
        };
        console.log(this.categories);
        let res = await axios.post(
          "/user/categories",
          params
        );
        console.log(res);
        let categories = this.categories.toString()
        let resp = await axios.get(`https://imdb-api.com/API/AdvancedSearch/${this.key}?title_type=${categories}&count=9`)
        this.categoryResults = resp.data.results;
        this.isLoading = false
        this.secondq = false;
        this.thirdq = true;
      }
    },
    async finish() {
      if (this.groups.length === 0) {
        this.showErrorMessage3 = true;
      } else {
        this.isLoading = true
        this.showErrorMessage3 = false;
        let params = {
          groups: this.groups,
          userId: this.$store.getters.userId,
        };
        console.log(this.groups);
        console.log("helo")
        await axios.post("/user/groups", params);
        let groups = this.groups.toString();
        const resp = await axios.get(`https://imdb-api.com/API/AdvancedSearch/${this.key}?groups=${groups}&count=9`)
        this.groupResults = resp.data.results
         await axios.post("/user/setrecommended", params);
        console.log(this.groupResults)
        console.log(this.categoryResults)
        console.log(this.genreResults)
        this.isLoading = false
        this.thirdq = false;
        this.attemptedAll = true;
      }
    },
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
  },
};
</script>

<style scoped>
.back {
  min-height: 100vh;
  width: 100vw;
  background: rgba(0,0,0)
}
.white-color {
  color: white;
}
.header {
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  padding: 20px;
  color: white;
  padding-top: 25vh;
  padding-right: 4vw;
}
.center {
  margin: 10px;
  text-align: center;
  color: white;
  padding-right: 4vw;
}
.q-text {
  color: white;
  text-align: center !important;
  font-size: 16px;
}
.q-text:hover {
  color: white;
}
.text-align {
  text-align: center;
  padding-right: 4vw;
  margin-top: 5vh;
}
.text-align-2 {
  text-align: center;
}
.question {
  color: white;
}
.card {
  border-radius: 0.8;
}
.card-body {
  padding: 15px;
}
.align-center {
  min-height: calc(100vh - 10px) !important;
}
.align-text {
  text-align: center;
  color: rgb(241, 234, 234);
  padding: 1px;
  font-size: 1.5em;
}

.radio:hover,
.checkbox:hover {
  color: white !important;
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
.card-content {
      background: linear-gradient(90deg, #000000, #110302, #1c0505, #230807, #2a0a09, #32090c, #3b080e, #430510);
      color: white;
}
#cap {
 font-size: 22px;
 font-weight: 600;
}
.card {
  cursor: pointer;
}
</style>
