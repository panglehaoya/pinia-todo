import { defineStore } from "pinia";

export const useCounter = defineStore("store", {
  state: () => {
    return {
      count: 0,
    };
  },
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      return this.count++;
    },
  },
});
