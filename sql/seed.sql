USE company_db;

INSERT INTO department (name)
VALUES ('operations'), ('accounting'), ('sales'),('engineering'), ('human resources');

INSERT INTO role (title, salary, department_id)
VALUES ('operations manager', 150000.00, 1), ('accounting manager', 125000.00, 2), ('accountant', 75000.00, 2), ('sales manager', 100000.00, 1), ('sales rep', 55000.00, 3), ('engineering manager', 125000.00, 1), ('engineer', 70000.00, 4), ('human resource representative', 60000.00, 5);

INSERT INTO employee(first_name, last_name,  role_id, manager_id)
VALUES ('John', 'Medal', 1, null), ('Andrew', 'Takeya', 2, null), ('Nicole', 'Carmine', 4, null), ('Tiffany', 'Burns', 3, 2), ('Breann', 'Marsh', 5, 3), ('Lindsay', 'Moebius', 6, null), ('Ian', 'Stewart', 7, 6), ('Perri', 'Stevenson', 8, 1);