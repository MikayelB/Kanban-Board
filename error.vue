<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 m-4">
      <div class="flex justify-center items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">
          Error {{ error.statusCode }}
        </h1>
      </div>
      <div class="bg-gray-100 rounded-lg p-6 flex justify-center">
        <p class="text-xl text-gray-700">{{ error.message }}</p>
      </div>
      <div class="mt-6 flex justify-end">
        <button
          @click="handleError"
          class="bg-slate-950 hover:bg-slate-950/75 text-white font-bold py-2 px-4 rounded"
        >
          Go Back Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>
