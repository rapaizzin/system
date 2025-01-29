document.addEventListener("DOMContentLoaded", function() {
    const tipoMensagem = document.getElementById("tipo-mensagem");
    const mensagemContainer = document.getElementById("mensagem-container");
    const embedContainer = document.getElementById("embed-container");

    // Oculta os elementos inicialmente
    mensagemContainer.style.display = "block";
    embedContainer.style.display = "none";

    // Alternar visibilidade conforme o tipo selecionado
    tipoMensagem.addEventListener("change", function() {
        if (tipoMensagem.value === "mensagem") {
            mensagemContainer.style.display = "block";
            embedContainer.style.display = "none";
        } else {
            mensagemContainer.style.display = "none";
            embedContainer.style.display = "block";
        }
    });

    document.getElementById("parceria-form").addEventListener("submit", async function(event) {
        event.preventDefault(); // Impede recarregamento da página

        const webhookUrl = document.getElementById("webhook-canal").value;
        let payload;

        if (tipoMensagem.value === "mensagem") {
            // Enviar mensagem simples
            const mensagem = document.getElementById("mensagem-content").value;
            payload = { content: mensagem };
        } else {
            // Enviar como embed
            const title = document.getElementById("embed-title").value;
            const description = document.getElementById("embed-description").value;
            const color = document.getElementById("embed-color").value.replace("#", ""); // Remover "#" do hex

            payload = {
                embeds: [{
                    title: title,
                    description: description,
                    color: parseInt(color, 16) // Converte hex para decimal
                }]
            };
        }

        // Enviar a requisição para o Webhook do Discord
        try {
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Mensagem enviada com sucesso!");
            } else {
                alert("Erro ao enviar mensagem.");
            }
        } catch (error) {
            console.error("Erro ao enviar webhook:", error);
            alert("Erro de conexão.");
        }
    });
});