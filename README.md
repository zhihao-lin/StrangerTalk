# 題目名稱：StrangerTalk

### 一句話描述這個服務在做什麼

可以跟在附近的使用者聊天，搭訕神器

### 下載、安裝

```
git clone https://github.com/j1a0m0e4sNTU/StrangerTalk.git
cd StrangerTalk
cd backend
npm install
npm start
cd ../frontend/ios
open frontend.xcodeproj with Xcode
build
```

### 功能介紹

- 登入、註冊

1. 可以註冊新的使用者，或是用舊用戶登入，使用者名稱必須唯一不能跟別人重複。
2. 登入資料採用 JSON Web Token，以 http req headers 紀錄，固定時間會過期需要重新登入。
3. 密碼用 BCrypt 加密、比對

- 基本功能

1. 地圖上可以看到周圍的使用者，點選使用者可以跟他傳送訊息給他，一旦離開一定範圍（大概是一公里）就沒辦法傳訊息給對方。如果看到附近有喜歡的對象不妨打開軟體看看他有沒有用，減去走去搭訕的煩惱，如果準備要分開了就要趕快要聯絡方式，不然錯過就不一定有機會再傳訊息給他了。
2. 如果你們有聊過天下次在地圖上會看到他的標示顏色不一樣，代表你們是朋友。
3. 點進聊天室可以看聊天記錄，也可以試著傳訊息看看對方有沒有在附近。
4. 可以新增自己的狀態、自我介紹。

- 待做功能:封鎖別人、聊天室擴充功能、上架至 App Store

### 使用之第三方套件

- Frontend: mobx-react, react-apollo, react-native-maps, react-native-gifted-chat, react-navigation
- Middleware: apollo-client, apollo-link-context, apollo-link-http

### 使用與參考之框架、模組、原始碼

- css: https://freehtml5.co/
- backend: babel, mongoose, express, GraphQL, bcrypt
- frontend: React Native, apollo ,React Native Maps
- db: mongodb

### 分工

- 尹新博：frontend、串接 Api、React Native
- 林志皓: backend - MongoDB Schema design, GraphQL API design
- 陳曦：backend、GrpahQL、middleware、登入、登入，UI 介面設計

### 專題製作心得

- 尹新博
- 林志皓
- 陳曦：這次的作業本來想要一起刻前端的，但是一開始只有新博的電腦可以跑手機 app 模擬器，所以除了設計介面其他就去幫忙寫了後端，這堂課大部分的時間都在寫前端，這次最大的收穫應該是搞懂 graphQL 到底在幹嘛，然後怎麼做好前後端跟 middle 的溝通。因為有時候在路上很無聊，附近的人都在滑手機，就跑出了也許可以跟旁邊的人聊天的想法，不過一個人刻前端實在有點太吃緊，以至於有一些後端寫到的功能沒有完全實現。雖然都是 react 但是跟手機溝通還是跟寫網頁不太一樣，處理好這部分也滿花時間的，不過算是收穫很多，第一次可以開發一個 app。
