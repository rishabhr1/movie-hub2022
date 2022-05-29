<template>
<div>
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
  <div v-if="loaded" class="back">
    <navbar />
    <br>
    <form  v-on:submit.prevent="request">
      <b-field class="centerme">
        <b-input
          placeholder="Search..."
          class="searchbox"
          type="search"
          icon-pack="fas"
          icon="search"
          v-model="searchText"
        >
        </b-input>
      </b-field>
    </form>
      <div class="columns is-multiline">
        <div
          v-for="g in results"
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
                  <h2 v-if="g.title" id="cap">
                    {{ g.title }}</h2
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
      searchText: "",
      previousText: this.$route.params.message,
      results: [],
      selectedId: "",
      isLoading: true,
      key: "k_3vhqrt2c",
      loaded: false
    };
  },
  async created() {
    try {
      this.isLoading = true;
      if (this.$store.getters.searchText !== "") {
        let text = this.$store.getters.searchText;
        console.log(text);
        const res = await axios.get(
          `https://imdb-api.com/API/AdvancedSearch/${this.key}/?title=${text}&count=20`
        );
        this.results = res.data.results;
        this.loaded = true
        this.isLoading = false;
      } else {
        this.isLoading = true;
        const res = await axios.get(
          `https://imdb-api.com/API/AdvancedSearch/${this.key}/?title=${this.previousText}&count=20`
        );
        this.results = res.data.results;
        this.loaded = true
        this.isLoading = false;
        this.$store.dispatch("saveText", this.previousText);
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async request() {
      try {
        this.isLoading = true;
        const res = await axios.get(
          `https://imdb-api.com/API/AdvancedSearch/${this.key}/?title=${this.searchText}&count=20`
        );
        this.results = res.data.results;
        this.isLoading = false;
        this.$store.dispatch("saveText", this.searchText);
        console.log(this.results);
      } catch (err) {
        console.log(err);
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
#background {
  background-color: rgb(10, 188, 233) !important;
}
.searchbox {
  width: 80vw;
  margin-left: 10vw;
  margin-right: 10vw;
}

.media-content {
  margin-top: 5vh !important;
}
.bold {
  font-weight: 600;
  color: blue;
}
.back {
  background: rgba(0,0,0);
}
.card {
  cursor: pointer;
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
</style>
