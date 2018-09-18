import "jquery";
import "popper.js";
import "bootstrap";

import Vue from "vue";

new Vue({
  el: "#app",
  delimiters: ["${", "}"],
  data: {
    siteName: "Alakajam!",
  },
});
