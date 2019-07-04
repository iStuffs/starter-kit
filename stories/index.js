import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import vButton from '../src/assets/scripts/components/vButton';

Vue.component('vButton', vButton);

storiesOf('Button', module)
    .add('Text as prop', () => '<vButton text="with text"></vButton>')
    .add('Content as slot', () => '<vButton>I am in a slot</vButton>')
    .add('Internal Link', () => '<vButton url="https://google.com">I am in a slot</vButton>')
    .add('External Link', () => '<vButton url="https://google.com" :is-external="true">I am in a slot</vButton>');
// .add('as a component', () => ({
//     components: { vButton },
//     template: '<vButton :rounded="true">rounded</vButton>',
// }));
