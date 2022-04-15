import { createStore } from 'vuex'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../firebaseConfig'
import { getDatabase, onValue, get, set, child, remove, update } from "firebase/database";
import { ref as dbref } from "firebase/database";
const firebase = initializeApp(firebaseConfig);

const database = getDatabase();
const dbRef = dbref(getDatabase());
const store = createStore({
    state: {
        todos: {}
    },
    getters: {

    },
    mutations: {
        setTodos(state, data) {
            state.todos = data
        },
        addTodo(state, todo) {
            set(dbref(database, 'todos/' + todo.id), {
                id: todo.id,
                text: todo.text,
                complete: todo.complete
            });
        },
        deleteTodo(state, todo) {
            remove(dbref(database, 'todos/' + todo.id));
        },
        completeTodo(state, todo){
            update(dbref(database, 'todos/' + todo.id), {
                complete: todo.complete
            });
            console.log(todo)
        }
    },
    actions: {
        addTodo({ commit }, todo) {
            commit("addTodo", todo)
        },
        deleteTodo({ commit }, todo) {
            commit("deleteTodo", todo)
        },
        completeTodo({ commit }, todo){
            commit('completeTodo', todo)
        },
        async getTodos({ commit }){
            try {
                const snapshot = await get(child(dbRef, `todos/`))
                if (snapshot.exists()) {
                    commit("setTodos", snapshot.val())
                }
            } catch(error) {
                console.log("找不到資料，請重新檢查:", error);
            }
        }

    },
    modules: {

    }
})

export default store