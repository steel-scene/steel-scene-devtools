<template>
  <div class="address-bar">
    <div class="address-label">
      &gt;
    </div>
    <div class="address-input">
      <input type="url" v-model="url" />
    </div>
    <div class="address-action">
      <button @click="go">GO</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['src'],
    methods: {
      go () {
        this.$emit('navigate', this.url)
      }
    },
    data () {
      return {
        url: this.src
      }
    }
  }

</script>

<style scoped>
  .address-bar {
    display: flex;
    justify-content: space-around;
    border-bottom: solid thin gray;
  }
  
  .address-label {
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
    padding: 5px;
  }
  
  .address-action {
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
  }
  
  .address-action > button {
    background-image: none;
    border-radius: 0;
    padding: 5px 10px;
    height: 100%;
    border: solid thin var(--primary-border-color);
    background-color: var(--primary-bg-color);
    color: var(--primary-fg-color);
    cursor: pointer;
  }
  
  .address-input {
    flex-basis: 100%;
    flex-shrink: 1;
    flex-grow: 1;
  }
  
  .address-input > input[type="url"] {
    border: none;
    outline: none;
    padding: 10px;
    line-height: 100%;
    width: 100%;
  }
</style>
