<template>
  <article class="like-bot bottom-line">
    <header class="header">
      <h3>Like bot</h3>
    </header>

    <div>
      <div class="like-bot__speed">
        <span @click="set_like_speed(25)">Slow</span>
        <span @click="set_like_speed(50)">Medium</span>
        <span @click="set_like_speed(100)">Fast</span>
      </div>

      <div class="like-bot__progress-bar" @click="set_like_speed_from_progress" ref="progress">
        <!-- //TODO: this should be another component -->
        <div class="value" :style="{'width': like_bot.speed + '%'}"></div>
      </div>
    </div>

    <div class="box">
      <button
        class="button"
        :class="{ button_active: like_bot.isStart }"
        @click="toggle_liking"
      >{{like_bot.isStart === true ? 'Stop' : 'Start'}}</button>
    </div>

    <Show-more buttonText="Show More Options">
      <div>
        <form>
          <input type="checkbox" id="searchBy" v-model="like_bot.searchBy">
          <label for="searchBy">Search by keywords</label>

          <template v-if="like_bot.searchBy" class="option">
            <textarea class="textarea textarea--keywords" v-model="like_bot.keywords"></textarea>

            <ul class="list">
              <li
                class="list__item"
              >Keywords should be separated by comma like: beauty, blonde, smile</li>
              <li class="list__item">keywords are searching in users bio</li>
            </ul>
          </template>
        </form>
      </div>
    </Show-more>
  </article>
</template>

<script>
import { eventBus } from "../main.js";
import showMore from "./Show-more.vue";

export default {
  components: { "Show-more": showMore },

  data() {
    return {
      like_bot: {
        isStart: false,
        speed:
          localStorage.getItem("bot_like_speed") !== null
            ? parseInt(localStorage.getItem("bot_like_speed"))
            : 100,
        searchBy: false,
        keywords: ""
      }
    };
  },

  methods: {
    set_like_speed(speed) {
      if (speed < 100) {
        this.like_bot.speed = speed;
      } else {
        this.like_bot.speed = 100;
      }

      localStorage.setItem("bot_like_speed", speed);
      eventBus.sendMessageToContentScript("set_like_speed", speed);

      if (this.like_bot.isStart) {
        eventBus.sendMessageToContentScript("stop_liking");
        eventBus.sendMessageToContentScript("start_liking");
      }
    },

    toggle_liking() {
      if (this.like_bot.isStart === false) {
        eventBus.sendMessageToContentScript("start_liking");
        this.like_bot.isStart = true;

        chrome.storage.sync.get(["like_bot"], data => {
          data.like_bot.isStart = true;

          chrome.storage.sync.set(data);
        });
      } else {
        eventBus.sendMessageToContentScript("stop_liking");
        this.like_bot.isStart = false;

        chrome.storage.sync.get(["like_bot"], data => {
          data.like_bot.isStart = false;

          chrome.storage.sync.set(data);
        });
      }
    },

    set_like_speed_from_progress(e) {
      const speed = Math.round(
        (e.clientX / this.$refs.progress.offsetWidth) * 100 - 10,
        2
      );

      this.set_like_speed(speed);
      this.eventBus.sendMessageToContentScript("set_like_speed", speed);
    }
  },

  watch: {
    "like_bot.searchBy": function() {
      const vm = this;
      chrome.storage.sync.get(["like_bot"], data => {
        data.like_bot.searchBy = vm.like_bot.searchBy;

        chrome.storage.sync.set(data);
      });
    },

    "like_bot.keywords": function() {
      const vm = this;

      chrome.storage.sync.get(["like_bot"], data => {
        data.like_bot.keywords = vm.like_bot.keywords;

        chrome.storage.sync.set(data);
      });
    }
  },

  created() {
    const vm = this;

    chrome.storage.sync.get(["like_bot"], data => {
      if (data.like_bot === undefined) {
        chrome.storage.sync.set({
          like_bot: {
            isStart: false,
            searchBy: false,
            keywords: ""
          }
        });
      } else {
        vm.like_bot.isStart = data.like_bot.isStart;
        vm.like_bot.searchBy = data.like_bot.searchBy;
        vm.like_bot.keywords = data.like_bot.keywords;
      }
    });
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/helpers.scss";
@import "../assets/scss/animations.scss";

.like-bot {
  &__speed {
    display: flex;
    justify-content: space-between;

    span {
      cursor: pointer;
    }
  }

  &__progress-bar {
    margin: 5px 0;
    width: 100%;
    height: 5px;
    border: 1px solid rgba($blue, 0.1);
    border-radius: 15px;
    cursor: pointer;

    .value {
      width: 50%;
      height: 5px;
      border-radius: 15px;
      background-color: $blue;
      transition: width ease-in 200ms;
    }
  }

  .textarea {
    &--keywords {
      width: 100%;
      height: 50px;
      margin-top: 10px;
    }
  }
}
</style>