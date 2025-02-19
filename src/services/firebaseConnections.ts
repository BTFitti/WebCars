import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8a46dYZ9ixl4SguCtFwMlOJNq1BfsBMo",
  authDomain: "webcarros-f40c5.firebaseapp.com",
  projectId: "webcarros-f40c5",
  storageBucket: "webcarros-f40c5.firebasestorage.app",
  messagingSenderId: "112384843080",
  appId: "1:112384843080:web:879885fe3fc7661265e77d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//inicializando o banco de dados com a configuração do projeto
const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app)

//exportando para acessar em qualquer parte do arquivo
export {db, auth, storage};
