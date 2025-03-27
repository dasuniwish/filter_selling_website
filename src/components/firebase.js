import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getDatabase, ref, set, push, get,remove } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqrGDNP7P9fKZhfj_33X8nZGZAgBoXwvE",
  authDomain: "filterselling.firebaseapp.com",
  projectId: "filterselling",
  storageBucket: "filterselling.appspot.com",
  messagingSenderId: "502192057271",
  appId: "1:502192057271:web:fb838fade98159995bd632",
  measurementId: "G-0BG468EPDC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, database, storage, ref, get, set, push, remove, storageRef, uploadBytes, getDownloadURL };


