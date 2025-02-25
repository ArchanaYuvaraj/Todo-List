document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const timeInput = document.getElementById("timeInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.time));
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(li => {
            tasks.push({
                text: li.querySelector("span").textContent,
                time: li.querySelectorAll("span")[1].textContent
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        const taskTime = timeInput.value.trim();
        if (taskText === "" || taskTime === "") return;
        
        addTaskToDOM(taskText, taskTime);
        saveTasks();
        
        taskInput.value = "";
        timeInput.value = "";
    }

    // Function to add a task to the DOM
    function addTaskToDOM(taskText, taskTime) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <span>${taskTime}</span>
            <button class="delete-btn">X</button>
        `;

        // Toggle task completion on click
        li.addEventListener("click", function () {
            li.classList.toggle("completed");
            saveTasks();
        });

        // Delete task on button click
        li.querySelector(".delete-btn").addEventListener("click", function (e) {
            e.stopPropagation(); // Prevent marking task as completed
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
    }

    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});


