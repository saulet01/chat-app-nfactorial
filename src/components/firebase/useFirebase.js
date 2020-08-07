import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { config } from "./config";
import crypto from "crypto";
const firebaseContext = React.createContext();

// Provider hook that initializes firebase, creates firebase object and handles state
function useProvideFirebase() {
    const [user, setUser] = React.useState(null);
    const [snackbar, setSnackbar] = React.useState(false);
    const [snackbarDetails, setsnackbarDetails] = React.useState({ message: "", severity: null });
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [chatId, setChatId] = React.useState("something");
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        if (!firebase.apps.length) {
            console.log("I am initializing new firebase app");
            firebase.initializeApp(config);
        }

        let unsubscribe = firebase
            .firestore()
            .collection("users")
            .onSnapshot(
                function(snapshot) {
                    console.log("Firestore triggered!");
                    let temporaryArray = [];
                    snapshot.forEach(function(doc) {
                        temporaryArray.push(doc.data());
                    });
                    setUsers(temporaryArray);
                },
                function(error) {
                    //...
                    console.log(error);
                }
            );

        const unsubscribeFunction = firebase.auth().onAuthStateChanged(user => {
            // console.log("got new user", user);
            setUser(user);
        });

        return function cleanup() {
            // looks like you don't need to do any clean up, but if you do, do it here
            unsubscribeFunction();
            unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        console.log(chatId);
        let unsubscribeChat = firebase
            .firestore()
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .orderBy("date", "desc")
            .onSnapshot(
                function(snapshot) {
                    console.log("Chat Firestore triggered");

                    let temporaryArray = [];
                    snapshot.docs.forEach(function(doc) {
                        temporaryArray.push(doc.data());
                    });
                    setMessages(temporaryArray);
                    console.log(temporaryArray);
                },
                function(error) {
                    //...
                    console.log(error);
                }
            );

        return () => {
            unsubscribeChat();
        };
    }, [chatId]);

    const register = async (email, password) => {
        setLoading(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase
            .firestore()
            .collection("/users")
            .doc(email)
            .set({
                email: firebase.auth().currentUser.email,
                userId: firebase.auth().currentUser.uid,
                image: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/default.png?alt=media`,
                favorites: []
            });
        setLoading(false);
    };

    const createMessage = async currentMessage => {
        await firebase
            .firestore()
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .doc()
            .set(currentMessage);
    };

    const handleFavorite = async favoriteUser => {
        await firebase
            .firestore()
            .collection("users")
            .doc(user.email)
            .update({
                favorites: firebase.firestore.FieldValue.arrayUnion(favoriteUser)
            });
    };

    const handleRemoveFavorite = async removeFavoriteUser => {
        console.log(removeFavoriteUser);
        await firebase
            .firestore()
            .collection("users")
            .doc(user.email)
            .update({
                favorites: firebase.firestore.FieldValue.arrayRemove(removeFavoriteUser)
            });
    };

    const handleImage = file => {
        setLoading(true);

        let uniqueID = crypto.randomBytes(20).toString("hex");
        let fileExtension = file.type.split("/")[1];
        let filename = `${uniqueID}.${fileExtension}`;
        let storageRef = firebase.storage().ref();
        let imagesRef = storageRef.child(`${filename}`);
        var metadata = {
            contentType: "image/jpeg"
        };

        const imageURL = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${filename}?alt=media`;

        imagesRef
            .put(file, metadata)
            .then(function(snapshot) {
                console.log("Uploaded a blob or file!");
                return firebase
                    .firestore()
                    .collection("users")
                    .doc(user.email)
                    .update({
                        image: imageURL
                    });
            })
            .then(() => {
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                console.log("Error! Storage or Firestore");
            });
    };

    const login = async (email, password) => {
        setLoading(true);
        await firebase.auth().signInWithEmailAndPassword(email, password);
        setLoading(false);
    };

    const signout = async () => {
        await firebase.auth().signOut();
    };

    return {
        user,
        register,
        login,
        signout,
        snackbar,
        setSnackbar,
        snackbarDetails,
        setsnackbarDetails,
        handleRemoveFavorite,
        users,
        handleImage,
        handleFavorite,
        loading,
        createMessage,
        setChatId,
        messages
    };
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useFirebase().
export function ProvideFirebase({ children }) {
    const firebaseHook = useProvideFirebase();
    return <firebaseContext.Provider value={firebaseHook}>{children}</firebaseContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useFirebase = () => {
    return React.useContext(firebaseContext);
};
