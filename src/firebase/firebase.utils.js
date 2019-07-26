import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC-pyA-Cxh8f2zQXrORLpVhE0Q2SzA5AoE",
  authDomain: "crown-db-a7e97.firebaseapp.com",
  databaseURL: "https://crown-db-a7e97.firebaseio.com",
  projectId: "crown-db-a7e97",
  storageBucket: "",
  messagingSenderId: "757645406950",
  appId: "1:757645406950:web:b811d116a49457b9"
};

// 
export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName, 
				email,
				createdAt,
				...additionalData
			})
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;