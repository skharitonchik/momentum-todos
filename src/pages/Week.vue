<template>
  <q-page>

    <div class="q-ma-md row justify-center">
      <q-list class="q-mr-md momentum-list momentum-week-tasks-list">
        <Todo-Item v-for="todo in weekTodosDone"
                   @updateTodo="updateTodoItem(todo)"
                   :todo="todo">
          <div class="row items-start">


            <q-btn v-for="dayNum in DAYS_ENUM"
                   round :icon="`filter_${dayNum}`" :color="todo.weekDay === dayNum ? 'secondary' : ''"
                   @click="() => updateTodoItem(todo, dayNum)"/>
          </div>
        </Todo-Item>
      </q-list>
      <q-list class="q-mr-md momentum-list momentum-week-tasks-list">
        <Todo-Item v-for="todo in weekTodosNotPlanned"
                   @updateTodo="updateTodoItem(todo)"
                   :todo="todo">
          <div class="row items-start">


            <q-btn v-for="dayNum in DAYS_ENUM"
                   round :icon="`filter_${dayNum}`" :color="todo.weekDay === dayNum ? 'secondary' : ''"
                   @click="() => updateTodoItem(todo, dayNum)"/>
          </div>
        </Todo-Item>
      </q-list>
      <q-list class="q-mr-md momentum-list momentum-week-tasks-list">
        <Todo-Item v-for="todo in weekTodosUndone"
                   @updateTodo="updateTodoItem(todo)"
                   :todo="todo">
          <div class="row items-start">


            <q-btn v-for="dayNum in DAYS_ENUM"
                   round :icon="`filter_${dayNum}`" :color="todo.weekDay === dayNum ? 'secondary' : ''"
                   @click="() => updateTodoItem(todo, dayNum)"/>
          </div>
        </Todo-Item>
      </q-list>
    </div>

    <div class="q-ma-md row items-start">
      <q-list
        v-for="day in days"
        class="q-mr-md momentum-list momentum-week-day">
        <q-item>
          <q-item-label>
            {{day.title}}
          </q-item-label>
        </q-item>
        <Todo-Item v-for="todo in day.todos"
                   @updateTodo="updateTodoItem(todo)"
                   :todo="todo">
        </Todo-Item>
      </q-list>
    </div>

  </q-page>
</template>

<script>
  import {api} from '../api'
  import TodoItem from 'components/TodoItem.vue'
  import {getISOWeek, lastDayOfISOWeek, subDays, format} from 'date-fns'

  export default {
    name: "Week",
    components: {
      TodoItem
    },
    data() {
      return {
        DAYS_ENUM: [1, 2, 3, 4, 5, 6, 7],
        weekTodosNotPlanned: [],
        weekTodosUndone: [],
        weekTodosDone: [],
        weekTodos: [],
        weekNumber: null
      }
    },
    beforeCreate() {
      this.weekNumber = getISOWeek(new Date())

      api.getWeekTodos()
        .then(d => this.weekTodos = this.prepareWeekTodos(d))
    },
    computed: {
      days() {
        const weekDates = this.getWeekDates()
          .map(d => format(new Date(d), 'EEEE - d MMMM'))

        return weekDates.map((title, i) => {
          const day = ++i
          console.info('%c day SERGEY',
            'color: white; background-color: #2274A5',
            day);
          const todos = this.weekTodos.filter(t => t.weekDay === day)
          return {title, todos}
        })
      }
    },
    methods: {
      prepareWeekTodos(data) {
        this.weekTodosDone = [...data.filter(t => t.isDone)]
        console.info('%c data.filter(t => !t.isDone && !t.weekNumber), SERGEY',
          'color: white; background-color: #2274A5',
          data.filter(t => !t.isDone && !t.weekNumber),);
        
        this.weekTodosUndone = [...data.filter(t => !t.isDone && t.weekDay)]
        
        this.weekTodosNotPlanned = [...data.filter(t => !t.isDone && !t.weekDay)]


        this.weekTodosUndone.sort((a, b) => {
          if (a.weekDay > b.weekDay)  return 1
          if (a.weekDay < b.weekDay)  return -1

          return 0
        })


        return [
          ...this.weekTodosUndone,
          ...this.weekTodosNotPlanned,
          ...this.weekTodosDone
        ]
      },
      getWeekDates() {
        let weekDays = []
        const lastWeekDate = lastDayOfISOWeek(new Date())
        for (let i = 6; i >= 1; i--) {
          weekDays.push(subDays(lastWeekDate, i))
        }

        weekDays.push(lastWeekDate)
        return weekDays
      },
      updateTodoItem(todo, day) {
        const {title, groupTitle, isDone} = todo
        if (day) {
          todo.weekDay = day === todo.weekDay ? null : day
        }
        api.updateTodoWeekItem(title, groupTitle, this.weekNumber, todo.weekDay, isDone)
      }
    }
  }
</script>

<style scoped>

</style>
