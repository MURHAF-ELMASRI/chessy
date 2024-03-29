# **chessy** &nbsp; <img src="./docs/chess.png" width="25px">

Multiplayer real-time **chess** game uses [node.js](https://nodejs.org/en/), [React](https://reactjs.org/) [Web-Socket/ws](https://github.com/websockets/ws), [firebase](https://firebase.google.com/), [material-ui](https://material-ui.com/) and [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd).<br>

<img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" width="25px"><img src="https://pics.freeicons.io/uploads/icons/png/6158480871552037069-512.png" width="25px"><img src="https://www.gstatic.com/devrel-devsite/prod/v1674d466be3b1154327dd11cf186e748303b1e92ae31ff35df0f5192fbd777ea/firebase/images/touchicon-180.png" width="25px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png" width="25px"><img src="https://user-images.githubusercontent.com/2182637/53611918-54c1ff80-3c24-11e9-9917-66ac3cef513d.png" width="25px">

# **demo**

you can visit the https://realtime-chess-24c56.firebaseapp.com/

# **How it works** :

I will explain how the system of the game works in order to understand the code. using UML charts.

## **_state diagram_**:

This diagram shows the states of users and transitions between the states.<br><Br>
<img src="./docs/state digram - Page 1.jpeg" width='500'>

## **_sequence diagram_**:

I translate the states diagram into sequence diagram **this will give a better overview**

- ## offline --> online:

  when user register to the system.<br>
  <img src="./docs/offline to online .jpeg" width="500">

- ## online --> play:

  when user register to the system.<br>
  <img src="./docs/online to play.jpeg" width="500">

- ## play --> offline/online:
  when user register to the system.<br>
  <img src="./docs/play to online-offline.jpeg" width="500">
