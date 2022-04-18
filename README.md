# Todolist | Vite + Vue3 + Firebase

[<img src="https://img.shields.io/badge/-Vite-646CFF?logo=Vite&logoColor=white&logoWidth=24" alt="vite勳章"/>](https://vitejs.dev/) [<img src="https://img.shields.io/badge/-Vue.js-4FC08D?logo=Vue.js&logoColor=white&logoWidth=24" alt="vue.js勳章"/>](https://vuejs.org/) [<img src="https://img.shields.io/badge/-Firebase-FFCA28?logo=Firebase&logoColor=white&logoWidth=24" alt="firebase勳章"/>](https://firebase.google.com/) 

<img src="https://i.imgur.com/LB2bk0O.jpg">


使用 Vue3 搭配 Google Friebase 實作簡易版 Todolist，並配合 Vuex 完成。</br>
設計稿為 [六角學院 2021 年公益活動](https://www.hexschool.com/2021/05/20/2021-05-20-covid-public-welfare/) 的版型，為了方便練習就直接拿來修改。</br>
不過目前是使用免費方案，怕被玩爆這邊就不放上 DEMO 了 XD。

## 啟動專案
* STEP.1</br>
到 [Google Firebase](https://firebase.google.com/) 申請帳號及 API，並在 `.env` 內輸入申請的 API
```
VITE_APIKEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
```

* SETP.2</br>
終端機輸入 `npm install` 以及 `npm run dev` 即可

## 參考資料
* [將 Firebase 添加到您的 JavaScript 項目](https://firebase.google.com/docs/web/setup?authuser=0&hl=zh)
* [在 Web 上讀取和寫入數據](https://firebase.google.com/docs/database/web/read-and-write?authuser=0&hl=zh)
