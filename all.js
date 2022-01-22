const save = document.querySelector(".save");
const clear = document.querySelector(".clear");
const deleteButtons = document.querySelectorAll(".delete");

let input = document.querySelector(".text");
let list = document.querySelector(".list");
let btns = document.querySelectorAll(".btn");
let rest = document.querySelector(".restbox .rest");

class TodoList {
  constructor() {
    this.todos = [];
    this.number = 0;
  }

  run() {
    this.navbarEvent(); // 導覽列顏色
    save.addEventListener("click", () => {
      this.addToList();
      this.checkTodo();
    });
    clear.addEventListener("click", () => {
      this.clear();
    });
  }

  addToList() {
    if (input.value == "") {
      return;
    }
    list.innerHTML += `
    <li>
        <input type="checkbox" class="check" id="${this.number}">
        <label class="todo" for="${this.number}">${input.value}</label>
        <button class="delete">✕</button>
    </li>`;
    input.value = "";
    this.number += 1;
    this.renderDom();
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
  }

  navbarEvent() {
    btns[0].classList.add("btn_active");
    btns.forEach((item, index) => {
      item.addEventListener("click", () => {
        // 所有導覽列關燈
        for (let i = 0; i < btns.length; i++) {
          btns[i].classList.remove("btn_active");
        }
        // 點擊的導覽列亮燈
        btns[index].classList.add("btn_active");

        this.checkFinish(index);
      });
    });
  }

  checkTodo() {
    const todo = document.querySelectorAll(".todo");

    todo.forEach(function (item) {
      item.addEventListener("click", function () {
        this.classList.toggle("decoration");
      });
    });
    this.todo = todo;
  }

  checkFinish(index) {
    if (index === 0) {
      // 全部
      this.todo.forEach(function (item) {
        item.parentElement.style.display = "flex";
      });
    } else if (index === 1) {
      // 已完成
      this.todo.forEach(function (item) {
        if (item.classList.contains("decoration")) {
          item.parentElement.style.display = "flex";
        } else {
          item.parentElement.style.display = "none";
        }
      });
    } else {
      // 待完成
      this.todo.forEach(function (item) {
        if (item.classList.contains("decoration")) {
          item.parentElement.style.display = "none";
        } else {
          item.parentElement.style.display = "flex";
        }
      });
    }
  }

  renderDom() {
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((item) => {
      item.addEventListener("click", () => {
        item.parentElement.remove();
      });
    });
  }

  clear() {
    this.todo.forEach(function (item) {
      if (item.classList.contains("decoration")) {
        item.parentElement.remove();
      }
    });
  }
}

let todoList = new TodoList();
todoList.run();