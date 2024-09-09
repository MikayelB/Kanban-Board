<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    @click="closeModal"
    @keydown.esc="closeModal"
    tabindex="0"
  >
    <div class="bg-white p-6 rounded-lg shadow-xl w-96" @click.stop>
      <h2 class="text-2xl font-bold mb-4">Create New Task</h2>
      <p class="text-red-500 font-bold" v-if="!isTitleProvided">
        No Title provided
      </p>
      <input
        v-model="title"
        placeholder="Task Title"
        class="w-full p-2 mb-4 border rounded"
      />
      <p class="text-red-500 font-bold" v-if="!isDescriptionProvided">
        No Title provided
      </p>
      <textarea
        v-model="description"
        placeholder="Task Description"
        class="w-full p-2 mb-4 border rounded h-32 resize-y"
      ></textarea>
      <div class="flex justify-end space-x-2">
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          @click="handleSaveTask"
          class="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTaskStore } from "~/stores/tasks";

const taskStore = useTaskStore();

const isOpen = ref(false);
const isTitleProvided = ref(true);
const isDescriptionProvided = ref(true);
const title = ref("");
const description = ref("");

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
  title.value = "";
  description.value = "";
  isTitleProvided.value = true;
  isDescriptionProvided.value = true;
};

const handleSaveTask = () => {
  if (!title.value && !description.value) {
    isTitleProvided.value = false;
    isDescriptionProvided.value = false;
    return;
  }

  if (!title.value) {
    isTitleProvided.value = false;
    return;
  }
  isTitleProvided.value = true;

  if (!description.value) {
    isDescriptionProvided.value = false;
    return;
  }
  isDescriptionProvided.value = true;

  const newTask = {
    id: undefined,
    title: title.value,
    description: description.value,
    status: "todo",
  };

  console.log("newTask", newTask);
  taskStore.addTask(newTask);
  console.log("Task added, updated store:", taskStore.tasks);
  closeModal();
};

const handleKeyDown = (event) => {
  if (event.key === "Escape" && isOpen.value) {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});

defineExpose({ openModal });
</script>
