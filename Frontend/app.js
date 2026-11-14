const API_URL = "http://127.0.0.1:8000"; // Substituir após o deploy no Railway

// Navegação entre as telas do SPA
function navTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
    
    // Reseta as mensagens de resultado ao voltar
    document.getElementById('result-success').classList.add('hidden');
    document.getElementById('result-error').classList.add('hidden');
}

// Submissão do Agendamento (RF01 e RNF02)
document.getElementById('appointment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const payload = {
        client_name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        description: document.getElementById('description').value,
        scheduled_at: document.getElementById('datetime').value
    };

    try {
        const response = await fetch(`${API_URL}/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        navTo('screen-result');

        if (response.status === 409) {
            // RF01: Choque de horário detectado. Mostra alerta acessível.
            document.getElementById('result-error').classList.remove('hidden');
        } else if (response.ok) {
            // Sucesso
            const data = await response.json();
            const dateStr = new Date(data.scheduled_at).toLocaleString('pt-BR');
            const deliveryStr = new Date(data.estimated_delivery).toLocaleDateString('pt-BR');
            
            document.getElementById('result-details').innerHTML = `
                Marceneiro agendado para <strong>${dateStr}</strong><br>
                Previsão de entrega do orçamento: <strong>${deliveryStr}</strong> (Em até 15 dias)
            `;
            document.getElementById('result-success').classList.remove('hidden');
            document.getElementById('appointment-form').reset();
        } else {
            throw new Error("Falha no servidor");
        }
    } catch (error) {
        // Omissão de erros técnicos (RNF02)
        navTo('screen-result');
        document.getElementById('result-error').classList.remove('hidden');
    }
});

async function loadProducts() {
    try {
        const res = await fetch(`${API_URL}/api/products`);
        const products = await res.json();
        const catalog = document.getElementById('catalog');

        if (products.length === 0) {
            catalog.innerHTML = "<p>Nenhum produto a pronta entrega no momento.</p>";
            return;
        }

        // RF02: Renderiza apenas produtos com estoque (regra já filtrada pelo backend)
        catalog.innerHTML = products.map(p => `
            <div class="product-card" style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                <img src="${p.image_url}" alt="${p.image_alt}" class="product-img">
                <h4 style="margin: 10px 0 5px 0;">${p.name}</h4>
                <p style="margin: 0; font-weight: bold; color: var(--primary-color);">R$ ${p.price.toFixed(2)}</p>
                <p style="margin: 5px 0 0 0; font-size: 14px;">Estoque: ${p.stock}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error("Erro ao carregar catálogo", error);
    }
}

// Executa a função automaticamente assim que a página abrir
document.addEventListener('DOMContentLoaded', loadProducts);
document.addEventListener('DOMContentLoaded', loadProducts);