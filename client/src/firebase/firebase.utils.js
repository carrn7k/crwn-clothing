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


	// createa userCart 
	/*
	const userCart = firestore.doc(`carts/${userAuth.uid}`)
	try {
		await userCart.set({
			cartItems
		})
	}
	*/
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

export const addCartItemsOnSignout = async (currentUser, cartItems) => {
	// update to add only new items and update the quanity of items already in the collection
	if (cartItems.length < 0) return;

	const cartItemsRef = firestore.doc(`users/${currentUser.id}`).collection('cartItems');
	const cartItemsData = await cartItemsRef.get();

	// delete stale docs in the firestore 
	cartItemsData.docs.forEach(async cartItem => {
		cartItemsRef.doc(cartItem.id).delete();
	})

	// populate cartItems collection with new cartItem docs
	const batch = firestore.batch();
	cartItems.forEach(obj => {
		const newDocRef = cartItemsRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
}

export const convertCartItemsSnapshotToMap = cartItems => {
	return cartItems.docs.map(doc => {
		const { id, imageUrl, name, price, quantity } = doc.data();

		return {
			id,
			imageUrl, 
			name,
			price,
			quantity
		}
	});

}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();

};

export const convertCollectionsSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		}
	});

	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged(userAuth => {
			unsubscribe();
			resolve(userAuth);
		}, reject) 
	});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;