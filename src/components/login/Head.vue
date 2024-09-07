<template>
  <nav class="xi-top-head">
    <div class="logo">
      <h1>Film Club</h1>
    </div>
    <div class="filmSupport" id="goftinoAction" v-show="raychatOnline" @click="openRay">
    </div>
  </nav>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Head",
  computed:{
    ...mapState(['raychatOnline'])
  },
  methods:{
    openRay(){
      window.Goftino.toggle()
    }
  }
}
</script>

<style scoped>
.xi-top-head {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: #1e2023;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  z-index: 99;
}

.logo h1 {
  font-family: magic, sans-serif;
  margin-top: 30px;
}
.filmSupport{
  position:fixed;
  bottom:2rem;
  right:1rem;
  background-image: url('https://filmclub.top/img/icons/maskable_icon_x512.png');
  width:55px;
  height: 55px;
  border-radius: 50%;
  background-position: center;
  background-size:65px;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>