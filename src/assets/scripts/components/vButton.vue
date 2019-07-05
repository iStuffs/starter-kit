<template>
  <a
    v-if="isLink"
    :href="url"
    :target="target"
    class="button"
  >
    <slot>{{ text }}</slot>
  </a>
  <button v-else class="button">
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
import { stringOneOf } from '../helpers/vue';

export default {
  props: {
    text: {
      type: String,
      required: false,
      default: 'vButton',
    },
    url: {
      type: String,
      required: false,
      default: '',
    },
    isExternal: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    state: {
      type: String,
      required: false,
      // eslint-disable-next-line no-unused-expressions
      //   validator: value => ['primary', 'secondary', 'disabled'].indexOf(value) !== -1,
      validator: value => stringOneOf(value, ['primary', 'secondary', 'disabled']),
    },
    type: {
      type: String,
      required: false,
      default: 'link',
    //   validator: (value)  => { ['link', 'action'].indexOf(value) !== -1 }
    },
  },
  data() {
    return {
    };
  },
  computed: {
    isLink() {
      return this.type === 'link';
    },
    target() {
      return this.isExternal ? '_blank' : '_self';
    },
  },
};
</script>

<style lang="scss">
.button{
    color: black;
    text-shadow: none;
    display: inline-flex;
    background-color: transparent;
    padding: 0;
    border: none;
    font-family: sans-serif;
    font-size: 1.6rem;
    text-decoration: none;
}
</style>
