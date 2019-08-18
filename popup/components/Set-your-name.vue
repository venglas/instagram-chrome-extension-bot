<template>
  <article class="set-name">
    <template v-if="$store.state.show_name_setter" class="test">
      <h4>Set your name*.</h4>

      <p class="small-info">* Name should be same as your profile name for proper bot operation</p>
      <input type="text" class="input-text" v-model="user_name">
      <button class="button" @click="hideNameSetter(), save_user_name()">save</button>
    </template>

    <template v-else>
      <button class="button button--transparent" @click="showNameSetter">
        change Name
        <img :src="downArrow" class="img">
      </button>
    </template>
  </article>
</template>

<script>
export default {
  data() {
    return {
      user_name: "",
      downArrow: "../assets/img/down-arrow.png",
      show_name_setter:
        localStorage.getItem("show_name_setter") !== null
          ? JSON.parse(localStorage.getItem("show_name_setter"))
          : true
    };
  },
  methods: {
    showNameSetter() {
      this.$store.commit("setShowNameSetter", true);
      localStorage.setItem("show_name_setter", true);
    },
    hideNameSetter() {
      this.$store.commit("setShowNameSetter", false);
      localStorage.setItem("show_name_setter", false);
    },
    save_user_name() {
      const vm = this;
      chrome.storage.sync.set({ user_name: vm.user_name });
    }
  },

  created() {
    const vm = this;

    if (!localStorage.getItem("show_name_setter")) {
      localStorage.setItem("show_name_setter", true);
    }

    chrome.storage.sync.get(["user_name"], user => {
      vm.user_name = user.user_name;
    });
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/animations.scss";

.set-name {
  display: flex;
  flex-direction: column;

  .small-info {
    font-size: 10px;
  }

  // .button {
  //   &--show-name-setter {
  //     background: transparent;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: center;
  //     align-items: center;
  //     padding: 0;
  //     border: 0;
  //     box-shadow: none;
  //     color: $violet;
  //     font-size: 12px;

  //     &:hover .img {
  //       animation-name: jumpingArrow;
  //       animation-duration: 800ms;
  //       animation-iteration-count: infinite;
  //     }

  //     .img {
  //       max-width: 25px;
  //     }
  //   }
  // }
}
</style>