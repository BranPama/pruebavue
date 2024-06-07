<script>
import { defineComponent, ref, computed } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';  // Importa useRouter

import NavigationDrawer from '../../src/components/Drawer.vue';

export default defineComponent({
  components: {
    NavigationDrawer,
  },
  setup() {

    const router = useRouter();  // Usa useRouter para obtener acceso a $router

    const botonNavigation = ref(true);

    const gestionMenu = () => {
      botonNavigation.value = !botonNavigation.value;
    };

    //Funcion de cerrar sesion 
    const cerrarSesion = () => {
      // Eliminar el token del almacenamiento local
      localStorage.removeItem('token');

      // Redirigir al usuario a la página de inicio de sesión
      router.push('/');
    };

    return {
      botonNavigation,
      gestionMenu,
      cerrarSesion,
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
      <v-btn @click="cerrarSesion">
        Cerrar Sesion
      </v-btn>
      <v-app-bar-nav-icon class="text-white" icon="mdi-home" to="/inicio"></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
  <NavigationDrawer v-model="botonNavigation"/>
</template>

<style scoped></style>