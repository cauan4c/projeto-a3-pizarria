const carrinho =
    JSON.parse(localStorage.getItem('carrinho')) || [];

const resumoPedido =
    document.getElementById('resumoPedido');

const totalCheckout =
    document.getElementById('totalCheckout');

let totalFinal = 0;

carrinho.forEach((item) => {

    totalFinal += Number(
        item.valor
            .replace('R$ ', '')
            .replace(',', '.')
    );

    resumoPedido.innerHTML += `

        <div class="item-checkout">

            <h3>
                ${item.pizza}
            </h3>

            <p>
                <strong>Sabores:</strong>
                ${item.sabores.join(', ')}
            </p>

            <p>
                <strong>Borda:</strong>
                ${item.borda}
            </p>

            <p>
                <strong>Bebida:</strong>
                ${item.bebida}
            </p>

            <p>
                <strong>Observação:</strong>
                ${item.observacao || 'Nenhuma'}
            </p>

            <span>
                ${item.valor}
            </span>

        </div>

    `;

});

totalCheckout.innerHTML =
    `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;

    function finalizarPedido(){

    const nome =
        document.getElementById('nomeCliente').value;

    const telefone =
        document.getElementById('telefoneCliente').value;

    const endereco =
        document.getElementById('enderecoCliente').value;

    const bairro =
        document.getElementById('bairroCliente').value;

    const referencia =
        document.getElementById('referenciaCliente').value;

    const pagamento =
        document.getElementById('formaPagamento').value;

    /* VALIDAÇÃO */

    if(
        nome === '' ||
        telefone === '' ||
        endereco === '' ||
        pagamento === ''
    ){

        alert('Preencha os dados obrigatórios.');

        return;

    }

    /* OBJETO FINAL */

    const pedidoFinal = {

        cliente: {

            nome: nome,

            telefone: telefone,

            endereco: endereco,

            bairro: bairro,

            referencia: referencia

        },

        pagamento: pagamento,

        itens: carrinho,

        total: totalFinal

    };

    console.log(pedidoFinal);

    alert('Pedido realizado com sucesso!');

}

async function finalizarPedido() {

    const nome = document.getElementById('nomeCliente').value;
    const telefone = document.getElementById('telefoneCliente').value;
    const endereco = document.getElementById('enderecoCliente').value;
    const bairro = document.getElementById('bairroCliente').value;
    const referencia = document.getElementById('referenciaCliente').value;
    const pagamento = document.getElementById('formaPagamento').value;

    const carrinho =
        JSON.parse(localStorage.getItem('carrinho')) || [];

    if (nome === '' || telefone === '' || endereco === '' || pagamento === '') {
        alert('Preencha os dados obrigatórios.');
        return;
    }

    let totalFinal = 0;
    let resumo = "";

    carrinho.forEach(item => {

        totalFinal += Number(
            item.valor
                .replace('R$ ', '')
                .replace(',', '.')
        );

        resumo += `🍕 ${item.pizza}
Sabores: ${item.sabores.join(', ')}
Borda: ${item.borda}
Bebida: ${item.bebida}
Obs: ${item.observacao || 'Nenhuma'}
----------------------\n\n`;
    });

    const pedidoFinal = {
        cliente: {
            nome,
            telefone,
            endereco,
            bairro,
            referencia
        },
        pagamento,
        itens: carrinho,
        total: totalFinal
    };

    try {

        // 1. ENVIAR PARA BACKEND
        await fetch("http://localhost:8080/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pedidoFinal)
        });

        // 2. WHATSAPP
        const mensagem = `🛒 *NOVO PEDIDO - PIZZARIA*

👤 Nome: ${nome}
📞 Telefone: ${telefone}

📍 Endereço: ${endereco}
🏘️ Bairro: ${bairro}
📌 Referência: ${referencia}

💳 Pagamento: ${pagamento}

📦 PEDIDO:
${resumo}

💰 TOTAL: R$ ${totalFinal.toFixed(2).replace('.', ',')}`;

        const numeroWhatsApp = "5548992111402";

        const url =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, '_blank');

        alert("Pedido enviado com sucesso!");

    } catch (error) {
        console.error(error);
        alert("Erro ao enviar pedido para o servidor.");
    }
}