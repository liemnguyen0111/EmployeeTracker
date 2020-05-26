-- DROP DATABASE IF EXISTS employeeTracker_db;

-- CREATE DATABASE employeeTracker_db;

-- USE employeeTracker_db;

-- CREATE TABLE employee (
--   id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   role_id INT, 
--   manager_id INT,
--   FOREIGN KEY(role_id) REFERENCES role(id),
--   FOREIGN KEY(manager_id) REFERENCES employee(id)

-- );

-- CREATE TABLE role (
--     id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
--     title VARCHAR(39) NOT NULL,
--     salary DEC NOT NULL,
--     department_id INT,
--     FOREIGN KEY(department_id) REFERENCES department(id)
-- );

-- CREATE TABLE department (
-- 	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
--     name VARCHAR(30) NOT NULL
-- );

