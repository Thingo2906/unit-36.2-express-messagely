DROP DATABASE IF EXISTS messagely;

CREATE DATABASE messagely
;

\c messagely
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users ON DELETE CASCADE,
    to_username text NOT NULL REFERENCES users ON DELETE CASCADE,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL,
    read_at timestamp with time zone
);
INSERT INTO users (username, password, first_name, last_name, phone, join_at)
VALUES ('john_doe', 'password123', 'John', 'Doe', '1234567890', current_timestamp),
       ('hana_lee', 'password456', 'Hana', 'Lee', '1234567345', current_timestamp);
       
