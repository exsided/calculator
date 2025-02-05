<template>
    <div
        :class="BEM('ui-select',{isOpen})"
        @click="toggleOpen"
    >
        <div class="ui-select__label">
            <p class="ui-select__label-text">
                {{ modelValue.title || placeholder }}
            </p>
            <DownArrowSvg class="ui-select__label-arrow"/>
        </div>
        <Transition name="ui-select__options">
            <ul
                v-if="isOpen"
                v-click-outside="close"
                class="ui-select__options"
            >
                <li
                    v-for="option in options"
                    :key="option.value"
                    :title="option.title"
                    :class="BEM('ui-select__option', { active: option.value === modelValue.value})"
                    @click="change(option)"
                >
                    {{ option.title }}
                </li>
            </ul>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import DownArrowSvg from '@/public/svg/down-arrow.svg?skipsvgo';

type Option = {
    title: string | number;
    value: string | number;
}

interface Props {
    modelValue: Option;
    options: Option[];
    placeholder?: string;
}

const props = withDefaults(defineProps<Props>(),{
    modelValue: (): Option => ({title: '', value: ''}),
    options: () => []
});

const emit = defineEmits(['update:model-value']);

const isOpen = ref(false);
const showScroll = ref(false);

let timeout: ReturnType<typeof setTimeout>;

const change = (option: Option) => {
    if (option.value !== props.modelValue.value)
        emit('update:model-value', option);
};

const toggleOpen = () => isOpen.value ? close() : open();

const close = () => {
    clearTimeout(timeout);
    isOpen.value = false;
    showScroll.value = false;
};

const open = () => {
    isOpen.value = true;
    timeout = setTimeout(() => (showScroll.value = true), 300);
};

export type { Option as SelectOptionType };
</script>

<style lang="scss" src="@/components/UI/Select/styles.scss" />
