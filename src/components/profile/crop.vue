<template>
  <div v-show="firstShow" id="cropContainer">
    <div class="header">
      <div @click="$emit('close')">
        <i id="close" class="iconify" data-icon="mdi:close"></i>
      </div>
      <div @click="sendImage">
        <i id="check" class="iconify" data-icon="mdi:check"></i>
      </div>
      <div id="croppaImage">
        <Cropper
          class="cropper"
          :src="previewUrl"
          :stencil-props="stencilProps"
          :debounce="100"
          @change="onChange"
          @ready="onReady"
        />
        <input ref="file" accept="image/*" type="file" class="hidden" @change="onFileChange" />
      </div>
    </div>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'

export default {
  name: 'crop',
  components: { Cropper },
  props: {
    location: { type: String, required: true }
  },
  data() {
    return {
      firstShow: true,
      isValid: false,
      previewUrl: null,
      lastCanvas: null
    }
  },
  computed: {
    browserWidth() {
      if (this.location === 'header') {
        return 0.85 * window.innerWidth
      } else {
        return 250
      }
    },
    stencilProps() {
      return this.location === 'header'
        ? { aspectRatio: this.browserWidth / 100 }
        : { aspectRatio: 1 }
    }
  },
  mounted() {
    this.$refs.file.click()
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      if (!file) return
      this.previewUrl = URL.createObjectURL(file)
    },
    onReady({ canvas }) {
      this.lastCanvas = canvas
    },
    onChange({ canvas }) {
      this.lastCanvas = canvas
      this.isValid = !!canvas
    },
    sendImage() {
      if (!this.isValid || !this.lastCanvas) return
      this.$emit('profileChange')
      this.firstShow = false
      this.lastCanvas.toBlob((blob) => {
        if (!blob) return
        const formData = new FormData()
        formData.append(this.location, blob, 'profile.jpg')
        const imageInfo = { image: formData, location: this.location }
        this.$store.dispatch('updateProfilePhoto', imageInfo)
          .then(() => { this.$emit('profileChange'); this.$emit('close') })
          .catch(() => { this.$emit('profileChange'); this.$emit('close') })
      }, 'image/jpeg', 0.7)
    }
  }
}
</script>

<style scoped>
#cropContainer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  background-color: var(--vs-mainback);
  width: 100%;
  height: 100vh;
  padding-top: 1rem;
  padding-right: 2rem;
  padding-left: 2rem;
  box-sizing: border-box;
}
.header {
  font-size: 30px;
}

#close {
  text-align: left;
  float: left;
}

#check {
  text-align: right;
  float: right;
}

#croppaImage {
  margin-top: 25vh;
}

.hidden { display: none; }
.cropper { max-width: 100%; }
</style>