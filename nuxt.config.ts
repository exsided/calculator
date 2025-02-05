import svgLoader from 'vite-svg-loader';
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    app: {
        head: {
            title: 'Entertain Me More',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [{rel: 'icon', type: 'image/svg+xml', href: "/favicon.svg"}]
        }
    },

    build: {
    transpile: ['vuetify'],
  },

    compatibilityDate: '2024-04-03',
    // devtools: {enabled: true},

    modules: [
        '@pinia/nuxt',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({autoImport: true}))
            })
        },
    ],

    css: ['~/assets/scss/styles.scss'],

    vite: {
        plugins: [
            svgLoader(),
        ],

        vue: {
            template: {
                transformAssetUrls,
            },
        },

        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
						@import "~/assets/scss/base/variables.scss";
						@import "~/assets/scss/base/mixins.scss";
						@import "~/assets/scss/base/functions.scss";
					`,
                },
            },
        },
    }
})
