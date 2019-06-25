import vMessage from './vMessage';

export default {
    components: {
        vMessage,
    },
    data() {
        return {
            message: 'Hello world',
        };
    },
    delimiters: ['#{', '}'],
};
