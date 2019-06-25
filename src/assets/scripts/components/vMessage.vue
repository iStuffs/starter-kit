<template>
<div class="message">{{message}}</div>
</template>

<script>
export default {
    data() {
        return {
            message: 'I am a .vue file'
        }
    }
}
</script>

<style lang="scss">
$color: #eee;

.message {
    background-color: $color;
}
</style>
