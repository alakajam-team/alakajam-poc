import * as bsn from "../../node_modules/bootstrap.native/dist/bootstrap-native-v4";

import Vue from "vue";

new Vue({
  el: "#app",
  delimiters: ["${", "}"],
  data: {
    siteName: "Alakajam!",
  },
  created: function initBootstrap() {
    this.$nextTick(() => {
      new bsn.Carousel(document.getElementById("carousel"));
    });
  }
});
