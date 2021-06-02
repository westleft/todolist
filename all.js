data = [];


let list = document.querySelector('.list');
let complete_list = document.querySelector('.complete_list');
let main_btn = document.querySelector('.main_list');



let save = document.querySelector('.save');
let text_content = document.querySelector('.text');


save.addEventListener('click', function () {
    da = {};
    da.content = text_content.value;
    da.complete = 'notyet';
    data.push(da);
    render();
    text_content.value = '';
})

// 新增代辦事項
function render() {
    str = ''
    data.forEach(function (item, index) {
        let con = `
    <li>
        <input type="checkbox" class="check">
            <p class="todo">${item.content}</p>
        <input type="button" data-num="${index}"class="delete" value="✕">
    </li>`;
        str += con;
    })
    list.innerHTML = str;
}

// 刪除代辦事項
list.addEventListener('click', function (e) {

    let checka = document.querySelector('.check');
    if (e.target.getAttribute('class') == 'check'){
        checka.setAttribute('class', 'llli')
        console.log('sdfsd');
    }
    if (e.target.getAttribute('class') == 'delete') {
        let num = e.target.getAttribute('data-num');
        data.splice(num, 1);
    }

    render();
})
