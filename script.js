class TodoApp {
  constructor() {
    this.todos = this.loadTodos();
    this.currentFilter = "all";
    this.init();
  }

  init() {
    // Event listeners
    document
      .getElementById("addBtn")
      .addEventListener("click", () => this.addTodo());
    document.getElementById("todoInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTodo();
    });

    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        this.currentFilter = e.target.dataset.filter;
        this.render();
      });
    });

    this.render();
  }

  loadTodos() {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  }

  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();

    if (text === "") {
      input.focus();
      return;
    }

    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.todos.unshift(todo);
    this.saveTodos();
    this.render();

    input.value = "";
    input.focus();
  }

  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
      this.render();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveTodos();
    this.render();
  }

  getFilteredTodos() {
    switch (this.currentFilter) {
      case "active":
        return this.todos.filter((t) => !t.completed);
      case "completed":
        return this.todos.filter((t) => t.completed);
      default:
        return this.todos;
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("id-ID", options);
  }

  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter((t) => t.completed).length;
    const active = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("activeTasks").textContent = active;
    document.getElementById("completedTasks").textContent = completed;
  }

  render() {
    const todoList = document.getElementById("todoList");
    const filteredTodos = this.getFilteredTodos();

    if (filteredTodos.length === 0) {
      todoList.innerHTML = `
                        <div class="empty-state">
                            <p>Tidak ada tugas ${
                              this.currentFilter === "completed"
                                ? "yang selesai"
                                : this.currentFilter === "active"
                                ? "yang aktif"
                                : ""
                            }.</p>
                        </div>
                    `;
    } else {
      todoList.innerHTML = filteredTodos
        .map(
          (todo) => `
                        <li class="todo-item ${
                          todo.completed ? "completed" : ""
                        }" data-id="${todo.id}">
                            <div class="checkbox" onclick="todoApp.toggleTodo(${
                              todo.id
                            })"></div>
                            <div class="todo-content">
                                <div class="todo-text">${this.escapeHtml(
                                  todo.text
                                )}</div>
                                <div class="todo-date">${this.formatDate(
                                  todo.createdAt
                                )}</div>
                            </div>
                            <button class="delete-btn" onclick="event.stopPropagation(); todoApp.deleteTodo(${
                              todo.id
                            })">
                                Hapus
                            </button>
                        </li>
                    `
        )
        .join("");
    }

    this.updateStats();
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the app
const todoApp = new TodoApp();
