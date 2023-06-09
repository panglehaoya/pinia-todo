<template>
  <div class="complete-list">
    <div class="complete-list-title">
      <span>完成列表</span>
      <SearchBar @search="handleSearch" />
    </div>
    <div class="todo-list-complete">
      <div class="search-list" v-if="showSearchList">
        <TodoItem v-for="item in searchList" :key="item.id" :item="item" />
      </div>
      <el-collapse v-else v-model="activeName">
        <el-collapse-item
          v-for="(value, key) in completeList"
          :title="key"
          :name="key"
          :key="key"
        >
          <div v-for="(item, index) in value" :key="index">
            <TodoItem type="complete" :item="item" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ITodoList } from "@/store/todo";
import { ref, onMounted, watch } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import TodoItem from "@/components/TodoItem.vue";
import { useTodoStore } from "@/store/todo";
import dayjs from "dayjs";
import { useSearch } from "@/hooks/useSearch";

const todoStore = useTodoStore();
const activeName = ref("");
const completeList = ref<ITodoList>({});
const { showSearchList, searchList, handleSearch } = useSearch(completeList);

onMounted(() => {
  activeName.value = dayjs().format("YYYY-MM-DD");
});

watch(
  () => todoStore.list,
  (value) => {
    const newList: ITodoList = {};
    for (let key in value) {
      const tempArr = value[key].filter((item) => item.state === "complete");
      tempArr.length && (newList[key] = tempArr);
    }

    completeList.value = newList;
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
.complete-list {
  width: 100%;
  height: 100vh;
  border: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
  .complete-list-title {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    span {
      height: 50px;
      font-size: 18px;
      color: #409eff;
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
