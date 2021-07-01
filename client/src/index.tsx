import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/useAuth';
import { WebSocketProvider } from './hooks/useWebSocket';
import { NotificationProvider } from './hooks/useNotification';
import { DialogProvider } from './hooks/useDialog';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
// Firebase.
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <AuthProvider>
            <WebSocketProvider>
                <NotificationProvider>
                    <DialogProvider>
                        <App />
                    </DialogProvider>
                </NotificationProvider>
            </WebSocketProvider>
        </AuthProvider>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
