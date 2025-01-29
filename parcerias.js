// Importar as dependências do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Configuração do Firebase (substitua com suas próprias credenciais)
const firebaseConfig = {
    apiKey: "AIzaSyCHo_jgnNdbDsczK6TlAyt0pWBZzBNC_w0",
    authDomain: "rapaizzin-server.firebaseapp.com",
    projectId: "rapaizzin-server",
    storageBucket: "rapaizzin-server.firebasestorage.app",
    messagingSenderId: "575827937480",
    appId: "1:575827937480:web:a8683737c5a0ad1fc5bdfd"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referência ao formulário e ao botão
const form = document.querySelector("form");
const button = form.querySelector("button");

// Função para cadastrar uma nova parceria no Firestore
async function cadastrarParceria(e) {
  e.preventDefault(); // Impede o envio padrão do formulário

  // Coletando dados do formulário
  const nomeParceria = document.querySelector("#nome-parceria").value;
  const dataExpiracao = document.querySelector("#data-expiracao").value;
  const imagemParceria = document.querySelector("#imagem-parceria").value;
  const descricaoParceria = document.querySelector("#descricao-parceria").value;

  try {
    // Adicionando os dados no Firestore
    await addDoc(collection(db, "parcerias"), {
      nome: nomeParceria,
      dataExpiracao: dataExpiracao,
      imagem: imagemParceria,
      descricao: descricaoParceria,
      status: "pending", // Status inicial, podendo ser modificado depois
      dataCriacao: new Date() // A data de criação da parceria
    });
    
    alert("Parceria cadastrada com sucesso!");
    form.reset(); // Limpa os campos após o envio
  } catch (e) {
    console.error("Erro ao cadastrar a parceria: ", e);
    alert("Erro ao cadastrar a parceria. Tente novamente!");
  }
}

// Adicionando o listener ao botão para enviar os dados
button.addEventListener("click", cadastrarParceria);


