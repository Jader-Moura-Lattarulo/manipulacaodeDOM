let tasks = [
    {id: 1, description: 'comprar pão', checked: false},
    {id: 2, description: 'passear com o cachorro', checked: false},
    {id: 3, description: 'fazer almoço', checked: false},
    {id: 4, description: 'estudar', checked: false},
]

//manipular o checkbox
const getCheckBoxInput = ({ id, description, checked }) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkboxId = `${id}-checkbox`; 

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = checked;
    
    label.textContent = description;
    label.htmlFor = checkboxId;

    wrapper.className = 'checkbox-label-container';

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper;
}

//onload - carrega quando toda a página estiver pronta
window.onload = function(){
    tasks.forEach((task) => {
        const checkbox = getCheckBoxInput(task);

        const list = document.getElementById('todo-list');
        const toDo = document.createElement('li');
        // const button = document.createElement('button');

        toDo.id = task.id;
        toDo.appendChild(checkbox);
        // toDo.appendChild(button);

        list.appendChild(toDo);
    })
}

