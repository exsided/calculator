<template>
    <label
        :class="BEM('ui-icon-checkbox', { isChecked: modelValue })"
    >
        <input
            :name="name"
            :checked="modelValue"
            type="checkbox"
            class="ui-icon-checkbox__input"
            @change="onChange"
        >

        <div class="ui-icon-checkbox__body">
            <div class="ui-icon-checkbox__icon-wrapper">
                <Transition name="fade">
                    <img
                        v-show="modelValue"
                        class="ui-icon-checkbox__icon"
                        :src="activeIcon"
                    >
                </Transition>
                <Transition name="fade">
                    <img
                        v-show="!modelValue"
                        class="ui-icon-checkbox__icon"
                        :src="disabledIcon"
                    >
                </Transition>
            </div>
            <span class="ui-icon-checkbox__text">
				<slot/>
			</span>
        </div>
    </label>
</template>

<script lang="ts" setup>
interface Props {
    name: string;
    disabledIcon: string;
    activeIcon: string;
    modelValue: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:model-value']);

const onChange = () => emit('update:model-value', !props.modelValue);
</script>

<style lang="scss" src="@/components/UI/IconCheckbox/styles.scss"/>
