<template>
    <a
        v-if="isLink"
        :href="url"
        :target="target"
    >
        <slot>{{text}}</slot>
    </a>
    <button v-else>
        <slot>{{text}}</slot>
    </button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: false,
            default: 'vButton'
        },
        url:{
            type: String,
            required: false,
        },
        isExternal: {
            type: Boolean,
            required: false,
            default: false
        },
        icon: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false,
            validator: (value)  => { ['primary', 'secondary', 'disabled'].indexOf(value) !== -1 }
        },
        type: {
            type: String,
            required: false,
            default: 'link',
            // validator: (value)  => { ['link', 'action'].indexOf(value) !== -1 }
        }
    },
    data() {
        return {
        }
    },
    computed: {
        isLink() {
            return this.type === 'link'
        },
        target() {
            return this.isExternal ? '_blank' : '_self'
        }
    }
}
</script>

<style lang="scss">
</style>
