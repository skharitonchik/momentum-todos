<template>
  <q-item>
    <q-item-section side>
      <input
        class="m-list-checkbox q-mr-md"
        type="checkbox"
        v-model="activeItem.isDone"
        @change="toggle"/>
    </q-item-section>
    <q-item-section>
      <q-item-label class="m-active-item color-white">
        {{activeItem.title}}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
  export default {
    name: "TodoFocus",
    props: {
        activeItem: {
          type: Object
        }
    },
    emits: ['change'],
    methods: {
      toggle() {
        this.$emit('change')
      }
    }
  }
</script>

<style scoped>

</style>
