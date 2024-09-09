<template>
  <div class="relative group bg-white rounded-md p-4 shadow hover:bg-gray-300">
    <NuxtLink :to="`/task/${task.id}`">
      <div :key="task.id">
        <h3 class="text-lg font-semibold mb-2">
          {{ task.title }}
        </h3>
        <p class="text-sm text-gray-600">{{ taskDescription }}</p>
      </div>
    </NuxtLink>
    <button
      @click.stop="deleteTask(task.id)"
      class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-red-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        onmouseenter="evt.target.setAttribute('fill', 'red')"
        onmouseleave="evt.target.setAttribute('fill', 'currentColor')"
      >
        <path
          fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types/Task";
import { useTaskStore } from "~/stores/tasks";

const props = defineProps<{
  task: Task;
}>();

const taskStore = useTaskStore();

const taskDescription = computed(
  () =>
    props.task.description.slice(0, 38) +
    (props.task.description.length > 38 ? "..." : "")
);

const deleteTask = (id: string) => {
  taskStore.deleteTask(id);
};
</script>

<style scoped></style>
