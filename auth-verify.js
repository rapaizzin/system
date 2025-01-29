import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "rapaizzin-server.firebaseapp.com",
    projectId: "rapaizzin-server",
    storageBucket: "rapaizzin-server.firebasestorage.app",
    messagingSenderId: "575827937480",
    appId: "1:575827937480:web:a8683737c5a0ad1fc5bdfd"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Verifica o estado de autenticação ao carregar a página
onAuthStateChanged(auth, async (user) => {
    console.log("Estado da autenticação:", user); // Verifique se o valor está correto
    if (user) {
        console.log("Usuário autenticado. UID:", user.uid);

        // Verifica se o role do usuário é Coordenador ou Dono
        if (user.uid === "R6ViKkCWPwYWWn6Fm3wJ0YD7iAH2" || user.uid === "3sisgvRQr8QMj1Fws0dMd9Dj8Sv1") {
            console.log("Acesso permitido para UID: ", user.uid);
        } else {
            console.warn("Permissão insuficiente! Redirecionando...");
            // window.location.href = "not-ausencias.html"; // Redireciona para página de erro
        }
    } else {
        console.warn("Usuário não autenticado! Redirecionando...");
        // window.location.href = "not-ausencias.html"; // Redirecionamento caso o usuário não esteja autenticado
    }
});