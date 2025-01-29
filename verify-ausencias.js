// Importando Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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

async function carregarAusencias() {
    const lista = document.getElementById("parcerias-list");
    lista.innerHTML = ""; // Limpa antes de atualizar

    const querySnapshot = await getDocs(collection(db, "ausencias"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const nome = data.name || "Nome não informado";
        const dataAusencia = data.dataAtual; // Data que registrou ausência
        const dataRetorno = data.dataRetorno; // Data de retorno

        // Calcula dias restantes de forma real
        const diasRestantes = calcularDiasRestantes(dataRetorno);

        // Criando item
        const item = document.createElement("div");
        item.classList.add("parc-content");
        item.innerHTML = `
            <h3>${nome}</h3>
            <p>Ausente desde: ${formatarData(dataAusencia)}</p>
            <p>Volta em: <span class="countdown">${diasRestantes}</span></p>
        `;
        lista.appendChild(item);
    });

    // Recarrega dados periodicamente para manter valores corretos
    setTimeout(carregarAusencias, 60 * 60 * 1000); // Atualiza a cada 1 hora
}

// Calcula os dias restantes com base na data real
function calcularDiasRestantes(dataRetorno) {
    const hoje = new Date();
    const retorno = new Date(dataRetorno);

    const diffTime = retorno - hoje;
    const diffDias = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);

    return diffDias === 0 ? "Já voltou" : `${diffDias} dia(s)`;
}

// Formata a data para o padrão BR (dd/mm/yyyy)
function formatarData(data) {
    if (!data) return "Data não informada";
    
    const d = new Date(data);
    return d.toLocaleDateString("pt-BR");
}

// Carrega ao iniciar
carregarAusencias();
