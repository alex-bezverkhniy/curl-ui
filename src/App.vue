<template>
  <div class="row" id="app">
    <div class="col s1"></div>
    <div class="col s10">
      <CurlBox/>
    </div>
    <div class="col s1"></div>
  </div>  
</template>

<script>
import CurlBox from "./components/CurlBox";

export default {
  name: "App",
  components: {
    CurlBox
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
