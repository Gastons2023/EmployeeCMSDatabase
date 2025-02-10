INSERT INTO department(name) VALUES
('Engineering'), ('Finance'), ('Legal'),('Sales'),('Service');

INSERT INTO role(title, salary, department_id) VALUES
('Sales Lead', 500000, 4),
('Salesperson', 300000, 4),
('Lead Engineer', 600000, 1),
('Software Engineer', 400000, 1),
('Accountant', 350000, 2),
('Legal Team Lead', 550000, 3),
('Lawyer', 450000, 3),
('Customer Service Lead', 400000, 5),
('Customer Service Representative', 300000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Robert', 'Brown', 3, NULL),
('Emily', 'Davis', 4, 3),
('Michael', 'Wilson', 5, NULL),
('Sarah', 'Johnson', 6, NULL),
('David', 'Lee', 7, 6),
('Laura', 'Garcia', 8, NULL),
('James', 'Martinez', 9, 8);