data = [];


let list = document.querySelector('.list');
let complete_list = document.querySelector('.complete_list');
let main_btn = document.querySelector('.main_list');
const rest = document.querySelector('.restbox')
const clear = document.querySelector('.clear')



let save = document.querySelector('.save');
let text_content = document.querySelector('.text');


save.addEventListener('click', function () {
    if(text_content.value == ''){        
        return;
    }
    da = {};
    da.content = text_content.value;
    da.complete = '待完成';
    data.push(da);
    
    rest_item();
    render();
    text_content.value = '';
})

// 新增代辦事項
function render() {    
    str = ''
    data.forEach(function (item, index) {
        let con = `
        <li>
        <label>
          <input type="checkbox" data-num="${index}" class="check" id="${index}">
          <label class="todo" for="${index}">${item.content}</label>
          <input type="button" data-num="${index}"class="delete" value="✕">
        </label>
      </li>`;
        str += con;
    })
    list.innerHTML = str;
}

// 點選事件
main_btn.addEventListener('click', function (e) {
    console.log(e.target);
    let num = e.target.getAttribute('data-num');
    // 打勾變成已完成 在勾一次變待完成
    if (e.target.getAttribute('class') == 'check'){  
        if (data[num].complete == '已完成') {
            data[num].complete = '待完成'; 
        }else{
            data[num].complete = '已完成'; 
        }
    }else if (e.target.getAttribute('class') == 'delete') {
        // 刪除事項
        console.log(num);
        data.splice(num,1);
        render()
    }
    let strr = '';
    data.forEach(function(item,index){       
        if(e.target.value == '全部'){
            strr += `<li>
            <label>
              <input type="checkbox" data-num="${index}" class="check" id="${index}">
              <label class="todo" for="${index}">${item.content}</label>
              <input type="button" data-num="${index}"class="delete" value="✕">
            </label>
          </li>`;
        }       
        if(e.target.value == item.complete){
            strr += `<li>
            <label>
              <input type="checkbox" data-num="${index}" class="check" id="${index}">
              <label class="todo" for="${index}">${item.content}</label>
              <input type="button" data-num="${index}"class="delete" value="✕">
            </label>
          </li>`;
        }

    })
    if (e.target.value == '已完成') {
        list.innerHTML = strr
    }else if (e.target.value == '待完成') {
        list.innerHTML = strr
    }else if (e.target.value == '全部') {
        list.innerHTML = strr
    }
    
    rest_item()
})


// 待完成項目
function rest_item(){
    let x = 0;
    data.forEach(function(item,index){
        if(item.complete == '待完成')
        x += 1
    })
    rest.innerHTML = `<p class="rest">${x}個待完成項目</p>`
}

