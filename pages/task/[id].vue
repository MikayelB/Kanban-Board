<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 m-4 border-2 border-yellow-600"
    >
      <div class="flex justify-between items-start mb-6">
        <h1 class="text-3xl font-bold text-gray-800">{{ taskInfo.title }}</h1>
        <button
          @click="deleteTask"
          class="text-red-400 hover:text-red-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <p class="text-lg text-gray-600 mb-6">Task ID: {{ taskInfo.id }}</p>
      <div class="bg-gray-100 rounded-lg p-6">
        <p class="text-xl text-gray-700">{{ taskInfo.description }}</p>
      </div>
      <div class="mt-6 flex justify-end">
        <button
          @click="handleGoBackHome"
          class="bg-slate-950 hover:bg-slate-950/75 text-white font-bold py-2 px-4 rounded"
        >
          Go Back Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "~/stores/tasks";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { id } = route.params;

const taskStore = useTaskStore();
const taskInfo = ref(taskStore.getTaskById(id));

watchEffect(async () => {
  taskInfo.value = await taskStore.getTaskById(id);
});

const deleteTask = () => {
  taskStore.deleteTask(id);
  router.push("/");
};

const handleGoBackHome = () => {
  router.push("/");
};
</script>
