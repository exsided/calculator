<template>
    <div class="index-page container">
        <h1>
            Настройте тариф
        </h1>

        <TariffForm />
    </div>
</template>

<script lang="ts" setup>
import TariffForm from '~/components/Forms/Tariff/Tariff.vue';
import {MAIN_PAGE_LINK} from '@/constants/links';

useSeoMeta({
    title: MAIN_PAGE_LINK.title
});
</script>

<style lang="scss" src="@/pages/index/styles.scss" />
