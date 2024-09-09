import type { Task } from "~/types/Task";

const API_BASE_URL = "http://localhost:3000";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
  }),
  actions: {
    async getTasks() {
      this.loading = true;
      const data = await fetch(`${API_BASE_URL}/tasks`);
      this.tasks = await data.json();
      this.loading = false;
    },
    async addTask(task: Task) {
      if (!task.title) {
        console.log("No title");
        return;
      }

      const newTask = { ...task, id: crypto.randomUUID() };
      this.tasks.push(newTask);

      await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      }).catch((err) => console.log(err));
    },
    async deleteTask(id: string) {
      this.tasks = this.tasks.filter((t) => t.id !== id);

      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
      }).catch((err) => console.log(err));
    },
    async updateTaskStatus(id: string, newStatus: Task["status"]) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.status = newStatus;
      }

      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }).catch((err) => console.log(err));
    },
    async getTaskById(id: string) {
      if (this.tasks.length > 0) return this.tasks.find((t) => t.id === id);

      try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw createError({
            statusCode: response.status,
            statusMessage: `Task with ID ${id} not found`,
            fatal: true,
          });
        }

        const task = await response.json();
        return task;
      } catch (error: any) {
        throw createError({
          statusCode: error.statusCode || 500,
          statusMessage:
            error.message || "An error occurred while fetching the task",
          fatal: true,
        });
      }
    },
  },
});
