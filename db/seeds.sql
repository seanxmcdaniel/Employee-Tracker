INSERT INTO departments (department)
VALUES ('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO title (employee_title, salary, department_id)
VALUE ('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Account Manager', 160000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, title_id, manager_id)
VALUES ('Mary', 'Ferguson', 1, 0),
('Tina', 'Hall', 4, 0),
('Oscar', 'Williams', 4, 0),
('Pavel', 'Smith', 7, 0),
('DaVonte', 'Harris', 6, 1),
('Jose', 'Recinos', 2, 1),
('Steven', 'Gibbons', 3, 0),
('Arnold', 'Moore', 5, 1),
('Derrick', 'Duff', 3, 0),
('Linda', 'Van', 1, 0),
('Emily', 'Anderson', 1, 0)