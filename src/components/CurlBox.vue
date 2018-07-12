<template>
  <div class="input-field">      
    <i class="material-icons prefix">mode_edit</i>
    <textarea name="args" id="args" cols="30" rows="10" v-model="args" class="materialize-textarea"></textarea>    
    <button class="waves-effect waves-light btn" @click="run">Run</button>
    <button class="waves-effect waves-light btn" @click="clean">Clean</button>    
    <div style="height: 200px; padding-top: 20px;">
      <JsonEditor editor-id="jsonEditor" :content="response"></JsonEditor>
    </div>
  </div>
</template>

<script>
import Curl from "./Curl";
import JsonEditor from "./JsonEditor";

export default {
  components: {
    JsonEditor
  },
  created() {
    this.curl = new Curl();
  },
  name: "CurlBox",
  data: function() {
    return {
      args:
        "-X GET -H 'Content-Type: application/json' -H 'Accept: application/json' -d '{\"json\": \"value\"}' https://reqres.in/api/users",
      response: ""
    };
  },
  methods: {
    run(event) {
      this.curl.call(this.args, json => (this.response = json));
    },
    clean(event) {
      this.response = " ";
    }
  }
};
</script>

<style>

</style>
