-- Connect to the default 'postgres' database
\connect postgres

-- CREATE DATABASES FOR MERN STACK PROJECT
SELECT 'CREATE DATABASE dev_db_project_mern OWNER "root"' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'dev_db_project_mern')\gexec

SELECT 'CREATE DATABASE staging_db_project_mern OWNER "root"' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'staging_db_project_mern')\gexec

SELECT 'CREATE DATABASE prod_db_project_mern OWNER "root"' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'prod_db_project_mern')\gexec

-- CREATE DATABASES FOR NEXT.JS PROJECT
SELECT 'CREATE DATABASE dev_db_project_next OWNER "root"' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'dev_db_project_next')\gexec

SELECT 'CREATE DATABASE staging_db_project_next OWNER "root"' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'staging_db_project_next')\gexec

SELECT 'CREATE DATABASE prod_db_project_next OWNER "root"' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'prod_db_project_next')\gexec

-- FUNCTION TO CREATE USERS TABLE AND INSERT USERS
\set environments '''dev_db_project_mern'', ''staging_db_project_mern'', ''prod_db_project_mern'', ''dev_db_project_next'', ''staging_db_project_next'', ''prod_db_project_next'''

-- Repeat the next block for each database
\connect dev_db_project_mern

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (first_name, last_name, email) VALUES
('John', 'Doe', 'john.dev@mern.com'),
('Jane', 'Smith', 'jane.dev@mern.com'),
('Alice', 'Johnson', 'alice.dev@mern.com'),
('Bob', 'Brown', 'bob.dev@mern.com'),
('Charlie', 'White', 'charlie.dev@mern.com'),
('David', 'Clark', 'david.dev@mern.com'),
('Eve', 'Hall', 'eve.dev@mern.com'),
('Frank', 'Allen', 'frank.dev@mern.com'),
('Grace', 'King', 'grace.dev@mern.com'),
('Hank', 'Wright', 'hank.dev@mern.com');

\connect staging_db_project_mern

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (first_name, last_name, email) VALUES
('John', 'Doe', 'john.staging@mern.com'),
('Jane', 'Smith', 'jane.staging@mern.com'),
('Alice', 'Johnson', 'alice.staging@mern.com'),
('Bob', 'Brown', 'bob.staging@mern.com'),
('Charlie', 'White', 'charlie.staging@mern.com'),
('David', 'Clark', 'david.staging@mern.com'),
('Eve', 'Hall', 'eve.staging@mern.com'),
('Frank', 'Allen', 'frank.staging@mern.com'),
('Grace', 'King', 'grace.staging@mern.com'),
('Hank', 'Wright', 'hank.staging@mern.com');

\connect prod_db_project_mern

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (first_name, last_name, email) VALUES
('John', 'Doe', 'john.prod@mern.com'),
('Jane', 'Smith', 'jane.prod@mern.com'),
('Alice', 'Johnson', 'alice.prod@mern.com'),
('Bob', 'Brown', 'bob.prod@mern.com'),
('Charlie', 'White', 'charlie.prod@mern.com'),
('David', 'Clark', 'david.prod@mern.com'),
('Eve', 'Hall', 'eve.prod@mern.com'),
('Frank', 'Allen', 'frank.prod@mern.com'),
('Grace', 'King', 'grace.prod@mern.com'),
('Hank', 'Wright', 'hank.prod@mern.com');

\connect dev_db_project_next

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (first_name, last_name, email) VALUES
('John', 'Doe', 'john.dev@next.com'),
('Jane', 'Smith', 'jane.dev@next.com'),
('Alice', 'Johnson', 'alice.dev@next.com'),
('Bob', 'Brown', 'bob.dev@next.com'),
('Charlie', 'White', 'charlie.dev@next.com'),
('David', 'Clark', 'david.dev@next.com'),
('Eve', 'Hall', 'eve.dev@next.com'),
('Frank', 'Allen', 'frank.dev@next.com'),
('Grace', 'King', 'grace.dev@next.com'),
('Hank', 'Wright', 'hank.dev@next.com');

\connect staging_db_project_next

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (first_name, last_name, email) VALUES
('John', 'Doe', 'john.staging@next.com'),
('Jane', 'Smith', 'jane.staging@next.com'),
('Alice', 'Johnson', 'alice.staging@next.com'),
('Bob', 'Brown', 'bob.staging@next.com'),
('Charlie', 'White', 'charlie.staging@next.com'),
('David', 'Clark', 'david.staging@next.com'),
('Eve', 'Hall', 'eve.staging@next.com'),
('Frank', 'Allen', 'frank.staging@next.com'),
('Grace', 'King', 'grace.staging@next.com'),
('Hank', 'Wright', 'hank.staging@next.com');

\connect prod_db_project_next

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (first_name, last_name, email) VALUES
('John', 'Doe', 'john.prod@next.com'),
('Jane', 'Smith', 'jane.prod@next.com'),
('Alice', 'Johnson', 'alice.prod@next.com'),
('Bob', 'Brown', 'bob.prod@next.com'),
('Charlie', 'White', 'charlie.prod@next.com'),
('David', 'Clark', 'david.prod@next.com'),
('Eve', 'Hall', 'eve.prod@next.com'),
('Frank', 'Allen', 'frank.prod@next.com'),
('Grace', 'King', 'grace.prod@next.com'),
('Hank', 'Wright', 'hank.prod@next.com');
