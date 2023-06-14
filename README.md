
# Grades Calculator

A school project for WA


## Installation

Download xampp, put the project files into XAMPP/htdocs. Log into the mysql server using root and no password. Create the DB:

```
CREATE DATABASE app
USE app
CREATE TABLE grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    grade DOUBLE NOT NULL,
    weight DOUBLE NOT NULL
);
```
Profit.
    
## Documentation

Comments in code basically.

