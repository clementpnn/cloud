import firebase from "./utils/dbConfig"

export const handleSignInWithGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  } catch (error) {
    console.log(error);
  }
};

export async function handleSignInWithEmailAndPassword(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
}

export const handleSignOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.log(error);
  }
};
