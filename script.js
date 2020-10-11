function Todolist(){
let ultodo,input,btnAll,btnTodo,btnCompleted;
    let todos = [
        /*
        {
            id:0,
            text: 'Do mockup',
            completed: false
        
        },
        {
            id:0,
            text: 'Read e-mails',
            completed: false
        
        },
        {
            id:0,
            text: 'Go to work',
            completed: true
        
        }
*/
];

const loadTodosFromLocalStorage = ()=> {
    const localTodos = localStorage.getItem('todos');
    if(localTodos){
        const todoArr = JSON.parse(localTodos);
        if(todoArr){
            todos = todoArr;
            }
        }
    }
const saveTodosLocalStorage = ()=>{
    localStorage.setItem('todos',JSON.stringify(todos));


};
const removeTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    console.log(todos);
    saveTodosLocalStorage();
    ultodo.removeChild(ultodo.querySelector('#todo-'+id));

};

const toggleTodo = (id,ele) => {
    todos = todos.map(ele=> {
        if (ele.id ===id){
        ele.completed = !ele.completed;
    }
        return ele;
    });
        //ele.parentNode.classList.toggle('completed',true);
        saveTodosLocalStorage();
        console.log(todos);
        const oldClass = ele.classList.contains('completed')? 'completed' : 'uncompleted';
        const newClass = oldClass === 'completed'?'uncompleted' : 'completed';
        
        ele.classList.replace(oldClass,newClass);

        ele.parentNode.classList.toggle('completed');
};
const createLi = ({text,completed,id})=>{
    
    const li = document.createElement('li');
    li.id = 'todo-'+id;
        if (completed){
            li.classList.add('completed');
        }
    const spancheck = document.createElement('span');
    /* Aggiungere una classe a questa constante*/
    spancheck.classList.add(completed ? 'completed' : 'uncompleted');
    spancheck.addEventListener('click',(e)=> {
        toggleTodo(id,e.target); 
    });
    const spancross = document.createElement('span');
    spancross.classList.add('cross');
    spancross.addEventListener('click',(e) => {
        removeTodo(id);
    });
    const textNode = document.createTextNode(text);
    
    
    li.appendChild(spancheck);
    li.appendChild(textNode);
    li.appendChild(spancross);
    return li;

/*
<li class="completed">
    <span class="completed"></span>
    Todo 1
    <span class="cross"></span>
</li>
*/
};
const addNewTodo = (todo) => {
    todos.unshift(todo);// insersce all'inizio
    saveTodosLocalStorage();
    const li = createLi(todo);
    const firstLi = ultodo.firstChild;
    if(!firstLi){
        ultodo.appendChild(li);
    }else{
        ultodo.insertBefore(li,firstLi);
    }
    
   
}
const addTodo =(e)=>{
    const key = e.keyCode, ele = e.target;
    //13 = al tasto Enter(key)
    
    if (key ===13 && ele.value.trim().length >2){
        const todo = {
            text: ele.value.trim(),
            id: todos.length,
            completed : false 
        }
        
        addNewTodo(todo);
        ele.value= '';
    }
};

const renderTodos = (todoType)=>{
    const lis = ultodo.querySelectorAll('li');
    if(lis){
        lis.forEach(li=>ultodo.removeChild(li));
    }
    const currentTodos = todos.filter(todo => {
        if(todoType ==='all'){
            return todo;
        }

        return(todoType === 'completed')? todo.completed: !todo.completed;
    });


    currentTodos.map(todo => createLi(todo)).forEach(li => ultodo.appendChild(li));
   
}
const toggleBtnClasses = (target,btns=[]) => {
    target.classList.toggle('active');
    target.setAttribute('disable',true);

    btns.forEach(btn =>{
    btn.removeAttribute('disabled');
    btn.classList.remove('active');
    
    });
}
const addListeners = ()=> {
// Affidare eventi filter ai bottoni presenti 


btnAll = document.querySelector('#btnAll');
btnTodo = document.querySelector('#btnTodo');    
btnCompleted = document.querySelector('#btnCompleted');

btnAll.addEventListener('click', e => {
    toggleBtnClasses(e.target,[btnTodo,btnCompleted]);
 /* e.target.classList.toggle('active');
    e.target.setAttribute('disabled',true);

    btnCompleted.removeAttribute('disabled');
    btnTodo.removeAttribute('disabled');
    
    btnCompleted.classList.remove('active');
    btnTodo.classList.remove('active');*/

    renderTodos('all');
});
btnCompleted.addEventListener('click', e => {
    toggleBtnClasses(e.target,[btnAll,btnTodo]);
 /*
    e.target.classList.toggle('active');
    e.target.setAttribute('disabled',true);
    btnAll.classList.remove('active');
    btnAll.removeAttribute('disabled');
    btnTodo.removeAttribute('disabled');
    btnTodo.classList.remove('active');*/
    renderTodos('completed');
});
btnTodo.addEventListener('click', e => {
    toggleBtnClasses(e.target,[btnAll,btnCompleted]);
 /*
    e.target.classList.toggle('active');
    e.target.setAttribute('disabled',true);
    btnAll.classList.remove('active');
    btnCompleted.removeAttribute('disabled');
    btnAll.removeAttribute('disabled');
    btnCompleted.classList.remove('active');*/
    renderTodos('uncompleted');
    })

};

const renderTodosList = ()=>{
    loadTodosFromLocalStorage();
    ultodo =document.querySelector('ul#todolist');
    
    //per verificare se esista o nel caso crearla:
    if(!ultodo/*variabile*/){
        ultodo = document.createElement('ul');
        ultodo.id = 'todolist';
        document.body.appendChild(ultodo);
    }
   // const lis = todos.map(todo=>  createLi(todo));// ha creato un li per ogni to do 
     renderTodos('all');
    let input = document.querySelector('#todo');
    if(!input){
        input = document.createElement('input');
        input.id = 'todo';
        input.name = 'todo';
        input.placeholder = 'Add New todo';
        ultodo.parentNode.insertBefore(input,ultodo);
    }
    input.addEventListener('keyup',addTodo);
    addListeners();

};
//renderTodos(); // può essere chiamata solo all'interno della function todolist

return{
    getTodos: function(){
        return todos;
    },
    init: function(){
        renderTodosList();
        

    }
}
}



const myTodo= Todolist();
myTodo.init();
console.log(myTodo.getTodos());
console.log(myTodo);