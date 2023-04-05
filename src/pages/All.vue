<template>
  <q-page>
    <div>
      <q-btn class="gt-xs q-ma-md" color="secondary" round icon="filter_list" @click="() => sortAllByTodos()">
        <q-tooltip class="bg-accent">
          Sort groups by todo items
        </q-tooltip>
      </q-btn>
      <q-btn class="gt-xs q-ma-md" color="secondary" round icon="sort" @click="() => sortAllByDone()">
        <q-tooltip class="bg-accent">
          Sort todo items by done status
        </q-tooltip>
      </q-btn>
      <q-btn class="gt-xs q-ma-md" color="secondary" round :icon="isListsOpen ? 'remove' : 'add'"
             @click="toggleGroups"/>

      <q-toggle
        size="85px"
        v-model="showOnlyToday"
        color="secondary"
        icon="date_range"
      />
    </div>


    <div class="fit row wrap justify-center items-start content-start m-todo-list-wrap">
      <todo-group v-for="(todoGroup, groupIndex) in todoGroups"
                  :key="todoGroup.groupTitle" :todo-group="todoGroup">

        <template #todo-item>
          <TodoItem v-for="todo in todoGroup.todos"
                    :todo="todo"
                    :show-only-today-todo="showOnlyToday"
                    @update-todo="saveAll">
            <div class="row items-start">
              <q-btn round :color="todo.isWeekTodo ? 'secondary' : 'accent'" icon="date_range"
                     @click="() => weekToggle(todo)"/>
            </div>
          </TodoItem>
        </template>

        <template #add-new-form>
          <q-form action="#" method="post" @submit.prevent="() => addNewTodo(todoGroup)">
            <q-input
              standout="bg-secondary text-white"
              class="text-white bg-blue-grey-9 q-ma-md "
              v-model="todoGroup.newTodoTitle"
              stack-label
              label-color="white"
              label="New todo"
              clearable>
              <template v-slot:prepend>
                <q-icon color="white" name="event"/>
              </template>
            </q-input>
          </q-form>
        </template>

      </todo-group>

    </div>

    <clear-done></clear-done>
  </q-page>
</template>

<script>
  import {api} from '../api'

  import TodoGroup from 'components/TodoGroup.vue'
  import TodoItem from 'components/TodoItem.vue'
  import ClearDone from 'components/buttons/ClearDone.vue'

  export default {
    name: 'All',
    components: {
      TodoGroup,
      TodoItem,
      ClearDone
    },
    data() {
      return {
        todoGroups: [],
        isSaveInProgress: false,
        showOnlyToday: false,
        isListsOpen: false
      }
    },
    beforeCreate() {
      api.getAllData()
        .then(d => this.todoGroups = d)
    },
    methods: {
      isTodoShown(todo) {
        return this.showOnlyToday ? todo.isTodayTodo : true
      },
      toggleGroups() {
        this.isListsOpen = !this.isListsOpen

        this.isListsOpen ? this.showAll() : this.hideAll()
      },
      showAll() {
        this.todoGroups.forEach(g => g.isListOpen = true)
      },
      hideAll() {
        this.todoGroups.forEach(g => g.isListOpen = false)
      },
      isDoneToggle(groupIndex, todoIndex) {
        console.info('%c groupIndex SERGEY',
          'color: white; background-color: #2274A5',
          groupIndex);
        console.info('%c todoIndex SERGEY',
          'color: white; background-color: #2274A5',
          todoIndex);

        this.todoGroups[groupIndex].todos[todoIndex].isDone = !this.todoGroups[groupIndex].todos[todoIndex].isDone
      },
      isTodayToggle(e) {
        console.info('%c e isTodayToggle SERGEY',
          'color: white; background-color: #2274A5',
          e);
      },
      orderInc(group, todoIndex) {
        if (todoIndex > 0) {
          let temp = group.todos[todoIndex];
          group.todos[todoIndex] = group.todos[todoIndex - 1];
          group.todos[todoIndex - 1] = temp
        }

        this.saveAll()
      },
      orderDec(group, todoIndex) {
        if (todoIndex !== group.todos.length - 1) {
          let temp = group.todos[todoIndex];
          group.todos[todoIndex] = group.todos[todoIndex + 1];
          group.todos[todoIndex + 1] = temp
        }

        this.saveAll()
      },
      todayToggle(todo) {
        todo.isTodayTodo = !todo.isTodayTodo

        this.saveAll()
      },
      weekToggle(todo) {
        todo.isWeekTodo = !todo.isWeekTodo

        this.saveAll()
      },
      addNewTodo(todoGroup) {
        console.info('%c todoGroup.newTodoTitle SERGEY',
          'color: white; background-color: #2274A5',
          todoGroup.newTodoTitle);

        todoGroup.todos.push({
          title: todoGroup.newTodoTitle,
          isDone: false,
          orderPriority: todoGroup.todos.length - 1,
          isTodayTodo: false
        })
        todoGroup.newTodoTitle = ''

        this.saveAll()
      },
      removeTodo(todoGroup, index) {
        todoGroup.todos.splice(index, 1)

        this.saveAll()
      },
      saveAll() {
        if (this.isSaveInProgress) return

        this.isSaveInProgress = true

        api.updateAllData(this.todoGroups)
          .finally(() => this.isSaveInProgress = false)
      },
      sortAllByDone() {
        api.sortAllByDone()
        window.location.reload()
      },
      sortAllByTodos() {
        api.sortAllByLength()
        window.location.reload()
      },
    }
  }
</script>
