import { StyledFirebaseAuth } from "react-firebaseui";
import { Grid, Typography } from "@material-ui/core";
import firebase from "firebase";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function RegisterPanel() {
  return (
    <Grid container direction="row" alignContent="center" justify="center">
      <Grid item container justify="center">
        <Typography variant="h5">You need to </Typography>
        <Typography variant="h4" color="secondary">
          {" "}
          register 😊
        </Typography>
      </Grid>
      <Grid item>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Grid>
    </Grid>
  );
}
export default RegisterPanel;
