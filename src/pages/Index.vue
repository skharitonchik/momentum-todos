<template>
  <q-page class="">
    <div>
      <q-btn class="gt-xs" flat dense round icon="save" @click="() => saveAll()"/>
    </div>
    <div class="fit row wrap justify-start items-start content-start q-pa-md">
      <q-list v-for="(todoGroup, groupIndex) in todoGroups"
              :key="todoGroup.groupTitle">
        <q-item-label
          header
        >
          {{todoGroup.groupTitle}}
        </q-item-label>
        <q-item v-for="(todo, index) in todoGroup.todos"
                :key="todo.title"
                :class="{'momentum-done': todo.isDone}"
        >

          <q-item-section>
            <q-item-label>{{todo.title}}</q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-toggle
                v-model="todo.isDone"
                color="positive"
                icon="task_alt"
              />
              <q-toggle
                v-model="todo.isTodayTodo"
                color="positive"
                icon="today"
              />
              <!--<q-btn class="gt-xs" flat dense round :color="todo.isDone ? 'positive' : 'accent'" icon="task_alt" @click="() => isDoneToggle(groupIndex, index)" />-->
              <!--<q-btn class="gt-xs" flat dense round :color="todo.isTodayTodo ? 'positive' : 'accent'" icon="today" @click="isTodayToggle" />-->
              <q-btn class="gt-xs" flat dense round icon="north" @click="() => orderInc(todoGroup, index)"/>
              <q-btn class="gt-xs" flat dense round icon="south" @click="() => orderDec(todoGroup, index)"/>
              <q-btn class="gt-xs" flat dense round icon="delete" @click="() => removeTodo(todoGroup, index)"/>
            </div>
          </q-item-section>
        </q-item>
        <q-btn v-if="!todoGroup.isNewAdding" round color="primary" icon="add" @click="todoGroup.isNewAdding = true"/>
        <q-form v-if="todoGroup.isNewAdding" action="#" method="post" @submit.prevent="() => addNewTodo(todoGroup)">
          <q-input v-model="todoGroup.newTodoTitle" label="Label" clearable>
            <template v-slot:prepend>
              <q-icon name="event"/>
            </template>
          </q-input>
          <q-btn round color="primary" icon="add" @click="() => addNewTodo(todoGroup)"/>
          <q-btn round color="primary" icon="clear" @click="todoGroup.isNewAdding = false"/>
        </q-form>
      </q-list>
    </div>
  </q-page>
</template>

<script>
  import {defineComponent} from 'vue';

  const DATA_SERVER = 'http://localhost:8088'

  export default {
    name: 'PageIndex',
    data() {
      return {
        todoGroups: [],
        isSaveInProgress: false
      }
    },
    beforeCreate() {
      fetch(`${DATA_SERVER}/read`)
        .then(r => {
          console.info('%c r SERGEY',
            'color: white; background-color: #2274A5',
            r);
          return r.json()
        })
        .then((data) => {
          console.info('%c data SERGEY',
            'color: white; background-color: #2274A5',
            data);
          this.todoGroups = data
        })
        .catch((e) => {
          console.info('%c e SERGEY',
            'color: white; background-color: #2274A5',
            e);
        })
    },
    methods: {
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


        !this.isSaveInProgress && this.saveAll()
      },
      orderDec(group, todoIndex) {
        if (todoIndex !== group.todos.length - 1) {
          let temp = group.todos[todoIndex];
          group.todos[todoIndex] = group.todos[todoIndex + 1];
          group.todos[todoIndex + 1] = temp
        }


        !this.isSaveInProgress && this.saveAll()
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

        !this.isSaveInProgress && this.saveAll()
      },
      removeTodo(todoGroup, index) {
        todoGroup.todos.splice(index, 1)
      },
      saveAll() {
        this.isSaveInProgress = true

        fetch(`${DATA_SERVER}/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(this.todoGroups)
        })
          .then((resp) => {
              console.info('%c resp SERGEY',
                          'color: white; background-color: #2274A5',
                          resp);

          })
          .catch((err) => {
              console.info('%c err SERGEY',
                          'color: white; background-color: #2274A5',
                          err);
          })
          .finally(() => {
              this.isSaveInProgress = false
          })
      }
    }
  }
</script>
