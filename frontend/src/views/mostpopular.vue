<template>
  <div class="bg">
    <navbar />
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
    <br>
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
      results: [],
      isLoading: true,
      key: "k_3vhqrt2c",
    };
  },
  async created() {
    try {
      this.isLoading = true;
      const res = await axios.get(
        `https://imdb-api.com/en/API/MostPopularMovies/${this.key}`
      );
      this.results = res.data.items;
      this.isLoading = false;
      console.log(this.results);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    redirect(result) {
      if(result.imDbRating) {
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
    } 
    }
  },
};
</script>

<style scoped>
.card-content {
background: linear-gradient(90deg, #000000, #110302, #1c0505, #230807, #2a0a09, #32090c, #3b080e, #430510);
  color: white !important;
}
.bg {
 background: rgba(0,0,0) !important;
}
.bold {
  font-weight: 600;
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
.card {
  cursor: pointer;
}
#cap {
 font-size: 22px;
 font-weight: 600;
}
</style>
