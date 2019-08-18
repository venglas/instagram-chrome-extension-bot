<template>
  <footer class="footer">
    <div class="footer__box">
      version:
      <span class="bold">{{botVersion}}</span>
    </div>
  </footer>
</template>

<script>
import { version } from "../main.js";

export default {
  data() {
    return {
      botVersion: version
    };
  },

  methods: {},

  watch: {},

  created() {
    // this.botVersion = version;
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.footer {
  color: rgba($violet, 0.5);
  font-size: 10px;

  &__box {
    text-align: right;

    .bold {
      font-weight: bold;
    }
  }
}
</style>