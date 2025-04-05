// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the UI
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('taskItem');
        
        // Adding class for priority color
        taskItem.classList.add(task.priority);

        if (task.completed) taskItem.classList.add('completed');

        taskItem.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button onclick="toggleCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

// Add a new task
document.getElementById('addButton').addEventListener('click', () => {
    const taskName = document.getElementById('taskInput').value.trim();
    const priority = document.getElementById('prioritySelect').value;

    if (taskName === '') return;

    const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false,
        priority: priority === 'none' ? 'low' : priority // Default to low if no priority selected
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    document.getElementById('taskInput').value = '';
    document.getElementById('prioritySelect').value = 'none';
});

// Toggle task completion
function toggleCompletion(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

// Edit a task
function editTask(id) {
    const newName = prompt('Edit Task Name:');
    if (newName === null || newName === '') return;

    const task = tasks.find(task => task.id === id);
    task.name = newName;
    saveTasks();
    renderTasks();
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Filter tasks
document.getElementById('allBtn').addEventListener('click', () => {
    filter = 'all';
    renderTasks();
});

document.getElementById('activeBtn').addEventListener('click', () => {
    filter = 'active';
    renderTasks();
});

document.getElementById('completedBtn').addEventListener('click', () => {
    filter = 'completed';
    renderTasks();
});

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Initial render
renderTasks();
