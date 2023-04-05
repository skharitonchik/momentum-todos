<template>
  <q-page>
    <div class="window-height column items-center">

      <div class="col">
      </div>
      <div class="col-5">
        <Time></Time>

        <todo-focus :active-item="activeItem" @change="toggleActiveItemToDone"></todo-focus>
      </div>
      <div class="col">
      </div>
    </div>

    <q-slide-transition>
      <div v-if="isListVisible" class="fixed-bottom-right m-focus-list">
        <q-list class="momentum-list">
          <TodoItem v-for="todo in mainList"
                    :todo="todo"
                    @update-todo="toggle">
            <q-btn class="" round color="secondary" size="md" :icon="isTodoActive(todo) ? 'star' : 'star_border'"
                   @click="changeActiveItem(todo)"/>
          </TodoItem>
        </q-list>
      </div>
    </q-slide-transition>


    <q-btn class="fixed-bottom-right q-ma-md" round color="secondary" size="xl" icon="format_list_bulleted"
           @click="() => isListVisible = !isListVisible"/>

  </q-page>
</template>

<script>
  import {getISODay} from 'date-fns'
  import TodoFocus from 'components/TodoFocus.vue'
  import TodoItem from 'components/TodoItem.vue'
  import Time from 'components/Time.vue'

  import {api} from '../api'

  const ACTIVE_ITEM_KEY = 'active-todo'

  export default {
    name: 'Day',
    components: {
      TodoFocus,
      TodoItem,
      Time
    },
    data() {
      return {
        isListVisible: true,
        activeItem: {
          title: 'Choose item from the list!!'
        },
        mainList: []
      }
    },
    beforeCreate() {
      api.getAllData()
        .then(d => {
          console.info('%c FOCUS data SERGEY', 'color: white; background-color: #2274A5', d);
          this.mainList = this.getOnlyTodayTodos(d)
          console.info('%c this.mainList SERGEY',
            'color: white; background-color: #2274A5',
            this.mainList);
          this.activeItem = this.getActiveItem()
        })

    },
    methods: {
      isTodoActive(todo) {
        return todo.title === this.activeItem.title
      },
      getActiveItem() {
        const noItemFound = {title: 'No item found....'}
        const savedItem = localStorage.getItem(ACTIVE_ITEM_KEY)


        if (this.mainList.length > 0) {
          let findResult = null

          if(savedItem) {
            findResult = this.mainList.find(i => i.title === savedItem)
          }

          if (!findResult) {
            findResult = this.mainList.find(i => !i.isDone)
          }

          return findResult || noItemFound
        }

        return noItemFound
      },
      getOnlyTodayTodos(todoGroups) {
        const currentDay = getISODay(new Date())
        const result = []

        todoGroups.forEach(g => {
          g.todos.forEach(t => {
            if (t.isWeekTodo && t.weekDay === currentDay) {
              result.push({
                ...t,
                groupTitle: g.groupTitle
              })
            }
          })
        })

        return result
      },

      changeActiveItem(todo) {
        this.activeItem = todo
        localStorage.setItem(ACTIVE_ITEM_KEY, this.activeItem.title)
      },

      toggleActiveItemToDone() {
        this.toggle(this.activeItem)
        localStorage.removeItem(ACTIVE_ITEM_KEY)
        this.activeItem = this.getActiveItem()
      },
      toggle(todo) {
        console.log('isDone focus toggle', todo)
        this.updateTodo(todo.title, todo.groupTitle, todo.isDone)
      },
      updateTodo(todoTitle, groupTitle, isDone) {
        api.updateTodoItem(todoTitle, groupTitle, isDone)
      }
    }
  }
</script>
