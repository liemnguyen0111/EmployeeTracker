-- USE employeeTracker_db;
-- -- Insert multiple values into department
-- INSERT INTO department(name) VALUES("Sales"),("Warehouse"),("Retail");

-- -- Insert multiple values into employee
-- INSERT INTO employee(name) VALUES("Sales"),("Warehouse"),("Retail");

-- -- Insert new data into a table if not exist method 1
-- INSERT INTO department(name) 
-- SELECT * FROM (SELECT "Sales") AS tmp
-- WHERE NOT EXISTS(
-- 	SELECT name FROM department WHERE NAME = "Sales"
-- ) LIMIT 1;

-- -- Insert new data into a table if not exist method 2
-- INSERT INTO department(name) 
-- SELECT  "1"
-- WHERE NOT EXISTS(
-- 	SELECT name FROM department WHERE name = ("1")
-- ) LIMIT 1;

-- DELETE FROM department WHERE name = "1";

-- -- Wipe out all data from table
-- DELETE FROM department;
-- ALTER TABLE department AUTO_INCREMENT = 1;
-- -- VALUES("Sales"),("Warehouse"),("Retail");
