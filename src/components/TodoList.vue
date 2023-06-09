<template>
  <div class="todo-list">
    <div class="todo-list-title">
      <span>代办列表</span>
      <SearchBar @search="handleSearch" />
      <el-button type="primary" @click="handleShowDialog">新增</el-button>
    </div>
    <div class="todo-list-container">
      <div class="search-list" v-if="showSearchList">
        <TodoItem v-for="item in searchList" :key="item.id" :item="item" />
      </div>
      <el-collapse v-else v-model="activeName">
        <el-collapse-item
          v-for="(value, key) in todoList"
          :title="key"
          :name="key"
          :key="key"
        >
          <div v-for="(item, index) in value" :key="index">
            <TodoItem type="todo" :item="item" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog title="新增代办" width="30%" v-model="showDialog">
      <el-form ref="addForm" :model="formModel" :rules="formRules">
        <el-form-item label="代办内容" prop="content">
          <el-input v-model="formModel.content" placeholder="请输入代办内容" />
        </el-form-item>
        <el-form-item label="代办日期" prop="time">
          <el-date-picker
            v-model="formModel.time"
            type="date"
            placeholder="请输入代办日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">确定</el-button>
          <el-button @click="showDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { ITodoItem, ITodoList } from "@/store/todo";
import type { FormInstance, FormRules } from "element-plus";
import { ref, reactive, onMounted, watch } from "vue";
import { useTodoStore } from "@/store/todo";
import SearchBar from "./SearchBar.vue";
import TodoItem from "./TodoItem.vue";
import dayjs from "dayjs";
import { useSearch } from "@/hooks/useSearch";

const todoStore = useTodoStore();
const activeName = ref("2023-06-08");
const showDialog = ref(false);
const addForm = ref<FormInstance>();
const todoList = ref<ITodoList>({});
const { showSearchList, searchList, handleSearch } = useSearch(todoList);

const formModel = reactive({
  content: "",
  time: "",
});
const formRules = reactive<FormRules>({
  content: [{ required: true, message: "请输入代办内容", trigger: "blur" }],
  time: [{ required: true, message: "请选择代办日期", trigger: "blur" }],
});

watch(
  () => todoStore.list,
  (value) => {
    const newList: ITodoList = {};
    for (let key in value) {
      const tempArr = value[key].filter((item) => item.state === "todo");
      tempArr.length && (newList[key] = tempArr);
    }

    todoList.value = newList;
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  const nowDate = dayjs().format("YYYY-MM-DD");
  activeName.value = nowDate;
});

async function handleAdd() {
  try {
    const validRes = await addForm.value?.validate();
    if (!validRes) return;
    const todoItem: ITodoItem = {
      id: Date.now().toString(),
      time: formModel.time,
      content: formModel.content,
      state: "todo",
    };

    todoStore.addTodoList(todoItem);
    showDialog.value = false;
  } catch (e) {
    console.error(e);
  }
}

function handleShowDialog() {
  addForm.value?.resetFields();
  showDialog.value = true;
}
</script>

<style lang="scss" scoped>
.todo-list {
  width: 100%;
  height: 100vh;
  border: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
  .todo-list-title {
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
