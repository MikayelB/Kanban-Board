<template>
  <div class="overflow-x-auto flex justify-center">
    <!-- <div class="overflow-x-auto"> -->
    <div class="flex items-center min-w-max px-10 py-40 h-[100vh]">
      <button
        @click="openCreateTaskModal"
        class="bg-slate-950 hover:bg-slate-950/75 text-white font-bold py-2 px-4 rounded h-auto min-h-10 whitespace-nowrap mr-8"
      >
        Create a Task
      </button>
      <div
        class="flex grid-cols-3 justify-center px-10 py-40 h-[100vh]"
        v-for="column in columns"
        :key="column.id"
      >
        <KanbanColumn
          :title="column.title"
          :status="column.status"
          :tasks="column.tasks"
          @drop="onDrop"
        />
      </div>
    </div>
    <CreateTaskModal ref="createTaskModal" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "~/stores/tasks";
import CreateTaskModal from "~/components/CreateTaskModal.vue";

const createTaskModal = ref(null);
const taskStore = useTaskStore();

taskStore.getTasks();

const openCreateTaskModal = () => {
  createTaskModal.value.openModal();
};

const columns = computed(() => [
  {
    id: 1,
    title: "To Do",
    status: "toDo",
    tasks: taskStore.tasks.filter((task) => task.status === "toDo"),
  },
  {
    id: 2,
    title: "In Progress",
    status: "inProgress",
    tasks: taskStore.tasks.filter((task) => task.status === "inProgress"),
  },
  {
    id: 3,
    title: "Done",
    status: "done",
    tasks: taskStore.tasks.filter((task) => task.status === "done"),
  },
]);

const onDrop = (taskId, newStatus) => {
  taskStore.updateTaskStatus(taskId, newStatus);
};
</script>
