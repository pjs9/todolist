// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);
document.addEventListener("DOMContentLoaded",getTodos);

// adding todos using enter keyword
todoInput.addEventListener('keypress', function(event){
    if(event.keyCode === 13){
        addTodo(event);
    }
})

// Functions
function addTodo(event){
    event.preventDefault();     //prevents form from submitting
    let text = todoInput.value;
    if(text === ""){
        alert("You have to write something!!!");
    }else{
        //create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = text;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo); 
        // Add todo to LOCALSTORAGE
        saveTodos(todoInput.value);   
        //Check Mark Button
        const checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add("check-btn");
        todoDiv.appendChild(checkButton);
        //Check Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Append to List
        todoList.appendChild(todoDiv);
        //Clear the todo input value
        todoInput.value = "";
    }
}

function deleteCheck(e){
    const item = e.target;
    //Delete Todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");    //same as remove however, we're just removing the opacity with animation, the element still stays there. 
        removeLocalTodo(todo);
        // the following function wait until the animation/transition completes
        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
    }
    //Check Mark
    if(item.classList[0] === 'check-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('checked');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    // console.log(todos);
    todos.forEach(function(todo){
       switch(e.target.value){
           case "all":
               todo.style.display = "flex";
               break;
            case "checked":
                if(todo.classList.contains("checked")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "unchecked":
                if(!todo.classList.contains("checked")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
       } 
    });
}

function checkTodos(){
    let localTodo;
    if(localStorage.getItem("localTodo") === null){
        localTodo = [];
    }else{
        localTodo = JSON.parse(localStorage.getItem("localTodo"));
    }
    return localTodo
}

function saveTodos(todo){
    // First check if we already have todos in there???
    let localTodo = checkTodos();
    localTodo.push(todo);
    // console.log(inputTodo);
    localStorage.setItem("localTodo", JSON.stringify(localTodo));
}

function getTodos(){
    let localTodo = checkTodos();
    localTodo.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);    
        //Check Mark Button
        const checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add("check-btn");
        todoDiv.appendChild(checkButton);
        //Check Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Append to List
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodo(todo) {
    let localTodo = checkTodos();
    const todoIndex = todo.children[0].innerText;
    // console.log(todoIndex);
    localTodo.splice(localTodo.indexOf(todoIndex), 1);
    localStorage.setItem("localTodo", JSON.stringify(localTodo));
}