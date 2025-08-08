<template>
  <div class="home bodyMargin">
    <fixedHead/>
    <vs-dialog v-model="showAd" not-padding auto-width blur>
      <router-link to="/MyList">
      <img src="@/assets/download.jpg" alt="download from filmclub" style="width: 100%; max-width: 400px; border-radius: 30px;">
      </router-link>
    </vs-dialog>
    <vs-dialog v-model="showDownloadApp" not-padding auto-width blur>
      <a href="https://dl.filmclub.top">
        <img src="@/assets/androidApp.jpg" alt="download filmcclub android app" style="width: 100%; max-width: 400px; border-radius: 30px;">
      </a>
    </vs-dialog>
    <vs-row style="margin-top:3rem;">
      <vs-col lg="6">
        <Notifications v-if="!isMobile" :position="position"/>
      </vs-col>
      <vs-col lg="6" sm="12" xs="12">
        <posts/>
      </vs-col>
    </vs-row>
    <p style="margin-bottom: 30px; opacity: 0.1; font-size:15px;">end of content ...</p>
  </div>
</template>

<script>
import fixedHead from "../components/Home/fixedHead";
import singlePost from '../components/Home/singlePost'
import Notifications from "./Notifications";
export default {
  name: 'Home',
  components: {posts: singlePost, fixedHead, Notifications},
  data() {
    return {
      images: [],
      isMobile: true,
      position: {
        position: 'fixed',
        top: '3rem',
        maxWidth: '550px'
      },
      showAd:false,
      showDownloadApp: false
    }
  },
  created() {
    this.$store.commit('changeErrMsg', null)
    if (window.innerWidth >= 1000) {
      this.isMobile = false
    }
    this.$store.commit('toggleNavbar', true);
  },
  mounted() {
    this.$store.dispatch('getUserProfile').then(() => {
      this.$store.dispatch('getNotificationList')
    })
    if(!localStorage.getItem('advertise')){
      this.showAd=true
      localStorage.setItem('advertise', '01')
    }
    else if(!localStorage.getItem('androidApplication')) {
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        this.showDownloadApp = true
        localStorage.setItem('androidApplication', '01')
      }
    }

  }
}
</script>
<style scoped>
.home {
  margin-top: 1.5rem;
}

</style>
<style scoped>

</style>
