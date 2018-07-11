<template>
  <div class="row" id="app">
    <div class="col s1"></div>
    <div class="col s10">
      <TextBox/>
    </div>
    <div class="col s1"></div>
  </div>  
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import TextBox from "./components/TextBox";

export default {
  name: "App",
  components: {
    HelloWorld,
    TextBox
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
