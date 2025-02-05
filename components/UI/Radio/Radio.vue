<template>
	<label
        :class="BEM('ui-radio', { isChecked })"
        @click="onChange"
    >
		<input
			:name="name"
			:checked="isChecked"
			:value="value"
			type="radio"
			class="ui-radio__input"
		>

		<div class="ui-radio__body">
			<span class="ui-radio__box" />
			<span class="ui-radio__text">
				<slot />
			</span>
		</div>
	</label>
</template>

<script lang="ts" setup>
interface Props {
    name: string;
    value: string | number;
    modelValue: string | number | null;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:model-value']);

const isChecked = computed(() => props.value === props.modelValue);

const onChange = () => emit('update:model-value', props.value);
</script>

<style lang="scss" src="@/components/UI/Radio/styles.scss" />
