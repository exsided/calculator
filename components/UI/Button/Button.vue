<template>
    <button
        :class="BEM('ui-button', { primary })"
        v-bind="$attrs"
    >
        <slot />
    </button>
</template>

<script lang="ts" setup>
interface Props {
    primary?: boolean
}

defineProps<Props>();
</script>

<style lang="scss" src="@/components/UI/Button/styles.scss" />
