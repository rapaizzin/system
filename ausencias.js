 // Importando Firebase
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
 import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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

 // Definir a data atual automaticamente
 document.getElementById("data-atual").value = new Date().toISOString().split("T")[0];

 document.getElementById("ausencia-form").addEventListener("submit", async function(event) {
     event.preventDefault(); // Evita recarregar a página

     // Coleta os valores dos inputs
     const dataAtual = document.getElementById("data-atual").value;
     const dataRetorno = document.getElementById("data-retorno").value;
     const motivo = document.getElementById("motivo-ausencia").value;
     const categoria = document.getElementById("categoria-ausencia").value;
     const name = document.getElementById("name").value;

     try {
         // Envia os dados para o Firestore
         await addDoc(collection(db, "ausencias"), {
             dataAtual,
             dataRetorno,
             motivo,
             name: name,
             categoria,
             timestamp: new Date() // Salva o horário do envio
         });

         alert("Ausência registrada com sucesso!");
         document.getElementById("ausencia-form").reset(); // Limpa o formulário
     } catch (error) {
         console.error("Erro ao salvar no Firestore:", error);
         alert("Erro ao registrar ausência!");
     }
 });