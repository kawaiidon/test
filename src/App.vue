<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '/assets/styles/reset.scss';
@import '/assets/styles/ui.scss';
#app {
  height: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  line-height: 1.4;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body, html{
  height: 100%;
}
</style>
