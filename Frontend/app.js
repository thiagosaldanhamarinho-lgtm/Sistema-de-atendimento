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

        catalog.innerHTML = products.map(p => `
            <div class="product-card">
                <div class="product-img-container">
                    <img src="${p.image_url}" 
                         alt="${p.image_alt}" 
                         class="product-img" 
                         onerror="this.src='https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=600&auto=format&fit=crop'">
                </div>
                <h4>${p.name}</h4>
                <p class="price">R$ ${p.price.toFixed(2)}</p>
                <p class="stock">Estoque: ${p.stock}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error("Erro ao carregar catálogo", error);
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    
    // Guarda o estado atual no armazenamento do navegador
    const isActive = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isActive);
}

// Ativa automaticamente ao carregar a página se o utilizador já o tiver selecionado antes
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
});