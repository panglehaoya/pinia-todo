import { defineStore } from "pinia";

export type ITodoItem = {
  id: string;
  time: string;
  content: string;
  state: TState;
};

export interface ITodoList {
  [time: string]: Array<ITodoItem>;
}

export type TState = "todo" | "complete";

function getTodoList(): ITodoList {
  const list = localStorage.getItem("todo");

  return list ? JSON.parse(list) : {};
}

export const useTodoStore = defineStore("todo", {
  state: () => {
    return {
      list: getTodoList(),
    };
  },
  actions: {
    addTodoList(item: ITodoItem) {
      const time = item.time;
      const todo = this.list[time] || [];
      todo.push(item);
      this.list[time] = todo;

      localStorage.setItem("todo", JSON.stringify(this.list));
    },
    updateTodoItem(
      id: string,
      time: string,
      options: { content?: string; state?: TState }
    ) {
      const list = this.list[time];
      list.forEach((listItem) => {
        if (listItem.id === id) {
          options.content && (listItem.content = options.content);
          options.state && (listItem.state = options.state);
        }
      });

      localStorage.setItem("todo", JSON.stringify(this.list));
    },
    deleteTodoItem(id: string, time: string) {
      const list = this.list[time];
      const index = list.findIndex((item) => item.id === id);
      list.splice(index, 1);

      localStorage.setItem("todo", JSON.stringify(this.list));
    },
  },
});
