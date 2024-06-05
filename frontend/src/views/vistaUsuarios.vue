<script>
import { defineComponent, ref, computed } from 'vue'

import Navbar from "../../src/components/Navbar.vue";

export default defineComponent({
    components: {
        Navbar,
    },
    setup() {


        return {

        };
    },
});
</script>

<template>
    <v-app>
        <Navbar/>
        <v-main>
            <v-container>
                <v-row class="d-flex justify-center align-center" fill-height>
                    <h1>Inicio</h1>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
   
</template>

<style scoped>

</style>