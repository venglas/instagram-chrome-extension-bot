<template>
  <div>
    <template v-if="first_settings">
      <main class="main main--popup">
        <Set-your-name></Set-your-name>

        <Like-bot></Like-bot>

        <Message-bot></Message-bot>
      </main>
    </template>

    <template v-else>
      <!-- TODO: should be a single component -->
      <h3 class="medium-space">Before use bot you must configurate your badoo profile.</h3>

      <hr />

      <p class="medium-space">
        Go to your profile and click this button.
        <button
          @click="set_correct_settings"
          class="button"
        >Set correct setting</button>
      </p>

      <hr />

      <p class="medium-space">And set your language to English (United States) and save.</p>
    </template>
  </div>
</template>

<script>
import setYourName from "../Set-your-name.vue";
import likeBot from "../Like-bot.vue";
import messageBot from "../Message-bot.vue";
import { eventBus } from "../../main.js";

export default {
  components: {
    "Set-your-name": setYourName,
    "Like-bot": likeBot,
    "Message-bot": messageBot
  },
  data() {
    return {
      first_settings: true
    };
  },
  methods: {
    set_correct_settings() {
      eventBus.sendMessageToContentScript("set_correct_settings");
    }
  },

  created() {
    const set_interface = () => {
      chrome.storage.sync.get(["first_login_status"], status => {
        this.first_settings = status.first_login_status;
      });
    };

    set_interface();
  },

  mounted() {},
  destroyed() {}
};
</script>

<style lang="scss">
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/base.scss";
@import "../../assets/scss/helpers.scss";
</style>