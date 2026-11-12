# Sistema-de-atendimento
# Oficina & Arte - Sistema de Gestão e Agendamento 🪑🛠️

Este repositório contém o Produto Mínimo Viável (MVP) de uma aplicação web desenvolvida para digitalizar e otimizar a gestão de uma oficina local de tapeçaria e marcenaria em Mauá, SP. O sistema centraliza o agendamento de orçamentos presenciais, organiza a fila de produção e exibe o catálogo de móveis a pronta entrega.

Este projeto acadêmico de Ciência da Computação está alinhado ao **Objetivo de Desenvolvimento Sustentável 8 (ODS 8) da ONU**, promovendo o crescimento econômico inclusivo e a modernização de microempresas locais através da tecnologia.

---

## 🎯 Funcionalidades e Regras de Negócio

*   **Agendamento Inteligente (RF01):** Permite aos clientes reservarem blocos de horário para orçamentos in-loco. O sistema impede ativamente o choque de horários (concorrência).
*   **Catálogo e Estoque (RF02):** Exibição de móveis prontos para venda, com controle básico de disponibilidade (baixa de estoque).
*   **Fila de Produção (RF03):** Processamento de dados no backend que calcula e retorna prazos estimados de entrega com base na data do agendamento.
*   **Prevenção contra XSS (RNF02):** Sanitização de inputs do usuário no formulário utilizando a biblioteca Pydantic e `html.escape`.
*   **Omissão de Erros Técnicos (RNF02):** Tratamento de exceções no backend para exibir apenas alertas amigáveis, blindando a infraestrutura contra vazamento de dados do servidor.

## ♿ Acessibilidade e UX (WCAG)

A interface foi projetada com foco em clientes idosos ou com baixa literacia digital:
*   **Touch Targets:** Áreas de clique (botões e *cards* de horários) com dimensões mínimas de 44x44px.
*   **Contraste Visual:** Relação de contraste mínima de 4.5:1 entre texto e fundo.
*   **Alertas Multissensoriais:** Feedbacks de erro utilizam a tríade de acessibilidade: cor (vermelha), símbolo (⚠️) e texto explícito.

---

## 💻 Tecnologias Utilizadas

### Frontend (SPA - Single Page Application)
*   **HTML5 & CSS3:** Semântica estruturada e design responsivo (Mobile-First).
*   **JavaScript (Vanilla):** Consumo da API REST e manipulação do DOM sem recarregamento da página.
*   **Hospedagem:** Vercel (Edge Network para alta performance - RNF03).

### Backend (API RESTful)
*   **Python 3.10+ & FastAPI:** Framework assíncrono de alta performance.
*   **Uvicorn:** Servidor ASGI.
*   **Pydantic:** Validação de dados e segurança.
*   **Hospedagem:** Railway.

### Banco de Dados
*   **MySQL:** Banco de dados relacional.
*   **SQLAlchemy & PyMySQL:** ORM para mapeamento das tabelas e driver de conexão.
*   **Hospedagem:** Railway.

---

## 📁 Estrutura do Repositório

```text
├── frontend/
│   ├── index.html        # Estrutura principal das 3 telas do fluxo
│   ├── style.css         # Estilizações e regras de acessibilidade
│   └── app.js            # Lógica de interface e consumo da API
├── backend/
│   ├── main.py           # Endpoints e lógica central da API (FastAPI)
│   ├── models.py         # Mapeamento das tabelas do banco de dados
│   ├── schemas.py        # Validação de dados (Pydantic) e sanitização
│   ├── database.py       # Configuração de conexão e sessão do banco
│   └── requirements.txt  # Dependências do Python
└── BD/
    └── (Scripts SQL, diagramas MER/DER ou documentações do banco)

