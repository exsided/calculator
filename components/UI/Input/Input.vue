<script lang="ts" setup>
    import { ref, computed } from "vue";
    import { vMaska } from "maska/vue"

    interface Props {
        modelValue: string;
        error?: boolean;
        errorMessage?: string;
        message?: string;
        placeholder?: string;
        name?: string;
        mask?: string;
        autocomplete?: string
    }

    const props = defineProps<Props>();
    const emit = defineEmits(["update:model-value", "focus", "blur"]);

    const isFocus = ref(false);

    const maskData = computed(() => `${props?.mask}`.length > 0 ? props.mask : null);

    const onFocus = () => {
        isFocus.value = true;
        emit("focus");
    };
    const onBlur = () => {
        isFocus.value = false;
        emit("blur");
    };
    const onInput = (value: string) => emit("update:model-value", value);
</script>

<template>
    <label :class="BEM('ui-input', {error, focused: isFocus })">
        <div class="ui-input__wrapper">
            <input
                v-maska
                class="ui-input__field"
                type="text"
                :autocomplete="autocomplete"
                :placeholder="placeholder"
                :data-maska="maskData"
                :name="name"
                :value="modelValue"
                @focus="onFocus"
                @blur="onBlur"
                @input="onInput($event.target.value)"
            >
        </div>

        <span
            v-if="errorMessage || message"
            class="ui-input__msg"
        >
            {{ errorMessage || message }}
        </span>
    </label>
</template>

<style lang="scss" src="@/components/UI/Input/styles.scss" />
