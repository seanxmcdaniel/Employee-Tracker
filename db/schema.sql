DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE departments (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE title (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_title VARCHAR(30) UNIQUE NOT NULL,
    salary INTEGER UNSIGNED NOT NULL,
    department_id INTEGER UNSIGNED NOT NULL
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id BOOLEAN NOT NULL,
    title_id INTEGER,
    FOREIGN KEY (title_id)
    REFERENCES title(id)
    ON DELETE CASCADE  
);