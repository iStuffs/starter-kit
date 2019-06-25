import '@babel/polyfill';
import Vue from 'vue';
import store from './store';
import vPageWrapper from './components/vPageWrapper';

new Vue({
    el: '#app',
    store,
    components: {
        vPageWrapper,
    },
    delimiters: ['#{', '}'],
});
