<template>
  <div class="back">
    <navbar />
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
    <div v-if="id">
      <div class="card" id="padding">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-128x128">
                <img :src="`${image}`" alt="Placeholder image" />
              </figure>
            </div>
            <div class="media-content">
              <h8 id="cap" class="md:pl-2"> {{ title }}</h8>
              <p  v-if="imdb" class="white-color md:pl-2 md:pt-2">Rating : {{ imdb }}</p>
              <p class="md:pl-2 md:pt-2" v-if="directors"> Directors: {{ directors }}</p>
              <p class="md:pl-2 md:pt-2" v-if="writers">Writers: {{ writers }} </p>
              <p class="md:pl-2 md:pt-2" v-if="runtimeStr">{{ runtimeStr }} </p>
              <p class="md:pl-2 md:pt-2" v-if="releaseDate">{{ releaseDate }} </p>
              <br>
              <div v-if="!imdb">
                <br>
              </div>
              <b-button @click="watchTrailer()" type="my-button"
                ><i class="pi pi-play"></i>&nbsp;Watch Trailer</b-button
              >
              <div>
              <br>
              </div>
            <b-button @click="addWatchList()" class="my-button">
              <i class="pi pi-plus"></i>
                Watchlist
            </b-button>
            </div>
          </div>
          <br /><br />
        </div>
        <div class="heading pt-2 pb-2">Actors</div>
      <div class="columns is-multiline">
        <div
          v-for="actor in actorList"
          :key="actor.id"
          class="column is-one-third width"
        >
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img :src="`${actor.image}`" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="media-content">
                  <h8 v-if="actor.name" id="actor-name">
                    {{ actor.name }}</h8
                  >
                  <p v-if="actor.asCharacter" class="p-1">
                    as : {{ actor.asCharacter }}
                  </p>
                </div>
              </div>
              <br /><br />
            </div>
          </div>
        </div>
      </div>
      <div v-if="isReviews">
        <div class="heading pb-2">Reviews</div>
        <div class="card">
          <div class="card-content">
            <h3 id="cap">{{ reviews.title }}</h3>
            <h3 class="name">{{ reviews.username }}</h3>
            <h3 v-if="reviews.rate">Rating: {{ reviews.rate }}</h3>
            <br />
            <p v-if="!readMoreActivated">{{ reviews.content.slice(0, 300) }}</p>
            <p v-else>{{ reviews.content }}</p>
            <br />
            <b-button
              ref="btnToggle"
              @click="activateRead"
              type="is-primary is-light"
            >
              {{ buttonText }}
            </b-button>
            <br /><br />
          </div>
        </div>
      </div>
          <div class="heading pt-2 pb-2">SIMILAR MOVIES</div>
      <div class="columns is-multiline">
        <div
          v-for="similar in similars"
          :key="similar.id"
          class="column is-one-third width"
        >
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img :src="`${similar.image}`" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="media-content">
                  <h8 v-if="similar.title" id="actor-name">
                    {{ similar.title }}</h8
                  >
                  <p v-if="similar.imDbRating" class="p-1">
                    imDbRating : {{ similar.imDbRating }}
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
      id: this.$route.params.message,
      userId: "",
      reviews: [],
      title: "",
      image: this.$route.params.imageUrl,
      stars: this.$route.params.stars,
      genres: this.$route.params.genres,
      imdb: this.$route.params.imdb,
      directors:"",
      writers:"",
      runtimeStr: "",
      releaseDate:"",
      actorList: [],
      isLoading: true,
      key: "k_3vhqrt2c",
      readMoreActivated: false,
      buttonText: "Read More",
      isReviews: true,
      similars: []
    };
  },
  async created() {
    if (this.id === undefined) {
      let obj = this.$store.getters.getId;
      this.id = obj.id;
      this.image = obj.image;
      this.stars = obj.stars;
      this.genres = obj.genres;
      this.imdb = obj.imdb;
      this.directors = obj.directors,
      this.writers = obj.writers,
      this.runtimeStr = obj.runtimeStr,
      this.releaseDate = obj.releaseDate,
      this.actorList = obj.actorList,
      this.similars = obj.similars
    } else {
      const res1 = await axios.get(`https://imdb-api.com/en/API/Title/${this.key}/${this.id}`)
      console.log(res1.data)
      this.directors = res1.data.directors
      this.writers = res1.data.writers
      this.runtimeStr = res1.data.runtimeStr
      this.releaseDate = res1.data.releaseDate
      this.actorList = res1.data.actorList.slice(0,6)
      this.similars = res1.data.similars.slice(0,6)
      let obj = {
        id: this.id,
        image: this.image,
        stars: this.stars,
        genres: this.genres,
        imdb: this.imdb,
        directors: this.directors,
        writer: this.writers,
        runtimeStr: this.runtimeStr,
        releaseDate: this.releaseDate,
        actorList: this.actorList,
        similars : this.similars
      };
      this.$store.dispatch("saveId", obj);
    }
    try {
      this.isLoading = true;
      const res = await axios.get(
        `https://imdb-api.com/en/API/Reviews/${this.key}/${this.id}`
      );
      if(res.data.items.length === 0) {
        this.isReviews = false
        this.isLoading = false
      }
      else {
      this.reviews = res.data.items[0];
      this.title = res.data.fullTitle;
      this.isLoading = false;
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    activateRead() {
      this.readMoreActivated = !this.readMoreActivated;
      if (this.readMoreActivated) {
        this.buttonText = "Read Less";
      } else {
        this.buttonText = "Read More";
      }
    },
    watchTrailer() {
      this.$router.push({
        name: "trailer",
        params: {
          id: this.id,
        },
      });
    },
    async addWatchList() {
      if(this.$store.getters.userId !== "") {
      let obj = {
        id: this.id,
        title: this.title,
        userId: this.$store.getters.userId,
        image: this.image,
        stars: this.stars,
        genres: this.genres,
        imdb: this.imdb,
      }
      let res = await axios.post('user/addwatchlist' , obj)
      if(res.data === true) {
                this.$buefy.toast.open({
                    message: 'Movie Already Added to Watchlist',
                    type: 'is-warning'
                })
      }
      else{
                this.$buefy.toast.open({
                    message: 'Added to Watchlist Successfully',
                    type: 'is-success'
                })
      }
      }
      else {
                this.$buefy.toast.open({
                    message: 'Please Login to avail this feature',
                    type: 'is-warning'
                })
      }
    }
  },
};
</script>

<style scoped>
#cap {
  text-transform: capitalize;
  margin-top: 20px;
  font-size: 25px;
}
.my-button {
  background: maroon !important;
  color: white;
}
.my-button:hover {
  color: white;
}
.image {
  padding-top: 10px;
}
.name {
  font-size: 21px;
  font-weight: 600;
}
.heading {
  font-size: 30px;
  text-align: center;
  color: white;
}
.back {
  background: linear-gradient(
    90deg,
    #000000,
    #110302,
    #1c0505,
    #230807,
    #2a0a09,
    #32090c,
    #3b080e,
    #430510
  );
  min-height: 100vh;
}

.card-content {
  background: linear-gradient(
    90deg,
    #000000,
    #110302,
    #1c0505,
    #230807,
    #2a0a09,
    #32090c,
    #3b080e,
    #430510
  );
  color: white !important;
}
#actor-name {
  font-size: 20px;
}
#padding {
  padding-top: 5vh;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-bottom: 4vh;
}
.width {
  height: 300px;
}
</style>
