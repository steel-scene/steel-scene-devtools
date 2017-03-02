<template>
  <div id="#app">
    <address-bar 
      :src="targetUrl" 
      @navigate="updateUrl">
    </address-bar>
    <view-port 
      :src="targetUrl" 
      :shouldrefresh="shouldRefresh" 
      @refresh-finished="onRefreshFinished">
    </view-port>
  </div>
</template>

<script>
  import AddressBar from './components/AddressBar'
  import ViewPort from './components/ViewPort'

  export default {
    components: {
      AddressBar,
      ViewPort
    },
    data () {
      return {
        shouldRefresh: false,
        targetUrl: 'http://notoriousb1t.com'
      }
    },
    methods: {
      updateUrl (src) {
        this.$data.targetUrl = src
        this.refreshViewPort()
      },
      onRefreshFinished () {
        this.$data.shouldRefresh = false
      },
      refreshViewPort () {
        this.$data.shouldRefresh = true
      }
    }
  }

</script>

<style>
  
  /* css variables */
  :root {
    --primary-fg-color: steelblue;
    --primary-bg-color: white;
    --primary-border-color: black;
  }
  button {
    --primary-fg-color: white;
    --primary-bg-color: steelblue;
    --primary-border-color: black;
  }

  /* devanagari */
  
  @font-face {
    font-family: 'Hind';
    font-style: normal;
    font-weight: 400;
    src: local('Hind'), local('Hind-Regular'), url(https://fonts.gstatic.com/s/hind/v6/PweUV6zQOwbea1HTWD9UxRTbgVql8nDJpwnrE27mub0.woff2) format('woff2');
    unicode-range: U+02BC, U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200B-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
  }
  /* latin-ext */
  
  @font-face {
    font-family: 'Hind';
    font-style: normal;
    font-weight: 400;
    src: local('Hind'), local('Hind-Regular'), url(https://fonts.gstatic.com/s/hind/v6/_nGZcTICJK7Og5TmI2ZPqxTbgVql8nDJpwnrE27mub0.woff2) format('woff2');
    unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  
  @font-face {
    font-family: 'Hind';
    font-style: normal;
    font-weight: 400;
    src: local('Hind'), local('Hind-Regular'), url(https://fonts.gstatic.com/s/hind/v6/Pmrg92KFJKj-hq44c2dqpvesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
  }
  
  * {
    margin: 0;
    padding: 0;
  }
  
  html,
  body {
    height: 100%;
    font-family: Hind;
    background-color: var(--primary-bg-color);
    color: var(--primary-fg-color);
  }

</style>
