<template>
  <div
    class="todo-item"
    :class="{
      'todo-border': type === 'todo',
      'complete-border': type === 'complete',
    }"
  >
    <div class="todo-item-content">
      <el-input
        ref="inputRef"
        v-if="showInput"
        v-model="inputValue"
        placeholder="请输入代办事项"
        @blur="handleBlur"
      />
      <span v-else>{{ item.content }}</span>
    </div>
    <div class="todo-item-button" v-if="type === 'todo'">
      <el-button type="primary" @click="handleFinish">完成</el-button>
      <el-button type="info" @click="handleUpdate">修改</el-button>
      <el-button type="danger" @click="handleDelete">删除</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ITodoItem, TState } from "@/store/todo";
import { PropType, ref, nextTick } from "vue";
import { useTodoStore } from "@/store/todo";
import { ElMessageBox } from "element-plus";

defineOptions({
  name: "TodoItem",
});

const props = defineProps({
  type: {
    type: String as PropType<TState>,
    default: "todo",
  },
  item: {
    type: Object as PropType<ITodoItem>,
    required: true,
  },
});

const todoStore = useTodoStore();
const showInput = ref(false);
const inputValue = ref("");
const inputRef = ref();

async function handleFinish() {
  try {
    const confirmRes = await ElMessageBox.confirm("确实完成？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });

    if (confirmRes !== "confirm") return;
    todoStore.updateTodoItem(props.item.id, props.item.time, {
      state: "complete",
    });
  } catch (e) {
    console.error(e);
  }
}

async function handleUpdate() {
  inputValue.value = props.item.content;
  showInput.value = true;
  await nextTick(() => {
    inputRef.value?.focus();
  });
}

function handleBlur() {
  todoStore.updateTodoItem(props.item.id, props.item.time, {
    content: inputValue.value,
  });
  showInput.value = false;
}

async function handleDelete() {
  const confirmRes = await ElMessageBox.confirm("确定删除吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  });
  if (confirmRes !== "confirm") return;

  todoStore.deleteTodoItem(props.item.id, props.item.time);
}
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;

  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  span {
    font-size: 16px;
  }
}

.todo-border {
  border: 1px solid #e6a23c;
}

.complete-border {
  border: 1px solid #67c23a;
}
</style>
