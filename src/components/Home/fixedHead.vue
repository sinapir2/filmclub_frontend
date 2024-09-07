<template>
  <nav class="xi-top-head">
    <div class="logo">
      <h1>Film Club</h1>
      <div id="goftinoAction" v-show="raychatOnline" @click="openRay">
      <span class="iconify" data-icon="bx:bx-help-circle"  data-width="25" data-height="25" id="goftinoIc"></span>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "navbar",
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
  background-color: var(--vs-navs);
  z-index: 9;
}
.logo{
  height:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right:1.5rem;
  padding-left:1.5rem;
}
.logo h1 {
  font-family: 'magic', sans-serif;
}
</style>