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
    components: {

    },
    props: {
      nit: {
        type: Number,
      },
    },
    setup(props, { emit }) {
      onMounted(() => {});
  

      const enviarActualizacionVista = () => {
        emit("click");
      };
  
      //Booleanos
      const estadoBotonActualizar = ref(false);
  
      // Funciones
      const desactivarCliente = async () => {
        try {
            estadoBotonActualizar.value = true;
            await 
            axios
            .delete(`http://localhost:8500/eliminar_cliente`,
                {
                    data: { id_cliente: props.id_cliente } // Pasar el id_cliente en lugar del nit
                }
            );
        enviarActualizacionVista();
    } catch (error) {
        console.error("Error al desactivar cliente:", error);
        // Manejar el error apropiadamente, ya sea mostrando un mensaje de error o realizando alguna otra acción.
    }
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
            