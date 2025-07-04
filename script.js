// Data storage (in-memory)
let tasks = [];
let currentFilter = "all";
let editingTaskId = null;

// Theme toggle
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle");
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);

  // Update button text and add smooth transition
  if (newTheme === "dark") {
    themeToggle.innerHTML =
      '<span class="theme-icon">☀️</span><span class="theme-text">Light Mode</span>';
  } else {
    themeToggle.innerHTML =
      '<span class="theme-icon">🌙</span><span class="theme-text">Dark Mode</span>';
  }

  // Save theme preference
  localStorage.setItem("theme", newTheme);
}

// Task management
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const categoryInput = document.getElementById("categoryInput");
  const priorityInput = document.getElementById("priorityInput");
  const dueDateInput = document.getElementById("dueDateInput");

  if (taskInput.value.trim() === "") {
    alert("Mohon masukkan nama tugas!");
    return;
  }

  const task = {
    id: generateId(),
    text: taskInput.value.trim(),
    category: categoryInput.value,
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(task);

  // Clear inputs
  taskInput.value = "";
  dueDateInput.value = "";

  renderTasks();
  updateStats();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
    updateStats();
  }
}

function deleteTask(id) {
  if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
    tasks = tasks.filter((t) => t.id !== id);
    renderTasks();
    updateStats();
  }
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    editingTaskId = id;
    document.getElementById("editTaskInput").value = task.text;
    document.getElementById("editCategoryInput").value = task.category;
    document.getElementById("editPriorityInput").value = task.priority;
    document.getElementById("editDueDateInput").value = task.dueDate;
    document.getElementById("editModal").classList.add("show");
  }
}

function updateTask() {
  const task = tasks.find((t) => t.id === editingTaskId);
  if (task) {
    task.text = document.getElementById("editTaskInput").value;
    task.category = document.getElementById("editCategoryInput").value;
    task.priority = document.getElementById("editPriorityInput").value;
    task.dueDate = document.getElementById("editDueDateInput").value;

    closeEditModal();
    renderTasks();
    updateStats();
  }
}

function closeEditModal() {
  document.getElementById("editModal").classList.remove("show");
  editingTaskId = null;
}

// Filtering and sorting
function setFilter(filter) {
  currentFilter = filter;

  // Remove active class from all filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Add active class to the appropriate button
  if (filter === "all") {
    document.querySelector(".filter-all").classList.add("active");
  } else if (filter === "active") {
    document.querySelector(".filter-active").classList.add("active");
  } else if (filter === "completed") {
    document.querySelector(".filter-completed").classList.add("active");
  }

  renderTasks();
}

function filterTasks() {
  renderTasks();
}

function sortTasks(sortBy) {
  switch (sortBy) {
    case "date-asc":
      tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case "date-desc":
      tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case "priority":
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      tasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
      break;
    case "duedate":
      tasks.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      break;
  }
  renderTasks();
}

// Rendering
function renderTasks() {
  const todoList = document.getElementById("todoList");
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  let filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.text.toLowerCase().includes(searchTerm) ||
      task.category.toLowerCase().includes(searchTerm);

    if (currentFilter === "all") return matchesSearch;
    if (currentFilter === "active") return !task.completed && matchesSearch;
    if (currentFilter === "completed") return task.completed && matchesSearch;

    return matchesSearch;
  });

  if (filteredTasks.length === 0) {
    todoList.innerHTML = `
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                        <h3>Tidak ada tugas ditemukan</h3>
                        <p>Coba ubah filter atau kata kunci pencarian</p>
                    </div>
                `;
    return;
  }

  todoList.innerHTML = filteredTasks
    .map((task) => {
      const dueDate = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("id-ID")
        : "";
      const categoryColors = {
        personal: "#8b5cf6",
        work: "#3b82f6",
        shopping: "#10b981",
        health: "#ef4444",
        study: "#f59e0b",
      };

      return `
                    <div class="todo-item ${
                      task.completed ? "completed" : ""
                    }" draggable="true" data-id="${task.id}">
                        <div class="priority ${task.priority}"></div>
                        <input type="checkbox" class="todo-checkbox" ${
                          task.completed ? "checked" : ""
                        } 
                               onchange="toggleTask('${task.id}')" />
                        <div class="todo-content">
                            <div class="todo-text">${task.text}</div>
                            <div class="todo-meta">
                                <span class="todo-category" style="background: ${
                                  categoryColors[task.category]
                                }">
                                    ${task.category}
                                </span>
                                ${
                                  dueDate
                                    ? `<span class="todo-date">📅 ${dueDate}</span>`
                                    : ""
                                }
                            </div>
                        </div>
                        <div class="todo-actions">
                            <button class="btn-icon btn-edit" onclick="editTask('${
                              task.id
                            }')">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                </svg>
                            </button>
                            <button class="btn-icon btn-delete" onclick="deleteTask('${
                              task.id
                            }')">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
    })
    .join("");

  // Setup drag and drop
  setupDragAndDrop();
}

function updateStats() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const progressPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  document.getElementById("totalTasks").textContent = totalTasks;
  document.getElementById("completedTasks").textContent = completedTasks;
  document.getElementById("activeTasks").textContent = activeTasks;
  document.getElementById("progressPercent").textContent =
    progressPercent + "%";
  document.getElementById("progressBar").style.width = progressPercent + "%";
}

// Drag and Drop
function setupDragAndDrop() {
  const items = document.querySelectorAll(".todo-item");
  let draggedItem = null;

  items.forEach((item) => {
    item.addEventListener("dragstart", function (e) {
      draggedItem = this;
      this.classList.add("dragging");
    });

    item.addEventListener("dragend", function (e) {
      this.classList.remove("dragging");
    });

    item.addEventListener("dragover", function (e) {
      e.preventDefault();
      const draggingItem = document.querySelector(".dragging");
      const siblings = [...this.parentNode.children];
      const draggingIndex = siblings.indexOf(draggingItem);
      const targetIndex = siblings.indexOf(this);

      if (draggingIndex < targetIndex) {
        this.after(draggingItem);
      } else {
        this.before(draggingItem);
      }
    });
  });

  document.querySelector(".todo-list").addEventListener("drop", function (e) {
    e.preventDefault();

    // Update task order in array
    const items = document.querySelectorAll(".todo-item");
    const newOrder = [];
    items.forEach((item) => {
      const id = item.getAttribute("data-id");
      const task = tasks.find((t) => t.id === id);
      if (task) newOrder.push(task);
    });
    tasks = newOrder;
  });
}

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && document.activeElement.id === "taskInput") {
    addTask();
  }
  if (
    e.key === "Escape" &&
    document.getElementById("editModal").classList.contains("show")
  ) {
    closeEditModal();
  }
});

// Initialize
function initializeApp() {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);

  // Set initial button state
  const themeToggle = document.querySelector(".theme-toggle");
  if (savedTheme === "dark") {
    themeToggle.innerHTML =
      '<span class="theme-icon">☀️</span><span class="theme-text">Light Mode</span>';
  } else {
    themeToggle.innerHTML =
      '<span class="theme-icon">🌙</span><span class="theme-text">Dark Mode</span>';
  }

  renderTasks();
  updateStats();

  // Set today's date as default
  document.getElementById("dueDateInput").valueAsDate = new Date();
}

// Initialize app
initializeApp();
