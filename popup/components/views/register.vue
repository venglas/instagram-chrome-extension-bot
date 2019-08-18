<template>
  <article class="login">
    <form class="form" @submit.prevent="stop">
      <div class="form__row">
        <label class="label">email</label>
        <input type="email" class="input-text input--login" v-model="email" />
      </div>

      <div class="form__row">
        <label class="label">password</label>
        <input type="password" class="input-text input--password" v-model="password" />
      </div>

      <button class="button button--login" @click="register">
        <span v-if="isLoading === false">Register</span>
        <img v-else :src="loadingImg" class="img--loading" />
      </button>
    </form>

    <section class="register-info" v-if="registerInfo">
      <h3>{{registerInfoTxt}}</h3>
    </section>
  </article>
</template>

<script>
// import { createUserWithEmailAndPassword, auth } from "firebase";

export default {
  data() {
    return {
      loadingImg: "../assets/img/loading.png",
      isLoading: false,
      email: "",
      password: "",
      registerInfo: false,
      registerInfoTxt: ""
    };
  },

  methods: {
    stop() {},
    register() {
      const vm = this;
      this.isLoading = !this.isLoading;

      const actionCodeSettings = {
        url: "/",
        handleCodeInApp: true,
        dynamicLinkDomain: "example.page.link"
      };

      auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            vm.registerInfo = true;
            vm.registerInfoTxt = `Account created. User email: ${user.user.email}`;

            auth().sendSignInLinkToEmail(email, actionCodeSettings);
            window.localStorage.setItem("emailForSignIn", email);

            vm.isLoading = false;
          },
          err => {
            vm.registerInfo = true;
            vm.registerInfoTxt = err.message;
            vm.isLoading = false;
          }
        );
    }
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