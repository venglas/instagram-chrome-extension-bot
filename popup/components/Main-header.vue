<template>
  <header class="main-header">
    <h1
      @click="open_badoo"
      class="main-header__title"
      title="Clicke here to go to badoo.com"
    >Badoo Spam Bot</h1>

    <nav class="navigation">
      <ul class="navigation__list">
        <li class="item">
          <a @click="setView('Start')" class="link">Start</a>
        </li>

        <li class="item">
          <a @click="setView('Stats')" class="link">stats</a>
        </li>

        <li class="item">
          <a @click="setView('Login')" class="link">login</a>
        </li>

        <li class="item">
          <a @click="setView('Register')" class="link">Register</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  data() {
    return {
      actualView: ""
    };
  },
  methods: {
    open_badoo() {
      chrome.tabs.create({ url: "https://badoo.com" });
    },
    setView(view) {
      this.actualView = view;
      eventBus.$emit("setView", view);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/mixins.scss";
@import "../assets/scss/variables.scss";

.main-header {
  @include medium-space-bottom;
  color: $violet;
  text-shadow: 2px 2px 5px $orange, 2px 2px 7px rgba(#000, 0.5);

  &__title {
    cursor: pointer;
  }

  .navigation {
    @include small-space-vertical;

    &__list {
      list-style-type: none;
      display: flex;

      .item {
        margin: 0 0.5rem;
        transition: transform ease-in-out 200ms;
        &:hover {
          transform: rotateZ(-3deg) scale(1.1);
        }
        .link {
          cursor: pointer;
        }
      }
    }
  }
}
</style>


