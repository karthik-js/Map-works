import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC2mFm0noA9iOi8xkDAFL457jIM98vNgIY',
    authDomain: 'maps-1fde0.firebaseapp.com',
    databaseURL: 'https://maps-1fde0.firebaseio.com',
    projectId: 'maps-1fde0',
    storageBucket: 'maps-1fde0.appspot.com',
    messagingSenderId: '494522705414',
    appId: '1:494522705414:web:b69bb3a265f053bc8dc587',
    measurementId: 'G-ZZ9304P8VJ',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const {email, displayName, photoURL} = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData,
            });
        } catch (error) {
            console.error('Error creating user document', error);
        }
    }
    return getUserDocument(user.uid);
};
const getUserDocument = async (uid) => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data(),
        };
    } catch (error) {
        console.error('Error fetching user', error);
    }
};
export const getLocations = async () => {
    try {
        const locationSnapshot = await firestore.collection('locations').get();
        return locationSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
        console.error('error fetching locations', error);
    }
};

export const addLocation = async (data) => {
    try {
        const loc = await firestore.collection('locations').add(data);
    } catch (error) {
        console.error('error adding locations', error);
    }
};
