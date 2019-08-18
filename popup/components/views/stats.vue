<template>
  <!-- TODO: here shouldbe stats for each accounts (logged), and global statistics of the bot. Button for reset stats -->
  <main class="main main--statistics">
    <article class="statistics-box">
      <header class="statistics-box__header">Bot Stats:</header>

      <div class="statistics-box__content">
        <ul class="list" v-if="stats !== null">
          <li
            class="list__item"
            v-for="(stats_item, item_name) in stats.bot_stats"
            :key="stats_item.index"
          >{{removeUnderscore(item_name)}}: {{numberWithComma(stats_item)}}</li>
        </ul>
      </div>

      <button @click="resetStats" class="button">Reset Stats</button>

      <Chatters-gallery></Chatters-gallery>
    </article>
  </main>
</template>

<script>
import chattersGallery from "../Chatters-gallery.vue";

export default {
  components: { "Chatters-gallery": chattersGallery },

  data() {
    return {
      stats: null
    };
  },

  computed: {},

  methods: {
    removeUnderscore(item_name) {
      return item_name.replace(/_/g, " ");
    },

    numberWithComma(number) {
      return number.toLocaleString();
    },

    resetStats() {
      const clearStats = {
        delete_messages: 0,
        likes: 0,
        matches: 0,
        messages: 0
      };

      chrome.storage.sync.get(["bot_stats"], stats => {
        chrome.storage.sync.set({ bot_stats: clearStats });

        localStorage.setItem(
          "stats",
          JSON.stringify({ bot_stats: clearStats })
        );
      });

      this.stats.bot_stats = clearStats;
    }
  },

  created() {
    chrome.storage.sync.get(["bot_stats"], stats => {
      localStorage.setItem("stats", JSON.stringify(stats));
    });
  },

  beforeMount() {
    setTimeout(() => {
      this.stats = JSON.parse(localStorage.getItem("stats"));
    }, 100);
  }
};
</script>

<style lang="scss">
.main {
  &--statistics {
    max-width: 400px;
  }
}
</style>