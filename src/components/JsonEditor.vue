<template>
  <div :id="editorId" style="width: 100%; height: 100%;"></div>
</template>
<script>
import * as ace from "brace";
import "brace/mode/json";
import "brace/theme/github";

export default {
  props: ["editorId", "content", "theme"],
  name: "JsonEditor",
  data() {
    return {
      editor: Object,
      beforeContent: ""
    };
  },
  watch: {
    content(value) {
      if (this.beforeContent !== value) {
        //this.editor.setValue(value, 1);
        if (value) {
          var json = JSON.stringify(JSON.parse(value), null, 4);
          this.editor.setValue(json, 1);
        }
      }
    }
  },
  mounted() {
    const lang = "json";
    const theme = this.theme || "github";

    this.editor = window.ace.edit(this.editorId);
    //this.editor.setValue(JSON.stringify(JSON.parse(this.content), null, 4), 1);
    //alert(JSON.stringify(JSON.parse(this.content)), null, "\t");
    if (this.content) {
      var json = JSON.stringify(JSON.parse(this.content), null, 4);
      this.editor.setValue(json, 1);
    }

    this.editor.getSession().setMode(`ace/mode/${lang}`);
    //this.editor.setOptions({ readOnly: true, maxLines: Infinity });
    this.editor.setTheme(`ace/theme/${theme}`);
    this.editor.setShowPrintMargin(false);

    this.editor.on("change", () => {
      this.beforeContent = this.editor.getValue();
      this.$emit("change-content", this.editor.getValue());
    });
  }
};
</script>
