<template>
  <q-list class="q-ma-md momentum-list">
    <q-item>
      <q-item-section>
        <q-item-label header>
          {{todoGroup.groupTitle}}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn class="gt-xs" color="secondary" round :icon="todoGroup.isListOpen ? 'remove' : 'add'"
               @click="todoGroup.isListOpen = !todoGroup.isListOpen"/>
      </q-item-section>
    </q-item>


    <transition name="fade">
      <div v-if="todoGroup.isListOpen">
        <slot name="todo-item"></slot>
      </div>
    </transition>

    <slot name="add-new-form"></slot>
  </q-list>
</template>

<script>
  export default {
    name: "TodoGroup",
    props: {
      todoGroup: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style scoped>

</style>
