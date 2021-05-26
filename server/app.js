const webSocket = require('ws');
const http = require('http');
const url = require('url');
const controler = require('./controler');
const app = require('./config/firebaseApp');

//! danger: this approuch is unscure with http connection
const verifiyClient = async (info, cb) => {
    const parsed = url.parse(info.req.url, true);
    const token = parsed.query.token;
    try {
        //check valid connection
        const user = await app.auth().verifyIdToken(token);

        if (user.uid) {
            info.req.uid = user.uid;
            info.req.name = user.name;
            return cb(true);
        } else {
            cb(false, 500, 'server error');
        }
    } catch (e) {
        console.log(e.message);
        return cb(false, 401, 'not authurized');
    }
};

const server = http.createServer();

const ws = new webSocket.Server({
    server,
    verifyClient: verifiyClient,
});

app.database()
    .ref('/users/')
    .get()
    .then((snapshot) => {
        snapshot.forEach(function (child) {
            child.ref.update({
                state: 'offline',
            });
        });
    })
    .catch((e) => console.log(e.message));

ws.on('connection', (socket, req) => {
    console.log('-------------------------');
    console.log('6 connecting from ', req.connection.remoteAddress);
    console.log(req.name, req.uid);
    console.log('-------------------------');

    socket.uid = req.uid;
    socket.name = req.name;

    socket.onmessage = async (msgJSON) => {
        //TODO: handle error paser msg
        const msg = JSON.parse(msgJSON.data);
        console.log('from ', req.connection.remoteAddress, msg.msg);
        controler[msg.msg]({ socket, server: ws, ...msg });
    };

    socket.onclose = (code, reason) => {
        console.log('close the connection');
        controler['close']({ socket });
    };
});

server.listen(process.env.PORT || 8080, () =>
    console.log(`Server has started.`)
);
//when websocket close
//set state for user of uid to offline
// send new state to all users
