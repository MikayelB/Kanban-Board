<template>
  <div class="flex justify-center items-center overflow-x-auto">
    <button
      @click="openCreateTaskModal"
      class="bg-slate-950 hover:bg-slate-950/75 text-white font-bold py-2 px-4 rounded h-auto min-h-10 whitespace-nowrap"
    >
      Create a Task
    </button>
    <div class="flex grid-cols-3 justify-center space-x-10 p-20 h-[100vh]">
      <div
        v-for="column in columns"
        :key="column.id"
        class="bg-gray-200 rounded-lg w-80 p-4 flex flex-col h-full"
      >
        <h2 class="text-xl font-bold mb-4 text-center">{{ column.title }}</h2>
        <div class="space-y-4 overflow-y-auto flex-grow">
          <div v-for="task in column.tasks" :key="task.id">
            <TaskCard :task="task" />
          </div>
        </div>
      </div>
    </div>
    <CreateTaskModal ref="createTaskModal" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "~/stores/tasks";
import CreateTaskModal from "~/components/CreateTaskModal.vue";
import { onMounted } from "vue";

const createTaskModal = ref(null);
const taskStore = useTaskStore();

taskStore.getTasks();

const openCreateTaskModal = () => {
  createTaskModal.value.openModal();
};

onMounted(() => {
  console.log(`the component is now mounted.`);
  console.log(taskStore);
  console.log(taskStore.getAllTasks());
});
const columns = computed(() => [
  {
    id: 1,
    title: "ToDo",
    tasks: taskStore.tasks.filter((task) => task.status === "todo"),
  },
  {
    id: 2,
    title: "In Progress",
    tasks: taskStore.tasks.filter((task) => task.status === "in-progress"),
  },
  {
    id: 3,
    title: "Done",
    tasks: taskStore.tasks.filter((task) => task.status === "done"),
  },
]);
</script>
