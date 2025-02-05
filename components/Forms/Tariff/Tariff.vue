<template>
    <form class="tariff-form" @subtim.preven="onSubmit">
        <UiFieldWrapper class="tariff-form__field">
            <template #title>
                Телефон
            </template>
            <UiInput
                :error="$v.phone?.$error"
                mask="+7 (###) ###-##-##"
                placeholder="+7 (____) ___-__-__"
                message="Обязательное поле"
                v-model="form.phone"
            />
        </UiFieldWrapper>

        <UiFieldWrapper class="tariff-form__field">
            <template #title>
                Оператор
            </template>
            <UiSelect
                placeholder="Оператор"
                :options="FORM_PROVIDERS"
                v-model="form.provider"
            />
        </UiFieldWrapper>

        <UiFieldWrapper class="tariff-form__field">
            <template #title>
                Минуты
            </template>
            <UiSlider
                :tick-labels="minutesTickLabels"
                :step="1"
                :tickSize="FORM_MINUTES_TICKS.length"
                :max="FORM_MINUTES_TICKS.length - 1"
                showTicks="always"
                primary
                v-model="form.minutes"
            />
        </UiFieldWrapper>

        <UiFieldWrapper class="tariff-form__field">
            <template #title>
                Интернет
            </template>
            <UiSlider
                :tick-labels="internetTickLabels"
                :step="1"
                :tickSize="FORM_INTERNET_TICKS.length"
                :max="FORM_INTERNET_TICKS.length - 1"
                showTicks="always"
                v-model="form.internet"
            />
        </UiFieldWrapper>

        <UiFieldWrapper class="tariff-form__field">
            <template #title>
                Wi-Fi роутер
            </template>
            <UiRadio
                v-for="routerAction in FORM_ROUTER_ACTIONS"
                :key="routerAction.value"
                :value="routerAction.value"
                name="routerAction"
                class="tariff-form__radio"
                v-model="form.router"
            >
                {{ routerAction.title }}
                <b>
                    {{ routerAction.fixedPrice || routerAction.paymentPerMonth }}
                </b>
                <template v-if="routerAction.fixedPrice">
                    ₽
                </template>
                <template v-else>
                    ₽/мес.
                </template>
            </UiRadio>
        </UiFieldWrapper>

        <UiFieldWrapper class="tariff-form__field">
            <template #title>
                Соцсети
            </template>
            <div class="tariff-form__icon-radios">
                <IconCheckbox
                    v-for="social in FORM_SOCIAL"
                    :key="social.value"
                    :disabled-icon="social.disabledIcon"
                    :active-icon="social.activeIcon"
                    :modelValue="form.socials.includes(social.value)"
                    name="social"
                    @update:model-value="updateSocialCheckbox(social.value)"
                >
                    {{ social.paymentPerMonth }}₽
                </IconCheckbox>
            </div>
        </UiFieldWrapper>
        <div class="tariff-form__bottom">
            <UiButton
                primary
                type="submit"
                @click.prevent="onSubmit"
            >
                {{ LOCAL_NUMBER_FORMATTER(paymentPerMonth) }} ₽ в месяц
            </UiButton>
            <Transition name="fade">
                <p
                    v-if="fixedPrice"
                    class="tariff-form__fixed-price"
                >
                    Разовый платеж {{ LOCAL_NUMBER_FORMATTER(fixedPrice) }} ₽
                </p>
            </Transition>
        </div>
    </form>
</template>

<script lang="ts" setup>
import UiFieldWrapper from '~/components/UI/FieldWrapper/FieldWrapper.vue';
import UiInput from '~/components/UI/Input/Input.vue';
import UiRadio from '~/components/UI/Radio/Radio.vue';
import UiSlider from '~/components/UI/Slider/Slider.vue';
import IconCheckbox from '~/components/UI/IconCheckbox/IconCheckbox.vue';
import UiSelect, {SelectOptionType} from '~/components/UI/Select/Select.vue';
import UiButton from '~/components/UI/Button/Button.vue';

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators';

