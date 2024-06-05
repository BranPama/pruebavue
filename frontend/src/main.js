import { createApp } from 'vue'
import router from './router/router';
import App from './App.vue'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

//vuetify import
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const app = createApp(App);

// Usa el enrutador Vue Router
app.use(router);


//vuetify
const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
});


app.use(vuetify).mount('#app')
