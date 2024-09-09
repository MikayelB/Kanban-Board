<template>
  <div
    class="bg-gray-100 p-4 rounded-lg shadow-md w-80 mx-2 flex flex-col h-full border-2 border-yellow-600"
    @dragover.prevent
    @drop="onDrop"
  >
    <h2 class="text-xl font-bold mb-4 text-center">{{ title }}</h2>
    <div class="space-y-4 overflow-y-auto flex-grow">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @dragstart="onDragStart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import TaskCard from "./TaskCard.vue";
import type { Task } from "~/types/Task";

const props = defineProps<{
  title: string;
  status: "toDo" | "inProgress" | "done";
  tasks: Task[];
}>();
const emit = defineEmits(["drop"]);

const onDragStart = (task: Task) => {
  // You can add any additional logic here if needed
};

const onDrop = (event: DragEvent) => {
  const taskId = event.dataTransfer?.getData("text/plain");
  if (taskId) {
    emit("drop", taskId, props.status);
  }
};
</script>
