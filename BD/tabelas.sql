-- Criação do banco de dados (caso vá rodar localmente no seu computador)
CREATE DATABASE IF NOT EXISTS oficina_db;
USE oficina_db;

-- Tabela de Produtos (Estoque e Catálogo - RF02)
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    image_alt VARCHAR(255),
    INDEX idx_products_name (name)
);

-- Tabela de Agendamentos (Fila de Produção e Agenda - RF01 e RF03)
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL,
    description VARCHAR(500) NOT NULL,
    scheduled_at DATETIME NOT NULL,
    estimated_delivery DATETIME,
    INDEX idx_appointments_scheduled_at (scheduled_at)
);