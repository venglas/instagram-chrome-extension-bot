<template>
  <Show-more buttonText="Show chatters">
    <div v-if="profiles != null" class="chatters">
      <div class="single-profile" v-for="(profile, index) in profiles" :key="index">
        <div class="single-profile__img-holder">
          <img :src="profile.img" class="img">
        </div>

        <div class="single-profile__overlap">
          <h3>{{profile.userName}} {{profile.userAge}}</h3>
          <button
            class="button button--wiev-profile"
            @click="openProfile(profile.profileLink)"
          >View Profile</button>
        </div>
      </div>
    </div>
  </Show-more>
</template>

<script>
import uniqBy from "lodash.uniqby";
import showMore from "./Show-more.vue";

export default {
  components: { "Show-more": showMore },

  data: {
    profiles: null
  },

  computed: {},

  methods: {
    openProfile(profile) {
      chrome.tabs.create({ url: `https://badoo.com${profile}` });
    },

    filteredChatters() {
      const chatters = JSON.parse(localStorage.getItem("chatters"));
      const filteredChatters = uniqBy(chatters.chatters, "img");

      return filteredChatters;
    },

    clearChatters() {
      const vm = this;

      chrome.storage.sync.get(["chatters"], data => {
        data.chatters = vm.filteredChatters();
        chrome.storage.sync.set(data);
      });
    }
  },

  created() {
    chrome.storage.sync.get(["chatters"], data => {
      localStorage.setItem("chatters", JSON.stringify(data));
    });
  },

  beforeMount() {
    this.profiles = this.filteredChatters(); // clear array

    this.clearChatters();
  }
};
</script>

<style lang="scss" scoped>
.chatters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .single-profile {
    width: 100px;
    height: 100px;
    margin: 10px;
    position: relative;
    z-index: 0;

    &__img-holder {
      .img {
        width: 100%;
      }
    }

    &__overlap {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.6);
      text-align: center;
      height: 100%;
      width: 100%;
      opacity: 0;
      transition: opacity ease-in-out 400ms;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>