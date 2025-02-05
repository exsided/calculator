<template>
    <div class="ui-field-wrapper">
        <p
            class="ui-field-wrapper__title"
            v-if="hasTitleSlot"
        >
            <slot name="title" />
        </p>
        <slot name="default" />
    </div>
</template>

<script lang="ts" setup>
import { useSlots } from "vue";

const slots = useSlots();

const hasTitleSlot = computed(() => Boolean(slots.title));
</script>

<style lang="scss" src="@/components/UI/FieldWrapper/FieldWrapper.scss" />
