import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAIPMeoEDP_fD6dcgaykdFWeDl4bgBB5Pk",
  authDomain: "todo-625d5.firebaseapp.com",
  databaseURL: "https://todo-625d5-default-rtdb.firebaseio.com",
  projectId: "todo-625d5",
  storageBucket: "todo-625d5.appspot.com",
  messagingSenderId: "156153309624",
  appId: "1:156153309624:web:df4f8034828bc37c37874d",
  measurementId: "G-CPEYL5YDS9",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
