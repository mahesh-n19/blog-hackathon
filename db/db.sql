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


CREATE TABLE categories 
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    description VARCHAR(50) NOT NULL

);

INSERT INTO categories(title,description) VALUES('Nature', 'Category for Natural resources'),('Technology','Category for Tech inventions');


CREATE TABLE blogs 
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    contents TEXT NOT NULL,
    created_time DATE DEFAULT(now()),
    user_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE

);


-- All blogs

SELECT B.id,B.title,C.id as category_id ,C.title,U.id as user_id,U.fullname,B.created_time 
FROM blogs B 
inner join categories C ON 
B.category_id = C.id 
inner join user U ON  
B.user_id = U.id;  

-- My Blogs

SELECT B.id,B.title,C.id as category_id ,C.title,U.id as user_id,U.fullname,B.created_time 
FROM blogs B 
inner join categories C ON 
B.category_id = C.id 
inner join user U ON  
B.user_id = U.id
WHERE B.user_id = ?;  