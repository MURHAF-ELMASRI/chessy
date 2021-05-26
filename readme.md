# **chessy** &nbsp; <img src="./docs/chess.png" width="25px">

multiplayer real-time **chess** game uses [node.js](https://nodejs.org/en/), [React](https://reactjs.org/) [Web-Socket/ws](https://github.com/websockets/ws), [firebase](https://firebase.google.com/) and [material-ui](https://material-ui.com/) <br>
<img src="https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png" width="25px"><img src="https://pics.freeicons.io/uploads/icons/png/6158480871552037069-512.png" width="25px"><img src="https://www.gstatic.com/devrel-devsite/prod/v1674d466be3b1154327dd11cf186e748303b1e92ae31ff35df0f5192fbd777ea/firebase/images/touchicon-180.png" width="25px"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" width="25px">

# **demo**

you can visit the https://realtime-chess-24c56.firebaseapp.com/

# **How it works** :

I will explain how the system of the game works in order to understand the code. using UML charts.

## **_state diagram_**:

This diagram shows the states of users and transitions between the states.<br><Br>
<img src="./docs/state digram - Page 1.jpeg" width='500'>

## **_sequence diagram_**:

I translate the states diagram into sequence diagram **this will give a better overview**

-   ## offline --> online:

    when user register to the system.<br>
    <img src="./docs/offline to online .jpeg" width="500">

-   ## online --> play:

    when user register to the system.<br>
    <img src="./docs/online to play.jpeg" width="500">

-   ## play --> offline/online:
    when user register to the system.<br>
    <img src="./docs/play to online-offline.jpeg" width="500">
