import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBr6KSNIg5baGInxIau3_QqK0khe8Br5aQ",
  authDomain: "netflix-clone-9990a.firebaseapp.com",
  projectId: "netflix-clone-9990a",
  storageBucket: "netflix-clone-9990a.firebasestorage.app",
  messagingSenderId: "984335335518",
  appId: "1:984335335518:web:1b77926ba52cb896c674cf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Kullanıcı dokümanı yoksa oluştur
const ensureUserDoc = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    await setDoc(userRef, {
      name: user.displayName || "",
      email: user.email,
      photoURL: "",
      createdAt: new Date(),
    });
  }
};

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      photoURL: "",
      authProvider: "local",
      createdAt: new Date(),
    });
    toast.success("Kayıt başarılı!");
  } catch (error) {
    toast.error(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(error.message);
  }
};

const logout = () => signOut(auth);

export { auth, db, storage, signup, login, logout, ensureUserDoc };
