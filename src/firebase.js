//import firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { DB_CONFIG } from "./config/config";
// Initialize Firebase

const app = initializeApp(DB_CONFIG);
const db = getFirestore(app);
const storage = getStorage(app);

export {
    db,
    storage
}