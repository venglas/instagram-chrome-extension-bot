<template>
  <article class="login">
    <form class="form" @submit.prevent="stop">
      <div class="form__row">
        <label class="label">email</label>
        <input type="email" class="input-text input--login" v-model="email">
      </div>

      <div class="form__row">
        <label class="label">password</label>
        <input type="password" class="input-text input--password" v-model="password">
      </div>

      <button class="button button--login" @click="isLoading = !isLoading">
        <span v-if="isLoading === false">Login</span>
        <img v-else :src="loadingImg" class="img--loading">
      </button>
    </form>
  </article>
</template>

<script>
export default {
  data() {
    return {
      loadingImg: "../assets/img/loading.png",
      isLoading: false,
      email: "",
      password: ""
    };
  },
  methods: {
    stop() {}
  },

  created() {}
};
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
    margin: 10px 0;
    flex-direction: column;
  }

  .label {
    font-weight: bold;
    padding: 5px 0;
  }

  .input-text {
    width: 80%;
  }

  .button {
    &--login {
      width: 100px;
    }
  }
}
</style>