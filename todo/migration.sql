-- DROP DATABASE IF EXISTS todo_list_dev;

-- CREATE DATABASE todo_list_dev;

DROP TABLE IF EXISTS todo;

CREATE TABLE todo(
id SERIAL,
 name TEXT,
 getDate DATE,
 goals TEXT
);
