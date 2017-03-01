<template>
  <div class="view-port">
    <div v-show="message">
      {{message}}
    </div>
    <iframe v-show="!message" />
  </div>
</template>

<script>
  export default {
    props: ['src', 'shouldrefresh'],
    watch: {
      shouldrefresh (val) {
        if (val) {
          this.$data.message = ''

          const iframe = this.$el.querySelector('iframe')
          iframe.setAttribute('src', this.src)

          iframe.onload = (evt) => { }
          iframe.onerror = () => {
            this.$data.message = 'Could not load frame'
          }

          this.$emit('refresh-finished')
        }
      }
    },
    data () {
      return {
        message: ''
      }
    }
  }

</script>

<style scoped>
  .view-port iframe {
    width: 100%;
    height: calc(100vh - 50px);
  }
</style>
