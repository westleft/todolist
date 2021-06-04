data = [];


let list = document.querySelector('.list');
let complete_list = document.querySelector('.complete_list');
let main_btn = document.querySelector('.main_list');
const rest = document.querySelector('.restbox')
const clear = document.querySelector('.clear')


let save = document.querySelector('.save');
let text_content = document.querySelector('.text');

// const list_templete = `
// <li>
// <label>
//   <input type="checkbox" data-num="$(index)" class="check" id="$(index)">
//   <label class="todo" for="$(index)">$(content)</label>
//   <input type="button" data-num="$(index)"class="delete" value="✕">
// </label>
// </li>`;



save.addEventListener('click', function () {
    if (text_content.value == '') {
        return;
    }
    obj = {};
    obj.content = text_content.value;
    obj.complete = '待完成';
    data.push(obj);

    for (var i = 0; i < btn.length; i++) {
        btn[i].classList.remove('btn_active')
    }
    btn[0].classList.add('btn_active')

    render();
    text_content.value = '';
})





// 新增代辦事項
function render() {
    str = ''
    data.forEach(function (item, index) {
        if (item.complete == '已完成') {
            str += `
            <li>
            <label>
              <input type="checkbox" data-num="${index}" class="check" id="${index}" checked>
              <label class="todo decoration" for="${index}">${item.content}</label>
              <input type="button" data-num="${index}"class="delete" value="✕">
            </label>
            </li>`;
        }
        if (item.complete == '待完成') {
            str += `
            <li>
            <label>
              <input type="checkbox" data-num="${index}" class="check" id="${index}">
              <label class="todo" for="${index}">${item.content}</label>
              <input type="button" data-num="${index}"class="delete" value="✕">
            </label>
            </li>`
        }
    })
    list.innerHTML = str
    rest_item()
}

// 點選事件
main_btn.addEventListener('click', function (e) {
    let paragraph = document.querySelectorAll('.todo');
    let num = e.target.getAttribute('data-num');
    console.log(e.target)
    // 打勾變成已完成 在勾一次變待完成
    if (e.target.getAttribute('class') === 'check') {
        if (data[num].complete === '已完成') {
            data[num].complete = '待完成';
            paragraph[num].style = 'text-decoration:none'
        } else {
            data[num].complete = '已完成';
            paragraph[num].style = 'text-decoration:line-through'
        }
        rest_item()
        return;
    }
    if (e.target.getAttribute('class') == 'delete') {
        // 刪除事項
        console.log(num);
        data.splice(num, 1);
        rest_item()
        render();
        return;
    } else if (e.target.getAttribute('class') == 'delete_notyet') {
        data.splice(num, 1);
        str = ''
        data.forEach(function (item, index) {
            if (data[index].complete == '待完成') {
                str += `
            <li>
            <label>
              <input type="checkbox" data-num="${index}" class="check" id="${index}">
              <label class="todo" for="${index}">${item.content}</label>
              <input type="button" data-num="${index}"class="delete_notyet" value="✕">
            </label>
            </li>`;
            }

        }
        )
        // // 刪除事項

        list.innerHTML = str
        rest_item()

        return;

    }

    let strr = '';
    data.forEach(function (item, index) {
        // replace_content= list_templete.replaceAll('$(index)', index).replace('$(content)',item.content);
        if (e.target.value == '全部') {
            if (item.complete == '已完成') {
                strr += `
                <li>
                <label>
                  <input type="checkbox" data-num="${index}" class="check" id="${index}" checked>
                  <label class="todo decoration" for="${index}">${item.content}</label>
                  <input type="button" data-num="${index}"class="delete" value="✕">
                </label>
                </li>`;
            }
            if (item.complete == '待完成')
                strr += `
                <li>
                <label>
                  <input type="checkbox" data-num="${index}" class="check" id="${index}">
                  <label class="todo" for="${index}">${item.content}</label>
                  <input type="button" data-num="${index}"class="delete" value="✕">
                </label>
                </li>`;
        }
        if (e.target.value == item.complete) {
            if (e.target.value == '已完成') {
                strr += `
            <li>
            <label>
              <input type="checkbox" data-num="${index}" class="check" id="${index}" checked>
              <label class="todo decoration" for="${index}">${item.content}</label>
              <input type="button" data-num="${index}"class="delete" value="✕">
            </label>
            </li>`;
                paragraph.style = 'text-decoration:line-through';;
            } else if (e.target.value == '待完成') {
                strr += `
            <li>
            <label>
              <input type="checkbox" data-num="${index}" class="check" id="${index}">
              <label class="todo" for="${index}">${item.content}</label>
              <input type="button" data-num="${index}"class="delete_notyet" value="✕">
            </label>
            </li>`;

            }
            render()
        }
    })
    if (e.target.value == '已完成') {
        list.innerHTML = strr
    } else if (e.target.value == '待完成') {
        list.innerHTML = strr
    } else if (e.target.value == '全部') {
        list.innerHTML = strr
    }

    rest_item()
})

// 待完成項目
function rest_item() {
    let x = 0;
    data.forEach(function (item, index) {
        if (item.complete == '待完成')
            x += 1
    })
    rest.innerHTML = `<p class="rest">${x}個待完成項目</p>`
}

var btn = document.querySelectorAll('.btn')

for (var i = 0; i < btn.length; i++) {
    btn[i].onclick = function () {
        for (var i = 0; i < btn.length; i++) {
            btn[i].classList.remove('btn_active')
        }
        this.classList.add('btn_active')
    }
}
