<template>
    <div>
      <v-btn
        :loading="estadoBotonActualizar"
        @click="desactivarCliente"
        icon
        color="#121A21"
        density="compact"
      >
        <v-icon color="white"> mdi-account-minus </v-icon>
        <v-tooltip activator="parent" location="bottom"
          >Desactivar Cliente</v-tooltip
        >
      </v-btn>
    </div>
  </template>
  <script>
  import { defineComponent, ref, onMounted, computed } from "vue";
  import axios from "axios";
  export default defineComponent({
    name: "EliminarCliente",
    emits: ["click"],
    components: {
    },
    props: {
      nit: {
        type: Text,
        require: true,
      },
    },

    setup(props, { emit }) {
  

      const enviarActualizacionVista = () => {
        emit("click");
      };
  
      //Booleanos
      const estadoBotonActualizar = ref(false);
  
      // Funciones
      const desactivarCliente = async () => {
        estadoBotonActualizar.value = true;
          axios
          .put(
            `http://localhost:8500/desactivar_cliente`,
            {
              nit: props.nit,
            },

            
          )
          .then(() => {
            enviarActualizacionVista();
            estadoBotonActualizar.value = false;
          })
          .catch((error) => {
          console.error(error);
          });
      };
  
      return {
        desactivarCliente,
        estadoBotonActualizar,
      };
    },


  });
  </script>
<style scoped>
</style>
            