let tasks = [
    {id: 1, description: 'comprar pão', checked: false},
    {id: 2, description: 'passear com o cachorro', checked: false},
    {id: 3, description: 'fazer almoço', checked: false},
    {id: 4, description: 'estudar', checked: false},
]

const removeTask = (taskId) => {
    tasks = tasks.filter(({ id }) => parseInt(id) !== parseInt(taskId));

    document
        .getElementById("todo-list")
        .removeChild(document.getElementById(taskId));
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

//manipular o checkbox
const getCheckBoxInput = ({ id, description, checked }) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkboxId = `${id}-checkbox`; 

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = checked || false;
    
    label.textContent = description;
    label.htmlFor = checkboxId;

    wrapper.className = 'checkbox-label-container';

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper;
}

const getNewTaskId = () => {
    const lastId = tasks[tasks.length - 1]?.id;
    return lastId ? lastId + 1 : 1;
}

const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;
    const id = getNewTaskId();

    return { description, id }
}

const createTask = (event) => {
    event.preventDefault();
    const newTaskData = getNewTaskData(event);

    const checkbox = getCheckBoxInput(newTaskData)
    createTaskListItem(getNewTaskData, checkbox);
    
    tasks = [...tasks, { id: newTaskData.id, description: newTaskData.description, checked: false }]
}

//onload - carrega quando toda a página estiver pronta
window.onload = function(){
    const form = document.getElementById('create-todo-form');
    form.addEventListener('submit', createTask);

    tasks.forEach((task) => {
        const checkbox = getCheckBoxInput(task);
        createTaskListItem(task, checkbox);
    })
}

