USE company_db;

INSERT INTO department (name) VALUES ('operations');
INSERT INTO department (name) VALUES ('accounting');
INSERT INTO department (name) VALUES ('sales');
INSERT INTO department (name) VALUES ('engineering');
INSERT INTO department (name) VALUES ('human resources');

INSERT INTO role (title, salary, department_id) VALUES ('operation manager', 150000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ('accounting manager', 125000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ('sales manager', 125000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ('engineering manager', 125000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ('sales rep', 55000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ('engineer', 70000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ('human resource representative', 60000.00, 1);

INSERT INTO employee (first_name, last_name, role_id) VALUES ('John', 'Medal', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Andrew', 'Takeya', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Nicole', 'Carmine', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Tiffany', 'Burns',4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Breann', 'Marsh', 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Lindsay', 'Moebius', 6);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Ian', 'Stewart', 7);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Perri', 'Stevenson', 7);