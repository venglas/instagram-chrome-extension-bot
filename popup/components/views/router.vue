<template>
  <div>
    <Main-header></Main-header>

    <transition name="fade">
      <component v-bind:is="activeView"></component>
    </transition>
  </div>
</template>

<script>
import mainHeader from "../Main-header.vue";

import start from "../views/start.vue";
import stats from "../views/stats.vue";
import login from "../views/login.vue";
import register from "../views/register.vue";

import { eventBus } from "../../main.js";

export default {
  components: {
    "Main-header": mainHeader,
    Start: start,
    Stats: stats,
    Login: login,
    Register: register
  },
  data() {
    return {
      activeView: "Start"
    };
  },

  methods: {},

  created() {
    eventBus.$on("setView", view => {
      this.activeView = view;
    });
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/animations.scss";
</style>