import { LOCAL_NUMBER_FORMATTER, WAIT } from '@/utils';
import { PHONE_VALIDATION } from '@/utils/validations';
import {useNumberChangeAnimation} from '~/composables/useNumberChangeAnimation';
import {useMainStore} from "~/store/main";

import {
    FORM_ROUTER_ACTIONS,
    FORM_SOCIAL,
    FORM_INTERNET_TICKS,
    FORM_MINUTES_TICKS,
    FORM_PROVIDERS
} from '~/constants/form';

interface Form {
    phone: string;
    provider: SelectOptionType;
    minutes: number;
    internet: number;
    socials: string[];
    router: number;
}

const mainStore = useMainStore();

const {uid} = getCurrentInstance() as { uid: number };

const {value: animatedPaymentPerMonth, displayValue: paymentPerMonth} = useNumberChangeAnimation();
const {value: animatedFixedPrice, displayValue: fixedPrice} = useNumberChangeAnimation();

const form = reactive<Form>({
    phone: '',
    provider: FORM_PROVIDERS[0],
    minutes: 2,
    internet: 1,
    router: FORM_ROUTER_ACTIONS[0].value,
    socials: [],
});

const validationRules = {
    phone: { phone: PHONE_VALIDATION },
    provider: {
        value: { required }
    },
};
const $v = useVuelidate(validationRules, form);

const sumPrices = computed(() => {
    let sum = {
        paymentPerMonth: 0,
        fixedPrice: 0,
    };

    const providerValue = FORM_PROVIDERS.find(el => el.value === form.provider.value);
    const internetValue = FORM_MINUTES_TICKS.find(el => el.value === form.minutes);
    const minutesValue = FORM_INTERNET_TICKS.find(el => el.value === form.internet);
    const routerValue = FORM_ROUTER_ACTIONS.find(el => el.value === form.router);
    const socialValue = FORM_SOCIAL.reduce((values, social) => {
        if (form.socials.includes(social.value)) {
            // @ts-ignore
            values.push(social);
        }

        return values;
    }, []);

    [providerValue, internetValue, minutesValue, routerValue, ...socialValue].forEach((value) => {
        sum.paymentPerMonth += value?.paymentPerMonth || 0;
        sum.fixedPrice += value?.fixedPrice || 0;
    });

    return sum;
});

const internetTickLabels = computed(() => {
    return FORM_INTERNET_TICKS.reduce((ticks, tick) => {
        ticks[tick.value] = tick.title;
        return ticks;
    }, {})
});

const minutesTickLabels = computed(() => {
    return FORM_MINUTES_TICKS.reduce((ticks, tick) => {
        ticks[tick.value] = tick.title;
        return ticks;
    }, {})
});

const setupPrices = () => {
    animatedPaymentPerMonth.value = sumPrices.value?.paymentPerMonth || 0;
    animatedFixedPrice.value = sumPrices.value?.fixedPrice || 0;
};

const updateSocialCheckbox = (value: string) => {
    const isIncludes = form.socials.includes(value);

    if (isIncludes) {
        form.socials = form.socials.filter(el => el !== value);
    } else {
        form.socials.push(value);
    }
};

const onSubmit = async () => {
    $v.value.$touch();

	if ($v.value.$error) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		return;
    }

    mainStore.enableLoading(uid);
    await WAIT(1000);
    const result = {
        phone: form.phone,
        provider: form.provider.title,
        minutes: FORM_MINUTES_TICKS.find(el => el.value === form.minutes).title,
        internet: FORM_INTERNET_TICKS.find(el => el.value === form.internet).title,
        router: FORM_ROUTER_ACTIONS.find(el => el.value === form.router).title,
        socials: form.socials,
    };

    alert(JSON.stringify(result));

    mainStore.disableLoading(uid);
};

watch(sumPrices, setupPrices);

onMounted(setupPrices)
</script>

<style lang="scss" src="@/components/Forms/Tariff/styles.scss"/>
