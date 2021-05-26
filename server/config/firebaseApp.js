var admin = require('firebase-admin');

var serviceAccount = require('../realtime-chess-24c56-firebase-adminsdk-30rkv-cbc76eb2c0.json');

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        'https://realtime-chess-24c56-default-rtdb.europe-west1.firebasedatabase.app',
});

module.exports = app;
