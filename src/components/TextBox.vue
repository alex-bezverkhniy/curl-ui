<template>
  <div class="input-field">      
    <i class="material-icons prefix">mode_edit</i>
    <textarea name="args" id="args" cols="30" rows="10" v-model="args" class="materialize-textarea"></textarea>    
    <button class="waves-effect waves-light btn" v-on:click="run">Run</button>
    <div>{{ response }}</div>
  </div>
</template>

<script>
import Curl from "./Curl";

export default {
  created() {
    this.curl = new Curl();
  },
  name: "TextBox",
  data: function() {
    return {
      args:
        "-X GET -H 'Content-Type: application/json' -H 'Accept: application/json' -d '{\"json\": \"value\"}' https://reqres.in/api/users",
      response: ""
    };
  },
  methods: {
    run: function(event) {
      this.response = this.curl.call(this.args);
    }
  }
};
</script>

<style>

</style>
