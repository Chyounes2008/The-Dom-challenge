document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const todoList = document.getElementById("todoList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    todoList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task ${task.completed ? "completed" : ""}`;
      li.innerHTML = `
          <span class="title priority-${task.priority}">${task.title}</span>
          <div class="actions">
            <button onclick="toggleComplete(${index})">${
        task.completed ? "Undo" : "Done"
      }</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
      todoList.appendChild(li);
    });
    saveTasks();
  }

  window.toggleComplete = function (index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  };

  window.editTask = function (index) {
    const newTitle = prompt("Edit task:", tasks[index].title);
    if (newTitle) {
      tasks[index].title = newTitle;
      renderTasks();
    }
  };

  window.deleteTask = function (index) {
    if (confirm("Delete this task?")) {
      tasks.splice(index, 1);
      renderTasks();
    }
  };

  addTaskBtn.addEventListener("click", () => {
    const title = taskInput.value.trim();
    const priority = prioritySelect.value;
    if (title) {
      tasks.push({ title, priority, completed: false });
      taskInput.value = "";
      renderTasks();
    }
  });

  renderTasks();
});
