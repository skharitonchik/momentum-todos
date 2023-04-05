class JsonDataService {
  constructor(dataServer) {
    this.dataServer = dataServer
  }

  getAllData() {
    return fetch(`${this.dataServer}/read`)
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
        return data
      })
      .catch((e) => {
        console.info('%c e getAllData SERGEY',
          'color: white; background-color: #2274A5',
          e);
        return e
      })
  }

  getWeekTodos () {
    return fetch(`${this.dataServer}/getAllWeek`)
      .then(r => {
        console.info('%c r SERGEY',
          'color: white; background-color: #2274A5',
          r);
        return r.json()
      })
      .then((data) => {
        console.info('%c getWeekTodos SERGEY',
          'color: white; background-color: #2274A5',
          data);
        return data
      })
      .catch((e) => {
        console.info('%c e getWeekTodos SERGEY',
          'color: white; background-color: #2274A5',
          e);
        return e
      })
  }


  updateAllData(data) {
    return fetch(`${this.dataServer}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then((resp) => {
        console.info('%c resp SERGEY',
          'color: white; background-color: #2274A5',
          resp);

      })
      .catch((err) => {
        console.info('%c err updateAllData SERGEY',
          'color: white; background-color: #2274A5',
          err);
        return err
      })
  }

  updateTodoItem(todoTitle, groupTitle, isDone) {
    return fetch(`${this.dataServer}/update/todo-done`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({todoTitle, groupTitle, isDone})
    })
      .then((resp) => {
        console.info('%c resp updateTodo SERGEY',
          'color: white; background-color: #2274A5',
          resp);
      })
      .catch((err) => {
        console.info('%c err updateTodoItem SERGEY',
          'color: white; background-color: #2274A5',
          err);

        return err
      })
  }

  updateTodoWeekItem(todoTitle, groupTitle, weekNumber, weekDay, isDone) {
    return fetch(`${this.dataServer}/update/todo-week`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({todoTitle, groupTitle, weekNumber, weekDay, isDone})
    })
      .then((resp) => {
        console.info('%c resp updateTodo SERGEY',
          'color: white; background-color: #2274A5',
          resp);
      })
      .catch((err) => {
        console.info('%c err updateTodoItem SERGEY',
          'color: white; background-color: #2274A5',
          err);

        return err
      })
  }



  sortAllByDone() {
    return fetch(`${this.dataServer}/update/sort-by-done`)
      .catch((e) => {
        console.info('%c e sortAllByDone SERGEY',
          'color: white; background-color: #2274A5',
          e);
        return e
      })
  }
  sortAllByLength() {
    return fetch(`${this.dataServer}/update/sort-by-length`)
      .catch((e) => {
        console.info('%c e sortAllByLength SERGEY',
          'color: white; background-color: #2274A5',
          e);
        return e
      })
  }


  clearDoneItems () {
    return fetch(`${this.dataServer}/clearDone`)
      .catch((e) => {
          console.info('%c e clearDoneItems SERGEY',
                      'color: white; background-color: #2274A5',
                      e);
      })
  }
}

export const api = new JsonDataService('http://localhost:8088')
