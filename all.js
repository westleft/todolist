const main_btn = document.querySelector('.mian_btn');
const rest = document.querySelector('.restbox')
const save = document.querySelector('.save');
const clear = document.querySelector('.clear')

let text_content = document.querySelector('.text');
let list = document.querySelector('.list');

//建立todo清單(按enter)
text_content.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        addtodo()
    }
});

//建立todo清單(按按鈕)
save.addEventListener('click', addtodo)

//check及label編號
let labelNumber = 0

//建立todo清單
function addtodo() {
    //禁止輸入空字串
    if (text_content.value == '') {
        return
    }

    //建立li,裝所有東西的清單
    const todo_li = document.createElement('li');

    //check及label編號
    if (labelNumber === labelNumber) {
        labelNumber += 1
    }

    //建立完成按鈕,新增至li
    const completeButton = document.createElement('input');
    completeButton.type = 'checkbox'
    completeButton.innerHTML = '';
    completeButton.classList.add('check')
    completeButton.setAttribute('id', labelNumber)
    todo_li.appendChild(completeButton);

    //建立代辦事項,新增至li (文字產生自此)
    var todoContent = document.createElement('label');
    todoContent.innerHTML = text_content.value;
    todoContent.classList.add('todo');
    todoContent.setAttribute('for', labelNumber);
    todo_li.appendChild(todoContent);

    // save_local(text_content.value)

    //建立刪除按鈕,新增至li
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '✕';
    deleteButton.classList.add('delete');
    todo_li.appendChild(deleteButton);

    //新增至畫面
    list.appendChild(todo_li);

    //清空輸入欄
    text_content.value = '';

    //導覽列跑回「全部」
    let li = document.querySelector('li')
    for (var i = 0; i < btn.length; i++) {
        btn[i].classList.remove('btn_active')
    }
    btn[0].classList.add('btn_active')
    li.style.display = 'flex'

    //待完成項目
    rest_item()
}

//刪除及完成事件
list.addEventListener('click', function (e) {
    item = e.target;

    //點選刪除按鈕
    if (item.classList[0] === 'delete') {
        const todo = item.parentElement;        
        todo.classList.add('delete_animation')
        // 先執行完CSS才刪除
        todo.addEventListener('transitionend', function () {
            todo.remove()
            
            rest_item()
        })
    }

    //點選完成勾勾
    if (item.classList[0] === 'check') {
        const todo = item.parentElement;
        todo.classList.toggle('decoration')
    }
    rest_item()
})

//篩選全部/已完成/待完成
main_btn.addEventListener('click', function (e) {
    const todos = list.childNodes;
    let li = document.querySelector('li')

    //篩選全部/已完成/待完成
    todos.forEach(function (li) {
        if (e.target.value == '全部') {
            li.style.display = 'flex'
        } else if (e.target.value == '已完成') {
            if (li.classList.contains('decoration')) {
                li.style.display = 'flex';
            } else {
                li.style.display = 'none';
            }
        } else if (e.target.value == '待完成') {
            if (li.classList.contains('decoration')) {
                li.style.display = 'none';
            } else {
                li.style.display = 'flex';
            }
        }

    })
    rest_item()
})

//清除已完成項目
clear.addEventListener('click', function (e) {
    const todos = list.childNodes;

    todos.forEach(function (item, index) {
        if (todos[index].classList.contains('decoration')) {
            todos[index].style.display = 'none';
        }
    })
})

//計算剩餘項目
function rest_item() {
    const todos = list.childNodes;

    let uncompleteCount = todos.length
    todos.forEach(function (item, index) {
        if (todos[index].classList.contains('decoration')) {
            uncompleteCount -= 1
        }
    })
    rest.innerHTML = `<p class="rest">${uncompleteCount}個待完成項目</p>`
}

//導覽列亮燈
var btn = document.querySelectorAll('.btn')
for (var i = 0; i < btn.length; i++) {
    btn[i].onclick = function () {
        for (var i = 0; i < btn.length; i++) {
            btn[i].classList.remove('btn_active')
        }
        this.classList.add('btn_active')
    }
}

