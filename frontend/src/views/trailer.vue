<template>
<div>
    <navbar />
    <div class="background flex align-items-center justify-content-center">
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
<iframe v-if="!notfound" :src="link" width="480" height="270" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" frameborder="no" scrolling="no"></iframe>
    <div class="error-message" v-else>
            <div class="card log-card">
                <div class="card-content">
                    <div class="content">
                      <div class="message-error">Trailer not found</div>
                    </div>
                </div>
            </div>
    </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import navbar from '../components/navbar.vue'
export default {
    components: {
        navbar,
    },
    data() {
        return {
            id: this.$route.params.id,
            link: "",
            key:"k_3vhqrt2c",
            isLoading: true,
            notfound: false
        }
    },
    async created() {
        console.log(this.$store.getters.getId)
        if(this.id === undefined) {
            this.link = this.$store.getters.getLink
            this.isLoading = false
        }
        else {
        let res = await axios.get(`https://imdb-api.com/en/API/Trailer/${this.key}/${this.id}`)
        this.isLoading = false
        console.log(res)
        if(res.data.linkEmbed === null) {
            this.notfound = true
        }
        else {
        this.link = res.data.linkEmbed + "?autoplay=false&width=420"
        let link = this.link
        this.$store.dispatch("saveLink", link)
        }
        }
    }
}
</script>

<style scoped>
.background {
      background: linear-gradient(90deg, #000000, #110302, #1c0505, #230807, #2a0a09, #32090c, #3b080e, #430510);
      height: 100vh;
      width: 100vw;
}
.embed {
    width: 100vw;
    height: 100vh;
}
.message-error {
  color: white !important;
}
.card-content {
      background: linear-gradient(90deg, #000000, #110302, #1c0505, #230807, #2a0a09, #32090c, #3b080e, #430510);
      color: white;
}
</style>