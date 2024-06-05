<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
    components: {
    },
    setup() {


        return {

        };
    },
});
</script>

<template>
    <v-navigation-drawer location="left" app>
        <v-list class="text-center">
            <h2>Administracion</h2>
            <v-divider class="ma-2"></v-divider>
            <v-list-item class="d-none d-md-flex text-black" to="/clientes">Clientes</v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped></style>