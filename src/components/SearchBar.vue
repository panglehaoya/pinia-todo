<template>
  <div class="search-bar">
    <el-input
      size="large"
      placeholder="请输入搜索内容"
      v-model="searchValue"
      @input="debounceInput"
    >
      <template v-slot:append>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import { debounce } from "throttle-debounce";

const emit = defineEmits(["search"]);

const searchValue = ref("");

function handleInput() {
  emit("search", searchValue.value);
}

const debounceInput = debounce(300, handleInput);
</script>
