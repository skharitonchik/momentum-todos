<template>
  <q-item v-if="isTodoShowed()" :class="{'momentum-done': todo.isDone}">
    <q-item-section side>
      <input
        class="m-list-checkbox q-mr-md"
        type="checkbox"
        v-model="todo.isDone"
        @change="updateTodo"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{todo.title}}</q-item-label>
      <q-item-label v-if="todo.groupTitle" class="text-italic" caption>
        {{ todo.groupTitle }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <slot></slot>
    </q-item-section>
  </q-item>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: 'TodoItem',
    props: {
      showOnlyTodayTodo: {
        type: Boolean,
        required: false
      },
      todo: {
        type: Object,
        required: true
      }
    },
    emits: ['updateTodo'],
    methods: {
      isTodoShowed() {
        if (this.showOnlyTodayTodo) {
          return this.todo.isWeekTodo
        }

        return true
      },

      updateTodo() {
        this.$emit('updateTodo', this.todo)
      }
    }
  })
</script>
