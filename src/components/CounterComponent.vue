<template>
  <div>
    <el-tag> {{ counterStroe.count }}</el-tag>
    <el-tag> {{ counterStroe.double }} </el-tag>
    <el-button type="primary" @click="handleClick">+1</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useCounter } from "@/store/counter";

// 使用store
const counterStroe = useCounter();

onMounted(() => {
  // 访问state和getters
  console.log(counterStroe.count);
  console.log(counterStroe.double);
});

function handleClick() {
  // 调用actions
  counterStroe.increment();
}
</script>
