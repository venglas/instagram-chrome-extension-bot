<template>
  <div id="app" v-cloak>
    <router></router>
    <App-footer></App-footer>
  </div>
</template>

<script>
import router from "./components/views/router.vue";
import appFooter from "./components/App-footer.vue";

export default {
  components: { Router: router, "App-footer": appFooter },
  data() {
    return {};
  }
};
</script>
