const ws = require('ws');

const client = new ws('ws://127.0.0.1:8080');

client.on('open', () => {
    console.log('connection opend');
    client.send('users');
});

client.on('message', (data) => {
    console.log(data);
});
