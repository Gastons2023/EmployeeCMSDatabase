DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

\c employee_tracker;

CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);
CREATE TABLE role(
    id SERIAL PRIMARY KEY,
    title VARCHAR(60) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL 
     REFERENCES department(id) ON DELETE CASCADE
);
CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL
    REFERENCES role(id) ON DELETE CASCADE,
    manager_id INTEGER
     REFERENCES employee(id) ON DELETE SET NULL
); 

\i seeds.sql;
