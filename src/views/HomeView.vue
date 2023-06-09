<template>
  <div class="home">
    <el-row class="todo-container" :gutter="50">
      <el-col :span="12">
        <TodoList />
      </el-col>
      <el-col :span="12">
        <CompleteList />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoList from "@/components/TodoList.vue";
import CompleteList from "@/components/CompleteList.vue";

export default defineComponent({
  name: "HomeView",
  components: { CompleteList, TodoList },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .todo-container {
    width: 100%;
  }
}
</style>
