/* =========================
   URL BACKEND
========================== */
 
const API_URL =
    "http://localhost:8080/pedidos";
 
/* =========================
   ELEMENTOS
========================== */
 
const listaPedidos =
    document.getElementById('listaPedidos');
 
const totalPedidos =
    document.getElementById('totalPedidos');
 
const faturamentoTotal =
    document.getElementById('faturamentoTotal');
 
const pedidosPreparo =
    document.getElementById('pedidosPreparo');
 
/* =========================
   CARREGAR PEDIDOS
========================== */
 
async function carregarPedidos(){
 
    try{
 
        const response =
            await fetch(API_URL);
 
        const pedidos =
            await response.json();
 
        renderizarPedidos(pedidos);
 
    }
 
    catch(error){
 
        console.log(error);
 
        listaPedidos.innerHTML = `
 
            <tr>
 
                <td colspan="5"
                    class="sem-pedidos">
 
                    Erro ao carregar pedidos
 
                </td>
 
            </tr>
 
        `;
 
    }
 
}
 
/* =========================
   RENDERIZAR
========================== */
 
function renderizarPedidos(pedidos){
 
    listaPedidos.innerHTML = '';
 
    /* SEM PEDIDOS */
 
    if(pedidos.length === 0){
 
        listaPedidos.innerHTML = `
 
            <tr>
 
                <td colspan="5"
                    class="sem-pedidos">
 
                    Não há pedidos ainda
 
                </td>
 
            </tr>
 
        `;
 
        totalPedidos.innerHTML = '0';
 
        faturamentoTotal.innerHTML = 'R$ 0,00';
 
        pedidosPreparo.innerHTML = '0';
 
        return;
 
    }
 
    /* TOTAIS */
 
    let total = 0;
 
    let preparo = 0;
 
    /* LOOP */
 
    pedidos.forEach(pedido => {
 
        total += pedido.total;
 
        if(pedido.status === 'EM_PREPARO'){
 
            preparo++;
 
        }
 
        listaPedidos.innerHTML += `
 
            <tr>
 
                <td>
                    #${pedido.id}
                </td>
 
                <td>
                    ${pedido.clienteNome}
                </td>
 
                <td>
 
                    <span class="status ${pedido.status.toLowerCase()}">
 
                        ${pedido.status}
 
                    </span>
 
                </td>
 
                <td>
 
                    R$ ${pedido.total.toFixed(2).replace('.', ',')}
 
                </td>
 
                <td>
 
                    <button
                        class="btn-status"
                        onclick="alterarStatus(${pedido.id})">
 
                        Atualizar
 
                    </button>
 
                </td>
 
            </tr>
 
        `;
 
    });
 
    /* CARDS */
 
    totalPedidos.innerHTML =
        pedidos.length;
 
    faturamentoTotal.innerHTML =
        `R$ ${total.toFixed(2).replace('.', ',')}`;
 
    pedidosPreparo.innerHTML =
        preparo;
 
}
 
/* =========================
   ALTERAR STATUS
========================== */
 
async function alterarStatus(id){
 
    try{
 
        await fetch(`${API_URL}/${id}/status`, {
 
            method: 'PUT'
 
        });
 
        carregarPedidos();
 
    }
 
    catch(error){
 
        console.log(error);
 
        alert('Erro ao atualizar status do pedido.');
 
    }
 
}
 
/* =========================
   INICIAR
========================== */
 
carregarPedidos();