DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL, 
  --generlaly accepted accounting principles use 4 decimal places
  salary DECIMAL(25, 4) NOT NULL,
  --  variable that identifies the department role
  department_id INT NOT NULL,
  -- foregin key that references department's id property
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  --variable that references role's id property
  role_id INT NOT NULL, 
  --foregin key that references role's id property
  FOREIGN KEY (role_id) REFERENCES role(id)
  -- variable that identifies the employee's manager, if they have one. Can be null
  manager_id INT
);