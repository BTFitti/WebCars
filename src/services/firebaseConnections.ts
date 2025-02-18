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

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBr1NE4ysN-SreuJNLE9_GR5S_TA0mrEyU",
//   authDomain: "webcarros2-89d15.firebaseapp.com",
//   projectId: "webcarros2-89d15",
//   storageBucket: "webcarros2-89d15.firebasestorage.app",
//   messagingSenderId: "1086559006855",
//   appId: "1:1086559006855:web:e939153af86ca526d40822"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app)
// export {db, storage, auth}