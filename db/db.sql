CREATE DATABASE hackthon;

CREATE TABLE user 
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(50) NOT NULL,
    email VARCHAR(20) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone_no VARCHAR(10),
    created_time DATE DEFAULT(now()) 

);


INSERT INTO user(fullname,email,password,phone_no) VALUES('Mahesh Narayankar', 'mahesh@gmail.com','177955','8263880295');