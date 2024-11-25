const getTasksFromLocalStorage = () => {
    const localTasks = JSON.parse(window.localStorage.getItem('tasks'));
    return localTasks ? localTasks : [];
}

const setTasksInLocaStorage = (tasks) => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

const removeTask = (taskId) => {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(({ id }) => parseInt(id) !== parseInt(taskId));
    setTasksInLocaStorage(updatedTasks);

    document
        .getElementById("todo-list")
        .removeChild(document.getElementById(taskId));

    counterTasks();
}

const removeDoneTasks = () => {
    const tasks = getTasksFromLocalStorage();
    
    const tasksToRemove = tasks
        .filter(({ checked }) => checked)
        .map(({ id }) => id)

    const updatedTasks = tasks.filter(({ checked }) => !checked);
    setTasksInLocaStorage(updatedTasks);
    
    tasksToRemove.forEach((taskToRemove) => {
        document
            .getElementById("todo-list")
            .removeChild(document.getElementById(taskToRemove))
    })

    counterTasks();
}

const createTaskListItem = (task, checkbox) => {
    const list = document.getElementById('todo-list');
    const toDo = document.createElement('li');

    const removeTaskButton = document.createElement('button');
    removeTaskButton.textContent = 'x';
    removeTaskButton.ariaLabel = 'Remover tarefa';

    removeTaskButton.onclick = () => removeTask(task.id);

    toDo.id = task.id;
    toDo.appendChild(checkbox);
    toDo.appendChild(removeTaskButton);
    list.appendChild(toDo);

    return toDo;
}

const onCheckboxClick = (event) => {
    const [id] = event.target.id.split('-');
    const tasks = getTasksFromLocalStorage();
    
    const updatedTasks = tasks.map((task) => {
        return parseInt(task.id) === parseInt(id) 
            ? { ...task, checked: event.target.checked }
            : task
    })
    setTasksInLocaStorage(updatedTasks)
    counterTasks();
}

//manipular o checkbox
const getCheckBoxInput = ({ id, description, checked }) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkboxId = `${id}-checkbox`; 

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = checked || false;
    checkbox.addEventListener('change', onCheckboxClick);
    
    label.textContent = description;
    label.htmlFor = checkboxId;

    wrapper.className = 'checkbox-label-container';

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper;
}

const getNewTaskId = () => {
    const tasks = getTasksFromLocalStorage();
    const lastId = tasks[tasks.length - 1]?.id;
    return lastId ? lastId + 1 : 1;
}

const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;
    const id = getNewTaskId();

    return { description, id }
}

const getCreatedTaskInfo = (event) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(getNewTaskData(event));
    }, 1000)

}) 

const createTask = async (event) => {
    event.preventDefault();
    document.getElementById( 'save-task' ).setAttribute('disabled', true);
    const newTaskData = await getCreatedTaskInfo(event);
    
    const checkbox = getCheckBoxInput(newTaskData)
    createTaskListItem(getNewTaskData, checkbox);
    
    const tasks = getTasksFromLocalStorage();
    
    const updatedTasks = [
        ...tasks, 
        { id: newTaskData.id, description: newTaskData.description, checked: false }
    ]
    setTasksInLocaStorage(updatedTasks)
    
    document.getElementById('description').value = '';
    document.getElementById( 'save-task' ).removeAttribute('disabled');

    counterTasks();
}

const countTotalTasks = () => {
    const tasksTodo = getTasksFromLocalStorage();
    return tasksTodo.length;
}

const countDoneTasks = () => {
    const tasks = getTasksFromLocalStorage();
    const doneTasks = tasks.filter(({ checked }) => checked);
    console.log(doneTasks);
    return doneTasks.length;
}

const counterTasks = () => {
    const doneTasks = countDoneTasks();
    const totalTasks = countTotalTasks();
    const counterTasks = document.getElementById('countCompletedTasks');
    counterTasks.textContent = `${doneTasks}/${totalTasks} concluídas`
}

//onload - carrega quando toda a página estiver pronta
window.onload = function(){
    const form = document.getElementById('create-todo-form');
    form.addEventListener('submit', createTask);

    const tasks = getTasksFromLocalStorage();

    tasks.forEach((task) => {
        const checkbox = getCheckBoxInput(task);
        createTaskListItem(task, checkbox);
    })

    counterTasks();
}
