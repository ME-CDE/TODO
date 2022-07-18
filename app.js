const input = document.getElementById('input-todo');
const save = document.querySelector('.save');
const listArea = document.querySelector('.todo-list-area');
const clear = document.querySelector('.clear');
const number = document.querySelector('.numbers');
const theme = document.querySelector('.icon');
const todoFooter = document.querySelector('.todo-footer');
const inputTodo = document.querySelector('#input-todo');
const background = document.querySelector('.background');
const body = document.querySelector('body');
const checker = document.querySelectorAll('.checker');
const p = document.querySelectorAll('.left p');

createDiv()

function themes(){
    theme.classList.toggle('darkTheme');
    listArea.classList.toggle('listAreaDark');
    todoFooter.classList.toggle('listAreaDark');
    inputTodo.classList.toggle('listAreaDark');
    background.classList.toggle('backgroundDark');
    body.classList.toggle('bodyDark');
    save.classList.toggle('darkPlus');
    createDiv()
}
let inputStorage = [];

const inputCode = (todo)=>{
    
    if(input.value != ''){
        if (localStorage.getItem('todo')) {
            const newinputStorage = JSON.parse(localStorage.getItem('todo'));
            inputStorage = newinputStorage
            inputStorage.unshift(todo);
            localStorage.setItem('todo', JSON.stringify(inputStorage))
        } else {
            inputStorage.push(todo);
            localStorage.setItem('todo', JSON.stringify(inputStorage))
        }
    }
    createDiv()
}

function checking(news, theme) {
    const checkers = document.querySelectorAll('.checker');
        const p = document.querySelectorAll('.left p');
        checkers.forEach((check, index)=>{
            if(news[index].count === 'false'){
                check.classList.add('check');
                if (check.className === 'checker check') {
                    p[index].style.textDecoration ='Line-through'
                    if (theme.className === 'icon') {
                        p[index].style.color ='hsl(233, 11%, 84%)'
                    } else {
                        p[index].style.color ='hsl(233, 14%, 35%)'
                    }
                }
            }
            check.addEventListener('click', ()=>{
                check.classList.add('check');
                news[index].count = 'false'
                localStorage.setItem('todo', JSON.stringify(news));
                if (check.className === 'checker check') {
                    p[index].style.textDecoration ='Line-through'
                    if (theme.className === 'icon') {
                        p[index].style.color ='hsl(233, 11%, 84%)'
                    } else {
                        p[index].style.color ='hsl(233, 14%, 35%)'
                    }
                }
                const length =news.filter((count)=>{
                    if (count.count === "false") {
                        return count.count
                    }
                })
                if (localStorage.getItem('todo')) {
                    number.textContent= `${length.length} of ${news.length} completed`
                }
            });
        })
}

function createDiv(){
    listArea.innerHTML = ""
    listArea.style.height = '190px'
    if (localStorage.getItem('todo')) {
        const newinputStorage = JSON.parse(localStorage.getItem('todo'));
        listArea.style.height = 'max-content'
        newinputStorage.forEach(todos => {
            div = document.createElement("div");
            div.innerHTML = `<div class='left'><div class='checker'></div><p>${todos.todo}</p></div><div class='close'></div>`
            listArea.appendChild(div);
            div.classList.add('list');
        });
        const length1 = newinputStorage.filter((count)=>{
            if (count.count === "false") {
                return count.count
            }
        });
        number.textContent= `${length1.length} of ${newinputStorage.length} commpleted`

        checking(newinputStorage, theme)
    }
}

function del() {
    const newinputStorage = JSON.parse(localStorage.getItem('todo'));
    const close = document.querySelectorAll('.close');
    close.forEach((closes,index) =>{
        closes.addEventListener('click', ()=>{
            if (close.length > 1) {
                newinputStorage.splice(index,1);
                localStorage.setItem('todo', JSON.stringify(newinputStorage));
            } else {
                localStorage.clear()
                inputStorage = []
            }
            createDiv();
        })
    })
}


const inputs =()=>{
    const todo = {
        todo : `${input.value}`,
        count : `true`
    }
    inputCode(todo)
    input.value =''
}

clear.addEventListener('click', ()=>{
    localStorage.clear()
    inputStorage = []
    createDiv()
    number.textContent= ''
})
listArea.addEventListener('click',del );
save.addEventListener('click', inputs);
theme.addEventListener('click', themes);