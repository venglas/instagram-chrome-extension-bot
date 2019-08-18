<template>
  <article class="message-bot">
    <header class="header">
      <h3>Message Bot</h3>
    </header>

    <div class="saved-message">
      <!-- TODO: this should be an other component -->
      <button
        class="saved-message__item button"
        @click="set_message(1)"
        :class="{button_active: message_bot.active_message === 1}"
      >1</button>

      <button
        class="saved-message__item button"
        @click="set_message(2)"
        :class="{button_active: message_bot.active_message === 2}"
      >2</button>

      <button
        class="saved-message__item button"
        @click="set_message(3)"
        :class="{button_active: message_bot.active_message === 3}"
      >3</button>

      <button
        class="saved-message__item button"
        @click="save_message(message_bot.active_message - 1)"
      >save</button>
    </div>

    <div class="box">
      <textarea type="text" class="textarea" v-model="message_bot.message"></textarea>

      <button
        class="button"
        :class="{ button_active: message_bot.isStart }"
        @click="toggle_messaging"
      >{{message_bot.isStart === true ? 'Stop' : 'Start'}}</button>
    </div>

    <div class="box box--info-about-messages">
      <ul class="list">
        *In textarea you can use variables like:
        <li class="list__item">
          <b>{name}</b> in this place will be putting name person who receive message from you
        </li>
      </ul>
    </div>

    <!-- TODO: show more component with more buttons for saving messages and other -->

    <div class="box box--message-bot-buttons">
      <button
        class="button button--message-delete"
        :class="{ button_active: message_bot.dletingIsStart }"
        @click="toggle_deleting_messages"
      >{{message_bot.dletingIsStart === true ? 'Stop' : 'Delete messages'}}</button>

      <button
        class="button button--message-delete"
        :class="{ button_active: message_bot.blockingIsStart }"
        @click="toggle_block_messages"
      >{{message_bot.blockingIsStart === true ? 'Stop' : 'block messengers'}}</button>
    </div>

    <Show-more buttonText="Show More Options">
      <div class="option-row">
        <input type="checkbox" id="saveMoreMessages" v-model="message_bot.more_messages.isOn" />
        <label for="saveMoreMessages">Save more messages</label>

        <template v-if="message_bot.more_messages.isOn">
          <textarea class="textarea" v-model="message_bot.more_messages.message_holder"></textarea>
          <button class="button" @click="saveMoreMessage">Save</button>
        </template>
      </div>

      <div class="option-row option-row--column">
        <label for="LoadMoreMessages">Load more messages</label>

        <select
          type="checklist"
          id="LoadMoreMessages"
          v-model="message_bot.more_messages.selected_message"
        >
          <option
            v-for="(message, index) in message_bot.more_messages.messages"
            :value="message"
            :key="index"
          >{{message}}</option>
        </select>

        <div class="button-row">
          <button class="button" @click="loadMessage">Load</button>
          <button class="button">Delete this message</button>
        </div>
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
      message_bot: {
        isStart: false,
        message: localStorage.getItem("last_message"),
        dletingIsStart: false,
        blockingIsStart: false,
        saved_messages: [],
        active_message:
          localStorage.getItem("last_message") !== null
            ? parseInt(localStorage.getItem("last_message"))
            : 1,
        more_messages: {
          isOn: false,
          message_holder: "",
          messages: [],
          selected_message: null
        }
      }
    };
  },

  methods: {
    set_message(which) {
      switch (which) {
        case 1:
          this.message_bot.active_message = which;
          this.message_bot.message = this.message_bot.saved_messages[which - 1];
          break;

        case 2:
          this.message_bot.active_message = which;
          this.message_bot.message = this.message_bot.saved_messages[which - 1];
          break;

        case 3:
          this.message_bot.active_message = which;
          this.message_bot.message = this.message_bot.saved_messages[which - 1];
          break;
      }
    },

    save_message(which_message) {
      const saved_messages = JSON.parse(localStorage.getItem("saved_messages"));
      let last_message = JSON.parse(localStorage.getItem("last_message"));

      last_message = which_message;
      saved_messages[which_message] = this.message_bot.message;

      localStorage.setItem("last_message", JSON.stringify(last_message));
      localStorage.setItem("saved_messages", JSON.stringify(saved_messages));
    },

    toggle_messaging() {
      if (this.message_bot.isStart === false) {
        eventBus.sendMessageToContentScript("start_messaging");

        chrome.storage.sync.set({ last_message: this.message_bot.message });
        localStorage.setItem("last_message", this.message_bot.active_message);

        this.message_bot.isStart = true;
      } else {
        eventBus.sendMessageToContentScript("stop_messaging");
        this.message_bot.isStart = false;
      }
    },

    toggle_deleting_messages() {
      if (this.message_bot.dletingIsStart === false) {
        eventBus.sendMessageToContentScript("start_delete_all_old_messages");
        this.message_bot.dletingIsStart = true;
      } else {
        eventBus.sendMessageToContentScript("stop_delete_all_old_messages");
        this.message_bot.dletingIsStart = false;
      }
    },

    toggle_block_messages() {
      // TODO: save last state of this button
      if (this.message_bot.blockingIsStart === false) {
        eventBus.sendMessageToContentScript("start_blocking_all_old_messages");
        this.message_bot.blockingIsStart = true;
      } else {
        eventBus.sendMessageToContentScript("stop_blocking_all_old_messages");
        this.message_bot.blockingIsStart = false;
      }
    },

    saveMoreMessage() {
      const vm = this;

      localStorage.setItem(
        "last_more_message",
        this.message_bot.more_messages.message_holder
      );

      chrome.storage.sync.get(["more_messages"], data => {
        if (data) {
          data.more_messages.push(localStorage.getItem("last_more_message"));

          chrome.storage.sync.set(data, () => {
            vm.message_bot.more_messages.messages = data.more_messages;
            vm.message_bot.more_messages.message_holder = "";
          });
        } else {
          chrome.storage.sync.set({ more_messages: [] });
        }
      });
    },

    loadMessage() {
      this.message_bot.message = this.message_bot.more_messages.selected_message;
    },

    deleteMessage() {
      // get data from chrome storage
      // get selected message
      // check if selected message exsist in data and get it index
      // remove message from array and push cleared data
    }
  },

  created() {
    const vm = this;

    const check_localStorage = () => {
      const data = ["", "", ""];

      if (localStorage.getItem("saved_messages") === null) {
        localStorage.setItem("saved_messages", JSON.stringify(data));
      } else {
        this.message_bot.saved_messages = JSON.parse(
          localStorage.getItem("saved_messages")
        );
      }
    };

    const set_last_message = () => {
      const data = {
        messages: JSON.parse(localStorage.getItem("saved_messages")),
        last_message: JSON.parse(localStorage.getItem("last_message")) - 1
      };

      this.message_bot.message = data.messages[data.last_message];
      this.message_bot.active_message = data.last_message + 1;
    };

    const init = () => {
      check_localStorage();
      set_last_message();
    };

    init();

    const loadMoreMessages = () => {
      chrome.storage.sync.get("more_messages", data => {
        if (data.more_messages) {
          vm.message_bot.more_messages.messages = data.more_messages;
        } else {
          chrome.storage.sync.set({ more_messages: [] });
        }
      });
    };

    loadMoreMessages();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/mixins.scss";
@import "../assets/scss/variables.scss";

.message-bot {
  .saved-message {
    display: flex;
    justify-content: space-between;
    width: 100%;
    @include small-space-bottom;
  }

  .button {
    &--message-delete {
      padding: 0.3rem 1rem;
      min-width: 142px;
      min-height: 40px;
    }
  }

  .option-row {
    margin: 10px 0;
    padding: 5px 0;
    border-bottom: 1px solid rgba($dark_gray, 0.1);

    &--column {
      display: flex;
      flex-direction: column;
    }
  }

  .button-row {
    display: flex;
    justify-content: center;
  }
}
</style>