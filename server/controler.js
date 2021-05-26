const app = require('./config/firebaseApp');
var admin = require('firebase-admin');
function isObject(varibale) {
    return typeof varibale === 'object' && varibale !== null;
}
function setLoser(socket) {
    console.log(isObject(socket.opponent));
    if (isObject(socket.opponent)) {
        socket.opponent.send(JSON.stringify({ msg: 'win' }));
        if (socket.uid)
            app.database()
                .ref('users')
                .child(socket.uid)
                .update({
                    lose: admin.database.ServerValue.increment(1),
                });
        if (socket.opponent.uid)
            app.database()
                .ref('users')
                .child(socket.opponent.uid)
                .update({
                    win: admin.database.ServerValue.increment(1),
                });
        socket.opponent.opponent = '';
    }
}

module.exports = {
    'request-play': ({ socket, server, opponentUID, color }) => {
        if (!!!socket.opponent) {
            let oppSocket;
            server.clients.forEach((e) => {
                if (e.uid === opponentUID) {
                    oppSocket = e;
                    console.log('found one', e.name);
                }
            });

            if (oppSocket) {
                if (!oppSocket.opponent) {
                    oppSocket.opponent = socket;
                    socket.opponent = oppSocket.uid;
                    console.log('sending request');
                    oppSocket.send(
                        JSON.stringify({
                            msg: 'request-play',
                            name: socket.name,
                            color,
                        })
                    );
                } else
                    socket.send(
                        JSON.stringify({
                            msg: 'error',
                            content: `${oppSocket.name} is busy`,
                        })
                    );
            } else
                socket.send(
                    JSON.stringify({
                        msg: 'error',
                        content: `${opponentUID} is not connected`,
                    })
                );
        } else {
            console.log('bad request');
            socket.send(
                JSON.stringify({
                    msg: 'error',
                    content: "you can't start new game",
                })
            );
        }
    },
    cancel: ({ socket }) => {
        //TODO: check losing
        socket.opponent = '';
        console.log('cancel request ', socket.name);
    },
    'reject-play': ({ socket }) => {
        if (isObject(socket.opponent) && socket.opponent.opponent) {
            socket.opponent.send(
                JSON.stringify({ msg: 'reject-play', name: socket.name })
            );
            socket.opponent.opponent = '';
        }
        socket.opponent = '';
    },
    lose: ({ socket }) => {
        setLoser(socket);
    },
    move: ({ socket, move }) => {
        if (isObject(socket.opponent))
            socket.opponent.send(JSON.stringify({ msg: 'move', move: move }));
    },
    close: ({ socket }) => {
        let uid = socket.uid;
        setLoser(socket);
        if (uid)
            app.database()
                .ref('users')
                .child(uid)
                .update(
                    {
                        state: 'offline',
                    },
                    function (err) {
                        if (err) console.log(err);
                        else console.log(uid + ' disconnected');
                    }
                );
    },
    'accept-play': ({ socket, color }) => {
        if (socket.opponent.opponent) {
            socket.opponent.opponent = socket;
            socket.opponent.send(JSON.stringify({ msg: 'accept-play', color }));
        } else {
            socket.send(
                JSON.stringify({
                    msg: 'error',
                    content: 'Game has been rejected',
                })
            );
            socket.opponent = '';
        }
    },
};
