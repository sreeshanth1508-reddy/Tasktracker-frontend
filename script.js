document.addEventListener('DOMContentLoaded', () => {
    // Welcome Screen Logic
    const welcomeScreen = document.getElementById('welcomeScreen');
    const enterAppBtn = document.getElementById('enterAppBtn');
    const mainApp = document.getElementById('mainApp');

    enterAppBtn.addEventListener('click', () => {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainApp.style.display = 'flex';
            setTimeout(() => {
                mainApp.style.opacity = '1';
                mainApp.style.transition = 'opacity 0.5s ease';
            }, 50);
        }, 800); // Matches the CSS transition duration
    });

    const taskInput = document.getElementById('taskInput');
    const taskDescInput = document.getElementById('taskDescInput');
    const deadlineInput = document.getElementById('deadlineInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Initialize
    renderTasks();

    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const text = taskInput.value.trim();
        const desc = taskDescInput.value.trim();
        if (text === '') return;

        const deadlineVal = deadlineInput.value;

        const newTask = {
            id: Date.now().toString(),
            text: text,
            description: desc,
            completed: false,
            createdAt: new Date().toISOString(),
            deadline: deadlineVal ? new Date(deadlineVal).toISOString() : null
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskDescInput.value = '';
        deadlineInput.value = '';
        taskInput.focus();
    }

    function toggleTask(id) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
    }

    function deleteTask(id) {
        const taskToDelete = tasks.find(task => task.id === id);
        if (taskToDelete && !taskToDelete.completed) {
            alert("The task is not yet completed");
            return;
        }
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateCount();
    }

    function updateCount() {
        const remaining = tasks.filter(t => !t.completed).length;
        const total = tasks.length;
        
        if (total === 0) {
            taskCount.textContent = 'No tasks';
        } else {
            taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
        }
    }

    function renderTasks() {
        taskList.innerHTML = '';

        if (tasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                    </svg>
                    <p>You're all caught up!</p>
                </div>
            `;
            updateCount();
            return;
        }

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            const createdDate = new Date(task.createdAt || parseInt(task.id));
            const dateString = createdDate.toLocaleDateString();
            const timeString = createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            let deadlineHtml = '';
            if (task.deadline) {
                const deadlineDate = new Date(task.deadline);
                const isOverdue = !task.completed && deadlineDate < new Date();
                const dlDateStr = deadlineDate.toLocaleDateString();
                const dlTimeStr = deadlineDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const colorStyle = isOverdue ? 'color: var(--danger-color); font-weight: 500;' : 'color: var(--accent-color);';
                deadlineHtml = `<span class="task-date" style="${colorStyle}">⏰ Due: ${dlDateStr} at ${dlTimeStr}</span>`;
            }
            
            let descHtml = '';
            if (task.description) {
                descHtml = `<div class="task-desc-display">${escapeHTML(task.description)}</div>`;
            }
            
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <div class="task-content">
                    <span class="task-text">${escapeHTML(task.text)}</span>
                    ${descHtml}
                    <span class="task-date">Created: ${dateString} at ${timeString}</span>
                    ${deadlineHtml}
                </div>
                <button class="delete-btn" aria-label="Delete task">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            `;

            const checkbox = li.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => toggleTask(task.id));

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            taskList.appendChild(li);
        });

        updateCount();
    }

    // Basic XSS protection for task rendering
    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
