CREATE DATABASE xeno_crm;
USE xeno_crm;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    total_spend DECIMAL(10,2) DEFAULT 0,
    visit_count INT DEFAULT 0,
    last_visit_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE segments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rules JSON NOT NULL,
    created_by VARCHAR(100) NOT NULL,
    audience_size INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    segment_id INT NOT NULL,
    message_template TEXT NOT NULL,
    audience_size INT NOT NULL,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (segment_id) REFERENCES segments(id)
);

CREATE TABLE communication_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id INT NOT NULL,
    customer_id INT NOT NULL,
    status ENUM('PENDING', 'SENT', 'FAILED') DEFAULT 'PENDING',
    sent_at DATETIME,
    delivery_status VARCHAR(20),
    delivery_time DATETIME,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

