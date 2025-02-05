<template>
    <div :class="BEM('ui-slider', { primary })">
        <v-slider
            :ticks="tickLabels"
            :step="step"
            :tick-size="tickSize"
            :show-ticks="showTicks"
            :max="max"
            :model-value="modelValue"
            @update:modelValue="onChange"
        />
    </div>
</template>

<script lang="ts" setup>
type TickLabels = {
    [key: number]: string | number
}

interface Props {
    tickLabels: TickLabels;
    step: number;
    tickSize?: number;
    showTicks: boolean | 'always';
    max?: number;
    primary?: boolean;
    modelValue: number;
}

withDefaults(defineProps<Props>(), {
    step: 1,
    tickSize: 1,
    showTicks: false,
});

const emit = defineEmits(["update:model-value"]);

const onChange = (value: number) => emit("update:model-value", value);
</script>

<style lang="scss" src="~/components/UI/Slider/styles.scss" />
