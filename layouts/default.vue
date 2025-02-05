<template>
    <main class="default-layout">
        <slot/>
    </main>
    <MainLoader />
</template>

<script setup lang="ts">
import MainLoader from '~/components/MainLoader/MainLoader.vue';
</script>

<script lang="ts">
import LayoutMixin from '~/mixins/layout.js';

export default {
    mixins: [LayoutMixin],
    setup() {
        return {
            ...LayoutMixin.setup(),
        };
    }
}
</script>

<style lang="scss" src="~/assets/scss/layouts/default.scss"/>
