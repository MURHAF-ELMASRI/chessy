import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyB0TiDBtkftC-OPWjTiNsT7h_uqe6MOoiE',
    authDomain: 'realtime-chess-24c56.firebaseapp.com',
    databaseURL:
        'https://realtime-chess-24c56-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'realtime-chess-24c56',
    storageBucket: 'realtime-chess-24c56.appspot.com',
    messagingSenderId: '516690287363',
    appId: '1:516690287363:web:c14fce8916cf3e54252736',
    measurementId: 'G-CS00NCHGCL',
};

firebase.initializeApp(config);

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: (data) => {
        console.log('login successed ')
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.EmailAuthProvider.PROVIDER_ID
    ],
};

function SignInScreen() {
    return (
        <div>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    );
}

export default SignInScreen;
