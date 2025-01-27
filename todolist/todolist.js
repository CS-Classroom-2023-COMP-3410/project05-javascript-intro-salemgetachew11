document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const todoList = document.getElementById('todoList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Save tasks to localStorage
    const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));

    // Render tasks
    const renderTasks = (filter = 'all') => {
        todoList.innerHTML = '';
        tasks
            .filter(task => {
                if (filter === 'completed') return task.completed;
                if (filter === 'pending') return !task.completed;
                return true;
            })
            .forEach((task, index) => {
                const li = document.createElement('li');
                li.className = `todo-item ${task.completed ? 'completed' : ''}`;
                li.draggable = true;
                li.dataset.index = index;

                li.innerHTML = `
                    <button class="drag-btn">⠿</button>
                    <span>${task.text}</span>
                    <div>
                        <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                        <button onclick="editTask(${index}, this)">Edit</button>
                        <button onclick="deleteTask(${index})">Delete</button>
                    </div>
                `;

                li.addEventListener('dragstart', handleDragStart);
                li.addEventListener('dragover', handleDragOver);
                li.addEventListener('drop', handleDrop);
                li.addEventListener('dragend', handleDragEnd);

                todoList.appendChild(li);
            });
    };

    // Add task
    const addTask = () => {
        const text = newTaskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            saveTasks();
            renderTasks();
            newTaskInput.value = '';
        }
    };

    // Toggle task completion
    window.toggleTask = index => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    // Edit task
    window.editTask = (index, button) => {
        const taskItem = button.closest('.todo-item');
        const taskTextElement = taskItem.querySelector('span');
        const currentText = taskTextElement.textContent;

        // Create input field for editing
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';
        taskItem.replaceChild(input, taskTextElement);

        // Change "Edit" button to "Save"
        button.textContent = 'Save';
        button.onclick = () => saveEdit(index, input, button);
    };

    // Save edited task
    const saveEdit = (index, input, button) => {
        const newText = input.value.trim();
        if (newText) {
            tasks[index].text = newText;
            saveTasks();
            renderTasks();
        } else {
            alert('Task cannot be empty!');
        }
    };

    // Delete task
    window.deleteTask = index => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Drag-and-drop handlers
    let draggedIndex;

    const handleDragStart = (event) => {
        draggedIndex = +event.target.closest('.todo-item').dataset.index;
        event.target.closest('.todo-item').classList.add('dragging');
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Required to allow drop
        const afterElement = getDragAfterElement(todoList, event.clientY);
        const draggingElement = document.querySelector('.dragging');
        if (afterElement == null) {
            todoList.appendChild(draggingElement);
        } else {
            todoList.insertBefore(draggingElement, afterElement);
        }
    };

    const handleDrop = () => {
        const draggedTask = tasks[draggedIndex];
        const newIndex = Array.from(todoList.children).indexOf(document.querySelector('.dragging'));
        
        // Update tasks array
        tasks.splice(draggedIndex, 1);
        tasks.splice(newIndex, 0, draggedTask);

        saveTasks();
        renderTasks();
    };

    const handleDragEnd = (event) => {
        event.target.closest('.todo-item').classList.remove('dragging');
    };

    const getDragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.todo-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    };

    // Filter tasks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderTasks(button.id.replace('filter', '').toLowerCase());
        });
    });

    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', e => e.key === 'Enter' && addTask());

    renderTasks();
});
