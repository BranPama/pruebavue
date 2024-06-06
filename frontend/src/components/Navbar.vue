<script>
import { defineComponent, ref, computed } from 'vue'

import NavigationDrawer from '../../src/components/Drawer.vue';

export default defineComponent({
  components: {
    NavigationDrawer,
  },
  setup() {

    //const name = 'Con vue3 Dinamico'
    const botonNavigation = ref(true);

    const gestionMenu = () => {
      botonNavigation.value = !botonNavigation.value;
    };

    return {
      botonNavigation,
      gestionMenu,
    };
  },
});
</script>

<template>
  <v-app-bar class="text-green" color="#121a21" title="Praticando con VUE3">
    <template v-slot:prepend>
      <v-app-bar-nav-icon class="text-white" @click="gestionMenu"></v-app-bar-nav-icon>
    </template>
    <template v-slot:append>
      <v-app-bar-nav-icon class="text-white" icon="mdi-home" to="/inicio"></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
  <NavigationDrawer v-model="botonNavigation"/>
</template>

<style scoped></style>