import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/vue';
// eslint-disable-next-line import/no-unresolved
import vButton from '@components/vButton';

Vue.component('vButton', vButton);

storiesOf('Button', module)
  .add('Text as prop', () => /* html */'<vButton text="with text" state="primary"></vButton>')
  .add('Content as slot', () => '<vButton>I am in a slot</vButton>')
  .add('Internal Link', () => '<vButton url="https://google.com">I am in a slot</vButton>')
  .add('External Link', () => '<vButton url="https://google.com" :is-external="true">I am in a slot</vButton>')
  .add('Button', () => '<vButton type="action">I am in a slot</vButton>');
