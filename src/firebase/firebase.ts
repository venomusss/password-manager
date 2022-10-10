// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  query,
  collection,
  where,
  getDocs,
  addDoc,
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { IPassword, IUser } from "../types";

export const firebaseConfig = {
  apiKey: "AIzaSyCv656Qrq45DXOBTqL2L2Imh09trP-xciM",
  authDomain: "password-manager-d9c80.firebaseapp.com",
  projectId: "password-manager-d9c80",
  storageBucket: "password-manager-d9c80.appspot.com",
  messagingSenderId: "377036061",
  appId: "1:377036061:web:3e2b38f9ea442407d355f4",
  measurementId: "G-2R46351FGC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const usersCollection = collection(db, "users");

//Auth functions
const googleProvider = new GoogleAuthProvider();

export const loginAccountWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      const newUser: IUser = {
        uid: user.uid,
        name: user.displayName as string,
        email: user.email as string,
        passwords: [],
      };
      await addDoc(collection(db, "users"), newUser);
    }
  } catch (error) {
    console.error(error);
  }
};

export const createAccountWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const newUser: IUser = {
      uid: user.uid,
      name: name,
      email: user.email as string,
      passwords: [],
      password: password,
    };
    await addDoc(usersCollection, newUser);
  } catch (error) {
    console.error(error);
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (uid: string | undefined) => {
  if (uid === undefined) return;
  const q = query(usersCollection, where("uid", "==", uid));
  let user: IUser = {
    uid: "",
    name: "",
    email: "",
    passwords: [],
  };
  await getDocs(q).then((res) =>
    res.forEach((doc) => {
      user = {
        uid: doc.data().uid,
        name: doc.data().name,
        email: doc.data().email,
        passwords: doc.data().passwords,
      };
    })
  );
  return user;
};

export const getUserByPasswordAndEmail = async (
  password: string | undefined,
  email: string | undefined
) => {
  if (password === undefined || email === undefined) return;
  let userId: string = "";
  const q = query(
    usersCollection,
    where("email", "==", email),
    where("password", "==", password)
  );
  await getDocs(q).then((res) =>
    res.forEach((doc) => {
      userId = doc.data().uid;
    })
  );
  return userId ? true : false;
};

export const addPassword = async (uid: string, password: IPassword) => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const docs = await getDocs(q);
  const userRef = doc(usersCollection, docs.docs[0].id);
  try {
    await updateDoc(userRef, {
      passwords: arrayUnion(password),
    });
  } catch (e) {
    console.log((e as Error).message);
  }
};

export const getPasswords = async (uid: string | undefined) => {
  let passwords: IPassword[] | undefined = [];
  await getUserById(uid).then((r) => (passwords = r?.passwords));
  return passwords;
};

export const deletePassword = async (
  uid: string | undefined,
  password: IPassword
) => {
  let passwordArr: IPassword[] = [];
  await getPasswords(uid).then((r) => (passwordArr = r));
  let filteredArr: IPassword[] = passwordArr.filter(
    (item) => item.id !== password.id
  );
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const docs = await getDocs(q);
  const userRef = doc(usersCollection, docs.docs[0].id);
  try {
    await updateDoc(userRef, {
      passwords: filteredArr,
    });
  } catch (e) {
    console.log((e as Error).message);
  }
};

export const editPassword = async (
  uid: string | undefined,
  password: IPassword
) => {
  let passwordArr: IPassword[] = [];
  await getPasswords(uid).then((r) => (passwordArr = r));
  let filteredArr: IPassword[] = passwordArr.map((item) => {
    return item.id === password.id ? password : item;
  });
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const docs = await getDocs(q);
  const userRef = doc(usersCollection, docs.docs[0].id);
  try {
    await updateDoc(userRef, {
      passwords: filteredArr,
    });
  } catch (e) {
    console.log((e as Error).message);
  }
};
