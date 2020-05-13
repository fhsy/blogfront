<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}
#app {
  height: 100%;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.shuxian {
  background-color: rgb(139, 139, 139);
  height: 50px;
  width: 1px;
}
.hengxian {
  background-color: rgb(218, 218, 218);
  height: 1px;
  width: 100%;
}
</style>
