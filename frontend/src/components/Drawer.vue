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
            <v-list-item 
                active-color="green" 
                class="text-black" 
                to="/clientes"
                >
                <v-icon icon="mdi-account-edit"></v-icon>
                Clientes
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped></style>