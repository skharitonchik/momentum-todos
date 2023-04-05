<template>
  <q-btn class="fixed-bottom-right q-ma-md" round color="secondary" size="xl" icon="delete"
         @click="removeDoneItems">
    <q-tooltip class="bg-accent" anchor="center left" self="center right" :offset="[10, 10]">
      Remove done items
    </q-tooltip>
  </q-btn>

</template>

<script>
  import {api} from '../../api'

  export default {
    name: "ClearDone",
    methods: {
      removeDoneItems() {
        api.clearDoneItems()
        window.location.reload()
      }
    }
  }
</script>

<style scoped>

</style>
