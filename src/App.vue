<script setup>
import { reactive, ref, computed } from "@vue/reactivity";
import { uuid } from "vue-uuid";
import { useStore } from "vuex";
import { onMounted } from "@vue/runtime-core";
const store = useStore();
const todos = reactive({ list: [] });

onMounted(() => {
  getTodos();
});

const getTodos = async () => {
  try {
    await store.dispatch("getTodos");
    todos.list = store.state.todos;
  } catch (err) {
    console.log(err);
  }
};

const todoText = ref("");
const input = ref();

const add = () => {
  input.value.focus();
  if (todoText.value === "") {
    return;
  } else {
    // 陣列格式
    const todo = {
      text: todoText.value,
      id: uuid.v1(),
      complete: false,
    };

    store.dispatch("addTodo", todo);
    getTodos();
  }
  todoText.value = "";
};

const remove = (id) => {
  // todos.list = todos.list.filter((item) => item.id !== id);
  store.dispatch("deleteTodo", {
    id: id,
  });
  getTodos();
};

const complete = (id, complete) => {
  store.dispatch("completeTodo", {
    id: id,
    complete: !complete,
  });
  getTodos();
  // todos.list.filter((item) => {
  //   if (item.id === id) {
  //     item.complete = !item.complete;
  //   }
  // });
};

// 依據狀態顯示
const states = ["全部", "已完成", "待完成"];
const state = ref("全部");
const list = computed(() => {
  if (state.value === "全部") {
    return todos.list;
  } else if (state.value === "已完成") {
    return Object.values(todos.list).filter(
      (item) => item["complete"] === true
    );
  } else if (state.value === "待完成") {
    return Object.values(todos.list).filter(
      (item) => item["complete"] === false
    );
  }
});

// 未完成
const uncompleted = computed(() => {
  const d = Object.values(todos.list).filter((item) => item.complete === false);
  return d.length;
});
</script>

<template>
  <!-- <h1>TODO LIST</h1> -->
  <div class="container">
    <div class="text_bar">
      <input
        type="text"
        class="text"
        placeholder="新增代辦事項"
        ref="input"
        v-model="todoText"
        @keyup.enter="add"
      />
      <input type="button" class="save" value="+" @click="add" />
    </div>
    <div class="main_list">
      <div class="mian_btn">
        <input
          type="button"
          v-for="item in states"
          :key="item"
          :value="item"
          :class="['btn', { btn_active: item == state }]"
          @click="state = item"
        />
      </div>
      <ul class="list">
        <li v-for="item in list" :key="item">
          <input
            type="checkbox"
            class="check"
            :id="item.id"
            @click="complete(item.id, item.complete)"
            :checked="item.complete"
          />
          <label class="todo" :for="item.id">{{ item.text }}</label>
          <button class="delete" @click="remove(item.id)">✕</button>
        </li>
      </ul>
      <div class="footer">
        <div class="restbox">
          <p class="rest">{{ uncompleted }}個待完成項目</p>
        </div>
        <button class="clear" value="待完成">清除已完成項目</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  letter-spacing: 8.75px;
  font-size: 48px;
  color: $black;
}

.container {
  @include flexCenter(center, center);
  width: 500px;
  flex-direction: column;
  position: relative;
  .main_list {
    @include size(100%, 100%);
    background-color: #fff;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    overflow: hidden;
    margin-top: 10px;
    .mian_btn {
      display: flex;
      width: 100%;
      .btn {
        padding: 16px;
        flex: 1;
        border: none;
        background-color: #fff;
        font-size: 14px;
        color: #9f9a91;
        letter-spacing: 0.7px;
      }
      .btn_active {
        border-bottom: 2px solid $black;
        color: $black;
      }
    }
    .list {
      padding: 0;
      ul {
        @include size(100%, 100px);
        padding: 0;
        margin: 0;
      }
      li {
        @include size(50px, 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
        list-style: none;
        background-color: #fff;
        transition: 0.5s;
        &:hover .delete {
          opacity: 1;
        }
        .check {
          @include size(20px, 20px);
          flex: 1;
          border-radius: 5px;
        }
        .todo {
          border-bottom: 1px solid #efefef;
          flex: 8;
          font-size: 16px;
          color: $black;
          letter-spacing: 0.62px;
          transition: 0.5s;
        }
        .delete {
          @include flexCenter(center, center);
          @include size(20px, 20px);
          border: none;
          font-size: 16px;
          font-weight: 600;
          padding: 3px;
          margin-bottom: 10px;
          flex: 1;
          background-color: #fff;
          opacity: 0;
          transition: 0.2s;
        }
      }
    }
  }
  .text_bar {
    display: flex;
    align-items: center;
    width: 100%;
    .text {
      width: 100%;
      font-size: 16px;
      color: #9f9a91;
      letter-spacing: 0.7px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
      border-radius: 10px;
      border: none;
      padding: 12px 50px 12px 24px;
      outline: none;
    }
    .save {
      @include size(40px, 40px);
      border-radius: 10px;
      position: absolute;
      right: 0px;
      font-size: 32px;
      background-color: $black;
      color: #ffffff;
      border: none;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    .rest {
      font-size: 14px;
      color: $black;
      letter-spacing: 0.7px;
      padding: 24px 32px;
    }
    .clear {
      font-size: 14px;
      color: #9f9a91;
      letter-spacing: 0.7px;
      border: none;
      background-color: #fff;
      padding: 32px 47px;
    }
  }
}
.check {
  @include size(20px, 20px);
  flex: 1;
  border-radius: 5px;
}
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label {
  margin: 30 0px; /*設定選項與選項之間的距離*/
  border-bottom: 3px solid black;
}
input[type="checkbox"] + label::before {
  @include size(20px, 20px);
  content: "";
  font-size: 30px;
  float: left;
  background-color: rgb(255, 255, 255);
  border: 1px solid #333333; /*設定選項樣式的邊框*/
  border-radius: 5px; /*設定選項樣式為圓圈*/
  margin-right: 20px; /*設定圓圈與文字之間的距離*/
  margin-top: 0px;
  box-sizing: border-box;
}
input[type="checkbox"]:checked + label::before {
  position: relative;
  top: -12px;
  content: "✔";
  color: #ffd370;
  border: none;
  background-clip: content-box;
}
label {
  padding-bottom: 10px;
  cursor: pointer;
  margin-left: 30px;
  width: 100%;
}
.decoration {
  text-decoration: line-through;
  color: rgba(51, 51, 51, 0.3);
  opacity: 0.5;
}

//  動畫
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>