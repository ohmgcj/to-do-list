CREATE DATABASE to_do;

CREATE USER admin_todo WITH PASSWORD 'caio1212';

GRANT ALL PRIVILEGES ON DATABASE to_do TO admin_todo;

CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(30)
);

CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    status_id INT,
    title VARCHAR(100),
    "description" TEXT,
    FOREIGN KEY (status_id) REFERENCES status(id)
);

INSERT INTO status (name)
VALUES 
    ('Ativo'),
    ('Pendente'),
    ('Finalizado');

INSERT INTO list (status_id, title, description)
VALUES
    (1, "Limpar", "Limpar a casa amanhã as 08");