import type { ITodoList, ITodoItem } from "@/store/todo";
import { Ref, ref } from "vue";

export function useSearch(list: Ref<ITodoList>) {
  const showSearchList = ref(false);
  const searchList = ref<Array<ITodoItem>>([]);

  function handleSearch(value: string) {
    if (!value) {
      showSearchList.value = false;
      return;
    }
    let temp: Array<ITodoItem> = [];
    for (const key in list.value) {
      temp = temp.concat(list.value[key]);
    }
    searchList.value = temp.filter((item) => item.content.includes(value));
    showSearchList.value = true;
  }

  return { showSearchList, searchList, handleSearch };
}
