import { createVuetify } from 'vuetify'
import { VSlider } from 'vuetify/components'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components: { VSlider },
  })

  nuxtApp.vueApp.use(vuetify)
})
